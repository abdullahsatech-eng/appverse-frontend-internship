/* storage.js: localStorage persistence with graceful fallbacks.
   The app still works (in memory only) when storage is blocked or full. */
(function (root) {
  "use strict";
  const KEY = "stocksense.inventory.v1";
  const BACKUP_KEY = "stocksense.backup.v1";
  const memory = {};

  function safe(action) {
    try { return action(); } catch (error) { return undefined; }
  }

  const available = () => safe(() => {
    const probe = "__stocksense_probe__";
    root.localStorage.setItem(probe, "1");
    root.localStorage.removeItem(probe);
    return true;
  }) === true;

  const read = key => (available() ? root.localStorage.getItem(key) : memory[key] ?? null);
  const write = key => value => {
    if (available()) { root.localStorage.setItem(key, value); return true; }
    memory[key] = value;
    return false;
  };

  const clone = list => list.map(p => ({ ...p }));

  /* Returns { products, mode, warning }. Never throws. */
  function load(demoProducts, isValidList) {
    const raw = safe(() => read(KEY));
    const storageNote = available() ? "" : "Browser storage is unavailable, so changes will not be kept after you close this page.";
    if (raw == null) return { products: clone(demoProducts), mode: "demo", warning: storageNote };
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.products) || !isValidList(parsed.products)) throw new Error("invalid");
      return { products: parsed.products, mode: parsed.mode === "demo" ? "demo" : "custom", warning: "" };
    } catch (error) {
      return { products: clone(demoProducts), mode: "demo", warning: "Saved data could not be read, so sample data is shown. The saved copy is untouched until you make a change." };
    }
  }

  /* Returns true when persisted, false when kept in memory only. */
  function save(products, mode) {
    const payload = JSON.stringify({ version: 1, mode, savedAt: new Date().toISOString(), products });
    return safe(() => write(KEY)(payload)) === true;
  }

  /* Reset keeps a backup of the current data first, so nothing is lost silently. */
  function backupCurrent() {
    const raw = safe(() => read(KEY));
    return raw ? safe(() => write(BACKUP_KEY)(raw)) === true : false;
  }

  function clearSaved() {
    safe(() => { if (available()) root.localStorage.removeItem(KEY); else delete memory[KEY]; });
  }

  const api = { KEY, BACKUP_KEY, available, load, save, backupCurrent, clearSaved };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.StockSenseStorage = api;
})(typeof window !== "undefined" ? window : globalThis);
