/* data.js: sample/demo product data (24 products, all prices in PKR).
   Schema: id, sku, name, category, costPrice, sellingPrice, stockQuantity,
           reorderLevel, supplier, status ("active" | "inactive"). */
(function (root) {
  "use strict";

  const CATEGORIES = ["Electronics", "Accessories", "Home and Living", "Office Supplies", "Personal Care"];

  const DEMO_PRODUCTS = [
    { id: "PRD-001", sku: "ELE-001", name: "Wireless Mouse",            category: "Electronics",     costPrice: 1200, sellingPrice: 1800, stockQuantity: 25,  reorderLevel: 8,  supplier: "Tech Supplies", status: "active" },
    { id: "PRD-002", sku: "ELE-002", name: "USB-C Fast Charger",        category: "Electronics",     costPrice: 1500, sellingPrice: 2200, stockQuantity: 18,  reorderLevel: 6,  supplier: "VoltEdge",      status: "active" },
    { id: "PRD-003", sku: "ELE-003", name: "Bluetooth Speaker",         category: "Electronics",     costPrice: 3800, sellingPrice: 5200, stockQuantity: 6,   reorderLevel: 8,  supplier: "SoundHub",      status: "active" },
    { id: "PRD-004", sku: "ELE-004", name: "Power Bank 10000mAh",       category: "Electronics",     costPrice: 2600, sellingPrice: 3500, stockQuantity: 0,   reorderLevel: 10, supplier: "VoltEdge",      status: "active" },
    { id: "PRD-005", sku: "ELE-005", name: "Wired Earphones",           category: "Electronics",     costPrice: 450,  sellingPrice: 750,  stockQuantity: 42,  reorderLevel: 15, supplier: "SoundHub",      status: "active" },
    { id: "PRD-006", sku: "ELE-006", name: "HD Webcam",                 category: "Electronics",     costPrice: 2800, sellingPrice: 3900, stockQuantity: 9,   reorderLevel: 5,  supplier: "Tech Supplies", status: "active" },
    { id: "PRD-007", sku: "ACC-001", name: "Silicone Phone Case",       category: "Accessories",     costPrice: 250,  sellingPrice: 550,  stockQuantity: 60,  reorderLevel: 20, supplier: "Casemate",      status: "active" },
    { id: "PRD-008", sku: "ACC-002", name: "Tempered Glass Protector",  category: "Accessories",     costPrice: 120,  sellingPrice: 350,  stockQuantity: 85,  reorderLevel: 30, supplier: "Casemate",      status: "active" },
    { id: "PRD-009", sku: "ACC-003", name: "Laptop Sleeve 15 inch",     category: "Accessories",     costPrice: 900,  sellingPrice: 1450, stockQuantity: 14,  reorderLevel: 6,  supplier: "Urban Carry",   status: "active" },
    { id: "PRD-010", sku: "ACC-004", name: "Daily Backpack",            category: "Accessories",     costPrice: 2100, sellingPrice: 3200, stockQuantity: 7,   reorderLevel: 7,  supplier: "Urban Carry",   status: "active" },
    { id: "PRD-011", sku: "ACC-005", name: "Cable Organizer Set",       category: "Accessories",     costPrice: 180,  sellingPrice: 400,  stockQuantity: 0,   reorderLevel: 12, supplier: "Casemate",      status: "active" },
    { id: "PRD-012", sku: "HOM-001", name: "LED Desk Lamp",             category: "Home and Living", costPrice: 1100, sellingPrice: 1700, stockQuantity: 20,  reorderLevel: 6,  supplier: "BrightHome",    status: "active" },
    { id: "PRD-013", sku: "HOM-002", name: "Ceramic Mug Set (4)",       category: "Home and Living", costPrice: 700,  sellingPrice: 1200, stockQuantity: 16,  reorderLevel: 8,  supplier: "HomeNest",      status: "active" },
    { id: "PRD-014", sku: "HOM-003", name: "Cotton Bed Sheet",          category: "Home and Living", costPrice: 1900, sellingPrice: 2900, stockQuantity: 11,  reorderLevel: 5,  supplier: "HomeNest",      status: "active" },
    { id: "PRD-015", sku: "HOM-004", name: "Storage Basket",            category: "Home and Living", costPrice: 400,  sellingPrice: 750,  stockQuantity: 3,   reorderLevel: 10, supplier: "HomeNest",      status: "active" },
    { id: "PRD-016", sku: "HOM-005", name: "Wall Clock (discontinued)", category: "Home and Living", costPrice: 850,  sellingPrice: 1350, stockQuantity: 12,  reorderLevel: 4,  supplier: "BrightHome",    status: "inactive" },
    { id: "PRD-017", sku: "OFF-001", name: "A4 Paper Ream 80gsm",       category: "Office Supplies", costPrice: 900,  sellingPrice: 1150, stockQuantity: 70,  reorderLevel: 25, supplier: "PaperLine",     status: "active" },
    { id: "PRD-018", sku: "OFF-002", name: "Gel Pen Pack (10)",         category: "Office Supplies", costPrice: 160,  sellingPrice: 300,  stockQuantity: 120, reorderLevel: 40, supplier: "PaperLine",     status: "active" },
    { id: "PRD-019", sku: "OFF-003", name: "Heavy Duty Stapler",        category: "Office Supplies", costPrice: 320,  sellingPrice: 550,  stockQuantity: 22,  reorderLevel: 8,  supplier: "OfficeMate",    status: "active" },
    { id: "PRD-020", sku: "OFF-004", name: "A5 Notebook (Pack of 3)",   category: "Office Supplies", costPrice: 380,  sellingPrice: 650,  stockQuantity: 5,   reorderLevel: 15, supplier: "PaperLine",     status: "active" },
    { id: "PRD-021", sku: "OFF-005", name: "Whiteboard Marker Set",     category: "Office Supplies", costPrice: 250,  sellingPrice: 450,  stockQuantity: 30,  reorderLevel: 10, supplier: "OfficeMate",    status: "active" },
    { id: "PRD-022", sku: "PCR-001", name: "Herbal Shampoo 400ml",      category: "Personal Care",   costPrice: 520,  sellingPrice: 850,  stockQuantity: 34,  reorderLevel: 12, supplier: "PureLeaf",      status: "active" },
    { id: "PRD-023", sku: "PCR-002", name: "Electric Trimmer",          category: "Personal Care",   costPrice: 2400, sellingPrice: 3600, stockQuantity: 8,   reorderLevel: 4,  supplier: "GroomPro",      status: "active" },
    { id: "PRD-024", sku: "PCR-003", name: "Face Wash 150ml",           category: "Personal Care",   costPrice: 380,  sellingPrice: 650,  stockQuantity: 0,   reorderLevel: 10, supplier: "PureLeaf",      status: "active" }
  ];

  const api = { CATEGORIES, DEMO_PRODUCTS };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.StockSenseData = api;
})(typeof window !== "undefined" ? window : globalThis);
