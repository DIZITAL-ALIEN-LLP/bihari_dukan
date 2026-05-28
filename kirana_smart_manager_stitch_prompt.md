# Stitch Enhanced Prompt: Kirana Smart Manager

This prompt is optimized for Stitch according to the *Effective Prompting Guide*, focusing on the "Incremental Approach" and specific UI keywords.

---

### **Initial Project Concept**
**Kirana Smart Manager**: A modern, high-efficiency Inventory Management and POS system specifically for local Indian Kirana shops (general stores). 

### **Design System: Bharat Retail Core**
*   **Vibe**: Professional, trustworthy, and minimal.
*   **Palette**: 
    *   Primary: Royal Blue (#1e3a8a) for branding and core actions.
    *   Secondary: Mint Green (#22c55e) for success states and profit.
    *   Surface: Soft Lavender (#faf8ff) for backgrounds.
    *   Alert: Salmon Pink (#fee2e2) for warnings.
*   **Typography**: Inter (sans-serif) for high legibility.

---

### **Core Screens & Functional Details**

#### **1. Smart Dashboard (Command Center)**
*   **Hero Section**: Display "Today's Sales" as the largest bold value.
*   **Grid Layout**: 2-column grid showing "Today's Profit" (Green) and "Cash Balance" (Blue).
*   **Alerts Row**: Horizontal cards for "Low Stock" and "Expiry Alert" with red indicators.
*   **Quick Actions**: Large iconic buttons for "New Bill" and "Add Stock."

#### **2. Fast Billing (POS)**
*   **Header**: Search bar with a `ScanBarcode` icon.
*   **Fast Select Grid**: 2x2 grid of frequently sold items (e.g., Milk, Bread) for one-tap adding.
*   **Cart Section**: Scrollable list showing product name, quantity adjustment (+/-), and price.
*   **Payment Footer**: Horizontal buttons for "Cash | नकद" and "UPI | यूपीआई" followed by a full-width "Complete Sale" action in Mint Green.

#### **3. Inventory Master List**
*   **Filter Pills**: Horizontal scroll of filter chips: "All," "Low Stock," "Grocery," "Dairy."
*   **Product Cards**: Elevation-based cards showing product name, current stock quantity (e.g., "42 pcs"), and a "Plus" button for quick stock addition.

#### **4. Product Management Form**
*   **Sections**: Product Info (Name, Hindi Name, Barcode), Pricing (Purchase vs. Selling), and Stock.
*   **Interactive Logic**: A summary card that updates in real-time to show "Profit per Unit" and "Margin %" based on price inputs.

---

### **Refinement Instructions (Use one at a time)**
*   "On the Billing screen, change the 'Complete Sale' button to a fixed bottom footer with a high-contrast background."
*   "On the Dashboard, ensure all metric cards use the `Soft Lavender` background with subtle slate borders."
*   "Switch all UI labels and placeholders to be bilingual (English | Hindi)."
