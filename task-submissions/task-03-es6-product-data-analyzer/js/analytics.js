/* analytics.js: pure functions (no DOM). Every required ES6+ feature does
   real work here: destructuring, spread, map, filter, reduce, find, some,
   every, and the summary object. Business rules are documented below.

   Rules
   - Inventory cost value      = costPrice * stockQuantity
   - Potential retail value    = sellingPrice * stockQuantity
   - Estimated gross profit    = retail value - cost value (an estimate, not realised profit)
   - Out of stock              = stockQuantity === 0
   - Low stock                 = 0 < stockQuantity <= reorderLevel
   - Only ACTIVE products count in the summary, category analysis and restock alerts.
     Inactive products stay in the table (badge "Inactive") but are excluded from totals.
   - Selling price must be >= cost price (stops selling-below-cost typing mistakes). */
(function (root) {
  "use strict";

  const DEFAULT_CATEGORIES = ["Electronics", "Accessories", "Home and Living", "Office Supplies", "Personal Care"];

  /* ---- Formatting ---------------------------------------------------- */
  const pkr = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });
  const formatPKR = value => pkr.format(Number.isFinite(value) ? value : 0);
  const formatNumber = value => new Intl.NumberFormat("en-PK").format(Number.isFinite(value) ? value : 0);

  /* ---- Per-product helpers (object destructuring in parameters) ------- */
  const costValue = ({ costPrice, stockQuantity }) => costPrice * stockQuantity;
  const retailValue = ({ sellingPrice, stockQuantity }) => sellingPrice * stockQuantity;

  function getStockState({ status, stockQuantity, reorderLevel }) {
    if (status === "inactive") return "inactive";
    if (stockQuantity === 0) return "out";
    if (stockQuantity <= reorderLevel) return "low";
    return "in";
  }

  /* ---- Validation ----------------------------------------------------- */
  const isNonNegativeNumber = n => typeof n === "number" && Number.isFinite(n) && n >= 0;
  const isNonNegativeInteger = n => Number.isInteger(n) && n >= 0;

  /* Returns { field: message }. An empty object means valid.
     `others` are the other products (used for duplicate ID/SKU checks). */
  function validateProduct(product, others = [], categories = DEFAULT_CATEGORIES) {
    const { id, sku, name, category, supplier, costPrice, sellingPrice, stockQuantity, reorderLevel, status } = product;
    const errors = {};
    const clean = s => String(s ?? "").trim();

    if (!clean(name)) errors.name = "Enter a product name.";
    else if (clean(name).length > 80) errors.name = "Keep the name under 80 characters.";

    if (!clean(sku)) errors.sku = "Enter a SKU, for example ELE-007.";
    else if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(clean(sku))) errors.sku = "Use letters, numbers and hyphens only.";
    else if (others.some(o => clean(o.sku).toLowerCase() === clean(sku).toLowerCase())) errors.sku = "This SKU is already used by another product.";

    if (!clean(id)) errors.id = "Product ID is missing.";
    else if (others.some(o => o.id === id)) errors.id = "This product ID already exists.";

    if (!categories.includes(category)) errors.category = "Choose a category from the list.";
    if (!clean(supplier)) errors.supplier = "Enter a supplier name.";
    if (!isNonNegativeNumber(costPrice)) errors.costPrice = "Enter a cost price of 0 or more.";
    if (!isNonNegativeNumber(sellingPrice)) errors.sellingPrice = "Enter a selling price of 0 or more.";
    else if (isNonNegativeNumber(costPrice) && sellingPrice < costPrice) errors.sellingPrice = "Selling price must not be lower than the cost price.";
    if (!isNonNegativeInteger(stockQuantity)) errors.stockQuantity = "Enter a whole number of 0 or more.";
    if (!isNonNegativeInteger(reorderLevel)) errors.reorderLevel = "Enter a whole number of 0 or more.";
    if (!["active", "inactive"].includes(status)) errors.status = "Choose Active or Inactive.";
    return errors;
  }

  /* every(): all records valid. An empty list is "vacuously" valid
     (every([]) === true), so callers that care about emptiness must check
     the length separately. */
  const allRecordsValid = (products, categories = DEFAULT_CATEGORIES) =>
    products.every((p, i) => Object.keys(validateProduct(p, products.filter((_, j) => j !== i), categories)).length === 0);

  /* some(): is any active product at or below its reorder level? */
  const needsRestock = products => products.some(p => ["low", "out"].includes(getStockState(p)));

  /* ---- Summary object (reduce) --------------------------------------- */
  function computeSummary(products, categories = DEFAULT_CATEGORIES) {
    const active = products.filter(p => p.status === "active");
    const totals = active.reduce(
      (acc, p) => ({
        totalUnits: acc.totalUnits + p.stockQuantity,
        inventoryCostValue: acc.inventoryCostValue + costValue(p),
        potentialRetailValue: acc.potentialRetailValue + retailValue(p)
      }),
      { totalUnits: 0, inventoryCostValue: 0, potentialRetailValue: 0 }
    );
    return {
      totalProducts: active.length,
      inactiveProducts: products.length - active.length,
      ...totals,
      estimatedGrossProfit: totals.potentialRetailValue - totals.inventoryCostValue,
      lowStockCount: active.filter(p => getStockState(p) === "low").length,
      outOfStockCount: active.filter(p => getStockState(p) === "out").length,
      needsRestock: needsRestock(active),
      allRecordsValid: allRecordsValid(products, categories)
    };
  }

  /* ---- Category analysis (reduce + map + spread) ---------------------- */
  function categoryBreakdown(products, categories = DEFAULT_CATEGORIES) {
    const byCategory = products
      .filter(p => p.status === "active")
      .reduce((acc, p) => {
        const current = acc[p.category] ?? { products: 0, units: 0, cost: 0, retail: 0 };
        return { ...acc, [p.category]: { products: current.products + 1, units: current.units + p.stockQuantity, cost: current.cost + costValue(p), retail: current.retail + retailValue(p) } };
      }, {});
    const known = categories.filter(c => byCategory[c]);
    const extra = Object.keys(byCategory).filter(c => !categories.includes(c));
    const rows = [...known, ...extra].map(category => ({ category, ...byCategory[category], profit: byCategory[category].retail - byCategory[category].cost }));
    const maxRetail = Math.max(0, ...rows.map(r => r.retail));
    return rows.map(r => ({ ...r, share: maxRetail ? r.retail / maxRetail : 0 }));
  }

  /* ---- Lookup (find) -------------------------------------------------- */
  const findProduct = (products, idOrSku) => {
    const key = String(idOrSku).trim().toLowerCase();
    return products.find(({ id, sku }) => id.toLowerCase() === key || sku.toLowerCase() === key);
  };

  /* ---- Search + filters combine (filter) ------------------------------ */
  function filterProducts(products, { query = "", category = "all", stock = "all" } = {}) {
    const q = query.trim().toLowerCase();
    return products
      .filter(({ name, sku }) => !q || name.toLowerCase().includes(q) || sku.toLowerCase().includes(q))
      .filter(p => category === "all" || p.category === category)
      .filter(p => stock === "all" || getStockState(p) === stock);
  }

  /* ---- Sorting copies the array first (spread): the source is untouched */
  const SORT_KEYS = {
    name: p => p.name.toLowerCase(),
    price: p => p.sellingPrice,
    stock: p => p.stockQuantity,
    value: p => costValue(p)
  };
  function sortProducts(products, key = "name", direction = "asc") {
    const pick = SORT_KEYS[key] ?? SORT_KEYS.name;
    const sign = direction === "desc" ? -1 : 1;
    return [...products].sort((a, b) => {
      const [x, y] = [pick(a), pick(b)];
      if (x === y) return a.id.localeCompare(b.id);
      return (x < y ? -1 : 1) * sign;
    });
  }

  /* ---- Display rows (map + destructuring) ----------------------------- */
  const toRow = product => {
    const { id, sku, name, category, costPrice, sellingPrice, stockQuantity, reorderLevel, supplier } = product;
    return { id, sku, name, category, supplier, state: getStockState(product), stockQuantity, reorderLevel,
      cost: formatPKR(costPrice), price: formatPKR(sellingPrice), value: formatPKR(costValue(product)) };
  };
  const toRows = products => products.map(toRow);

  /* ---- CSV export ----------------------------------------------------- */
  function toCSV(products) {
    const header = ["ID", "SKU", "Name", "Category", "Supplier", "Cost price (PKR)", "Selling price (PKR)", "Stock quantity", "Reorder level", "Status", "Stock state", "Inventory cost value (PKR)"];
    const esc = v => { const s = String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    const rows = products.map(p => [p.id, p.sku, p.name, p.category, p.supplier, p.costPrice, p.sellingPrice, p.stockQuantity, p.reorderLevel, p.status, getStockState(p), costValue(p)]);
    return [header, ...rows].map(r => r.map(esc).join(",")).join("\r\n");
  }

  /* ---- ID generation -------------------------------------------------- */
  function nextProductId(products) {
    const max = products.reduce((m, { id }) => Math.max(m, Number((id.match(/(\d+)$/) || [])[1]) || 0), 0);
    return `PRD-${String(max + 1).padStart(3, "0")}`;
  }

  const api = { DEFAULT_CATEGORIES, formatPKR, formatNumber, costValue, retailValue, getStockState, validateProduct, allRecordsValid, needsRestock,
    computeSummary, categoryBreakdown, findProduct, filterProducts, sortProducts, toRow, toRows, toCSV, nextProductId };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.StockSenseAnalytics = api;
})(typeof window !== "undefined" ? window : globalThis);
