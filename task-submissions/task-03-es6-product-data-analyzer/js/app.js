/* app.js: UI controller. Reads state, calls the pure functions in analytics.js,
   and renders. Uses event delegation for table actions and debounces search. */
(function () {
  "use strict";

  const { CATEGORIES, DEMO_PRODUCTS } = window.StockSenseData;
  const A = window.StockSenseAnalytics;
  const Store = window.StockSenseStorage;

  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const loaded = Store.load(DEMO_PRODUCTS, list => Array.isArray(list) && A.allRecordsValid(list, CATEGORIES));
  const state = {
    products: loaded.products,
    mode: loaded.mode,                      // "demo" or "custom"
    filters: { query: "", category: "all", stock: "all" },
    sort: { key: "name", dir: "asc" },
    editingId: null,
    pendingConfirm: null
  };

  /* ---------- Feedback ---------- */
  let toastTimer;
  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3200);
  }
  function setNotice(message) {
    const el = $("notice");
    el.textContent = message;
    el.hidden = !message;
  }

  function persist() {
    const saved = Store.save(state.products, state.mode);
    setNotice(saved ? "" : "Browser storage is unavailable, so changes will not be kept after you close this page.");
  }

  /* ---------- Rendering ---------- */
  function renderKpis(summary) {
    const cards = [
      { label: "Active products", value: A.formatNumber(summary.totalProducts), note: summary.inactiveProducts ? `${summary.inactiveProducts} inactive (excluded)` : "All products active" },
      { label: "Total units in stock", value: A.formatNumber(summary.totalUnits), note: "Active products only" },
      { label: "Inventory cost value", value: A.formatPKR(summary.inventoryCostValue), note: "Cost price x quantity" },
      { label: "Potential retail value", value: A.formatPKR(summary.potentialRetailValue), note: "Selling price x quantity", tone: "good" },
      { label: "Est. gross profit potential", value: A.formatPKR(summary.estimatedGrossProfit), note: "Estimate, not realised profit", tone: "good" },
      { label: "Low-stock products", value: A.formatNumber(summary.lowStockCount), note: "At or below reorder level", tone: summary.lowStockCount ? "warn" : "" },
      { label: "Out-of-stock products", value: A.formatNumber(summary.outOfStockCount), note: "Quantity is zero", tone: summary.outOfStockCount ? "danger" : "" }
    ];
    $("kpi-grid").innerHTML = cards.map(({ label, value, note, tone = "" }) =>
      `<div class="kpi ${tone ? `kpi--${tone}` : ""}"><span class="kpi__label">${esc(label)}</span><span class="kpi__value">${esc(value)}</span><span class="kpi__note">${esc(note)}</span></div>`).join("");
  }

  function renderCategories() {
    const rows = A.categoryBreakdown(state.products, CATEGORIES);
    $("category-list").innerHTML = rows.length
      ? rows.map(({ category, products, units, cost, retail, profit, share }) =>
        `<div class="cat"><div class="cat__head"><span class="cat__name">${esc(category)}</span><span>${esc(A.formatPKR(retail))}</span></div>
         <div class="bar" aria-hidden="true"><span class="bar__fill" style="width:${(share * 100).toFixed(1)}%"></span></div>
         <div class="cat__meta">${products} products, ${A.formatNumber(units)} units, cost ${esc(A.formatPKR(cost))}, profit potential ${esc(A.formatPKR(profit))}</div></div>`).join("")
      : `<p class="panel__hint">No active products yet.</p>`;
  }

  function renderRestock() {
    const needs = state.products
      .filter(p => ["low", "out"].includes(A.getStockState(p)))
      .sort((a, b) => a.stockQuantity - b.stockQuantity);
    $("restock-list").innerHTML = needs.length
      ? `<ul class="alert-list">${needs.map(({ name, stockQuantity, reorderLevel }) =>
        `<li class="alert-item"><span>${esc(name)}</span><span>${stockQuantity === 0 ? "Out of stock" : `${stockQuantity} left (reorder at ${reorderLevel})`}</span></li>`).join("")}</ul>`
      : `<p class="panel__hint">Nothing needs restocking right now.</p>`;
  }

  function renderQuality(summary) {
    const invalid = state.products.filter((p, i) => Object.keys(A.validateProduct(p, state.products.filter((_, j) => j !== i), CATEGORIES)).length);
    $("quality-box").innerHTML = `<div class="quality">
      <span class="quality__status ${summary.allRecordsValid ? "quality__status--ok" : "quality__status--bad"}">${summary.allRecordsValid ? "All records valid" : `${invalid.length} record(s) need attention`}</span>
      <span>${state.products.length} records checked against the validation rules (every).</span>
      <span>${summary.needsRestock ? "At least one active product needs restocking (some)." : "No active product needs restocking (some)."}</span>
      ${invalid.length ? `<span>${esc(invalid.map(p => p.name || p.id).join(", "))}</span>` : ""}</div>`;
  }

  const STATE_LABEL = { in: "In stock", low: "Low stock", out: "Out of stock", inactive: "Inactive" };

  function visibleProducts() {
    return A.sortProducts(A.filterProducts(state.products, state.filters), state.sort.key, state.sort.dir);
  }

  function renderTable() {
    const visible = visibleProducts();
    $("product-body").innerHTML = A.toRows(visible).map(({ id, sku, name, category, supplier, state: s, stockQuantity, reorderLevel, cost, price, value }) =>
      `<tr data-id="${esc(id)}">
        <td class="cell-name">${esc(name)}<small>${esc(sku)} | ${esc(supplier)}</small></td>
        <td data-label="Category">${esc(category)}</td>
        <td class="num" data-label="Cost">${esc(cost)}</td>
        <td class="num" data-label="Price">${esc(price)}</td>
        <td class="num" data-label="Stock">${stockQuantity} <span class="visually-hidden">(reorder at ${reorderLevel})</span></td>
        <td class="num" data-label="Value (cost)">${esc(value)}</td>
        <td data-label="Status"><span class="pill pill--${s}">${STATE_LABEL[s]}</span></td>
        <td class="cell-actions">
          <button class="button button--ghost button--small" type="button" data-action="edit" aria-label="Edit ${esc(name)}">Edit</button>
          <button class="button button--danger-ghost button--small" type="button" data-action="delete" aria-label="Delete ${esc(name)}">Delete</button>
        </td></tr>`).join("");
    $("empty-state").hidden = visible.length > 0;
    $("product-table").hidden = visible.length === 0;
    $("result-count").textContent = `Showing ${visible.length} of ${state.products.length} products`;
  }

  function renderAll() {
    const summary = A.computeSummary(state.products, CATEGORIES);
    renderKpis(summary);
    renderCategories();
    renderRestock();
    renderQuality(summary);
    renderTable();
    const badge = $("data-badge");
    badge.textContent = state.mode === "demo" ? "Sample data" : "Your data";
    badge.classList.toggle("badge--custom", state.mode !== "demo");
  }

  /* ---------- Dialog helpers ---------- */
  const FIELD_IDS = { id: "f-id", sku: "f-sku", name: "f-name", category: "f-category", supplier: "f-supplier", costPrice: "f-cost", sellingPrice: "f-price", stockQuantity: "f-stock", reorderLevel: "f-reorder", status: "f-status" };

  function clearErrors() {
    Object.entries(FIELD_IDS).forEach(([key, id]) => { $(`e-${key}`).textContent = ""; $(id).removeAttribute("aria-invalid"); });
    $("form-summary").hidden = true;
  }

  function openProductDialog(product) {
    clearErrors();
    const editing = Boolean(product);
    state.editingId = editing ? product.id : null;
    $("dialog-title").textContent = editing ? "Edit product" : "Add product";
    const values = product ?? { id: A.nextProductId(state.products), sku: "", name: "", category: CATEGORIES[0], supplier: "", costPrice: "", sellingPrice: "", stockQuantity: "", reorderLevel: "", status: "active" };
    Object.entries(FIELD_IDS).forEach(([key, id]) => { $(id).value = values[key]; });
    $("product-dialog").showModal();
    $("f-name").focus();
  }

  function readForm() {
    const num = id => ($(id).value.trim() === "" ? NaN : Number($(id).value));
    return {
      id: $("f-id").value, sku: $("f-sku").value.trim(), name: $("f-name").value.trim(), category: $("f-category").value,
      supplier: $("f-supplier").value.trim(), costPrice: num("f-cost"), sellingPrice: num("f-price"),
      stockQuantity: num("f-stock"), reorderLevel: num("f-reorder"), status: $("f-status").value
    };
  }

  function submitProduct(event) {
    event.preventDefault();
    clearErrors();
    const candidate = readForm();
    const others = state.products.filter(p => p.id !== state.editingId);
    const errors = A.validateProduct(candidate, others, CATEGORIES);
    const keys = Object.keys(errors);
    if (keys.length) {
      keys.forEach(key => { $(`e-${key}`).textContent = errors[key]; $(FIELD_IDS[key]).setAttribute("aria-invalid", "true"); });
      const summary = $("form-summary");
      summary.textContent = `Please fix ${keys.length} field${keys.length > 1 ? "s" : ""} below.`;
      summary.hidden = false;
      $(FIELD_IDS[keys[0]]).focus();
      return;
    }
    const editing = state.editingId !== null;
    state.products = editing
      ? state.products.map(p => (p.id === state.editingId ? { ...p, ...candidate } : p))   // spread: new object, original untouched
      : [...state.products, candidate];                                                     // spread: new array
    state.mode = "custom";
    persist();
    $("product-dialog").close();
    renderAll();
    toast(editing ? `Updated ${candidate.name}.` : `Added ${candidate.name}.`);
  }

  function askConfirm({ title, text, okLabel, onOk }) {
    $("confirm-title").textContent = title;
    $("confirm-text").textContent = text;
    $("confirm-ok").textContent = okLabel;
    state.pendingConfirm = onOk;
    $("confirm-dialog").showModal();
    $("confirm-cancel").focus();
  }

  function deleteProduct(id) {
    const product = A.findProduct(state.products, id);
    if (!product) return;
    askConfirm({
      title: "Delete product?", text: `"${product.name}" (${product.sku}) will be removed from your inventory. This cannot be undone.`, okLabel: "Delete",
      onOk: () => { state.products = state.products.filter(p => p.id !== id); state.mode = "custom"; persist(); renderAll(); toast(`Deleted ${product.name}.`); }
    });
  }

  function resetData() {
    askConfirm({
      title: "Reset to sample data?", text: "All your changes will be replaced by the original 24 sample products. A backup of your current data is kept in this browser first.", okLabel: "Reset",
      onOk: () => {
        const backedUp = Store.backupCurrent();
        state.products = DEMO_PRODUCTS.map(p => ({ ...p }));
        state.mode = "demo";
        Store.save(state.products, state.mode);
        renderAll();
        toast(backedUp ? "Sample data restored. Previous data was backed up." : "Sample data restored.");
      }
    });
  }

  function exportCsv() {
    const rows = visibleProducts();
    if (!rows.length) { toast("There are no products to export."); return; }
    const blob = new Blob(["\ufeff", A.toCSV(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), { href: url, download: "stocksense-products.csv" });
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(`Exported ${rows.length} product${rows.length > 1 ? "s" : ""} to CSV.`);
  }

  /* ---------- Navigation drawer (mobile) ---------- */
  function setMenu(open) {
    $("sidebar").classList.toggle("is-open", open);
    $("backdrop").hidden = !open;
    $("menu-button").setAttribute("aria-expanded", String(open));
    if (open) $("sidebar").querySelector("a").focus(); else if (document.activeElement && $("sidebar").contains(document.activeElement)) $("menu-button").focus();
  }

  /* ---------- Setup ---------- */
  function init() {
    const options = list => list.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");
    $("filter-category").innerHTML = `<option value="all">All categories</option>${options(CATEGORIES)}`;
    $("f-category").innerHTML = options(CATEGORIES);
    setNotice(loaded.warning);

    let searchTimer;
    $("search").addEventListener("input", e => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { state.filters.query = e.target.value; renderTable(); }, 150);
    });
    $("toolbar").addEventListener("submit", e => e.preventDefault());
    $("filter-category").addEventListener("change", e => { state.filters.category = e.target.value; renderTable(); });
    $("filter-stock").addEventListener("change", e => { state.filters.stock = e.target.value; renderTable(); });
    $("sort-key").addEventListener("change", e => { state.sort.key = e.target.value; renderTable(); });
    $("sort-dir").addEventListener("click", e => {
      state.sort.dir = state.sort.dir === "asc" ? "desc" : "asc";
      const label = state.sort.dir === "asc" ? "Ascending" : "Descending";
      e.currentTarget.textContent = label;
      e.currentTarget.dataset.dir = state.sort.dir;
      e.currentTarget.setAttribute("aria-label", `Sort direction: ${label.toLowerCase()}. Activate to switch.`);
      renderTable();
    });
    $("clear-filters").addEventListener("click", () => {
      state.filters = { query: "", category: "all", stock: "all" };
      $("search").value = ""; $("filter-category").value = "all"; $("filter-stock").value = "all";
      renderTable();
    });

    $("product-body").addEventListener("click", e => {
      const button = e.target.closest("button[data-action]");
      if (!button) return;
      const { id } = button.closest("tr").dataset;
      if (button.dataset.action === "edit") openProductDialog(A.findProduct(state.products, id));
      else deleteProduct(id);
    });

    $("add-button").addEventListener("click", () => openProductDialog(null));
    $("product-form").addEventListener("submit", submitProduct);
    $("dialog-cancel").addEventListener("click", () => $("product-dialog").close());
    $("dialog-close").addEventListener("click", () => $("product-dialog").close());
    $("export-button").addEventListener("click", exportCsv);
    $("reset-button").addEventListener("click", resetData);

    $("confirm-cancel").addEventListener("click", () => { state.pendingConfirm = null; $("confirm-dialog").close(); });
    $("confirm-ok").addEventListener("click", () => { const run = state.pendingConfirm; state.pendingConfirm = null; $("confirm-dialog").close(); if (run) run(); });

    $("menu-button").addEventListener("click", () => setMenu(!$("sidebar").classList.contains("is-open")));
    $("backdrop").addEventListener("click", () => setMenu(false));
    $("sidebar").addEventListener("click", e => { if (e.target.closest("a.nav-link")) setMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && $("sidebar").classList.contains("is-open")) setMenu(false); });

    renderAll();
  }

  init();
})();
