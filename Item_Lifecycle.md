# Item Lifecycle: Bihari Kirana Digital Alien

This document outlines the journey of a product from the moment it enters the shop to the point it leaves the shelf.

---

## Phase 1: Procurement & Entry (आवक)
1.  **Stock Arrival:** New stock arrives at the shop.
2.  **Product Discovery:**
    *   **New Product:** The owner opens the **Add Product** screen, enters English/Hindi names, scans the barcode, and sets the purchase/selling price.
    *   **Existing Product:** The owner finds the item in the **Stock** list and uses the "Quick Add" (+) button.
3.  **Digital Registration:** The item is saved to Supabase, making it visible on the Dashboard and Billing screens.

## Phase 2: Inventory Management (स्टॉक प्रबंधन)
1.  **Active Status:** The item sits on the shelf and is displayed in the "Inventory Master List."
2.  **Monitoring:** 
    *   The system tracks `current_stock` vs. `min_stock_alert`.
    *   If `current_stock` falls below the limit, the item triggers a **Low Stock Alert** (Salmon Pink) on the Dashboard.
3.  **Expiry Tracking:** Items with an `expiry_date` trigger a **Clock Alert** (Orange) as the date approaches.

## Phase 3: The Sale (बिक्री)
1.  **Selection:** In the **Billing** screen, the cashier:
    *   Scans the barcode (Fastest).
    *   Taps a "Fast Select" tile (e.g., Milk/Bread).
    *   Searches by name (English or Hindi).
2.  **Cart Entry:** The item is added to the digital "Jhola" (Cart). Quantity is adjusted using +/- buttons.
3.  **Checkout:** Payment is selected (Cash/UPI).
4.  **Transaction:** On "Complete Sale," the system:
    *   Reduces the `current_stock` in the database.
    *   Adds a record to the `sales` and `sale_items` tables.

## Phase 4: Restock or Removal (पुनःपूर्ति या हटाना)
1.  **Restock:** After a "Low Stock" alert, the owner buys more, updates the quantity in the **Edit Product** screen, and the cycle repeats.
2.  **Price Adjustment:** If the market price changes, the owner edits the "Selling Price" to maintain the "Profit per Unit" margin.
3.  **Deletion:** If the shop stops selling the item, it is deleted from the **Edit Product** screen, removing it from all active lists.

---

### **Digital "Pulse" Indicators**
*   **Green (Success):** Profit margin is healthy.
*   **Blue (Info):** Normal stock levels.
*   **Red/Salmon (Critical):** Out of stock – immediate action needed.
