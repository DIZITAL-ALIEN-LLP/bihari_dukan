# Kirana Pro | किराना प्रो - Design Specification

## 1. Project Overview
**Kirana Pro** is a modern, high-efficiency Inventory Management and Point-of-Sale (POS) system tailored specifically for local Indian Kirana shops (general stores). The application is designed to be mobile-first but desktop-friendly, ensuring shopkeepers can manage their business from a smartphone behind the counter or a tablet/PC.

### Core Philosophy
- **Bilingual Accessibility**: Every label, action, and notification is presented in both English and Hindi. This reduces the barrier to entry for non-technical users and staff members.
- **Speed & Efficiency**: The "Fast Billing" module is the heartbeat of the app, optimized for high-volume foot traffic during peak morning and evening hours.
- **Real-Time Visibility**: Profit, stock, and cash flow metrics are updated instantly to provide the owner with immediate business intelligence.
- **Visual Cues**: Use of semantic colors (Red for Low Stock, Green for Profit) and intuitive icons to convey information at a glance.

---

## 2. Design System: Bharat Retail Core

The visual identity is governed by the **Bharat Retail Core** design system, which balances modern utility with a friendly, trustworthy aesthetic.

### 2.1 Color Palette
- **Primary (Royal Blue: #1e3a8a)**: Used for core branding, primary actions (Save, Complete Sale), and high-level navigation. It evokes professionalism and reliability.
- **Secondary (Mint Green: #22c55e)**: Symbolizes growth, profit, and "In Stock" status. Used for success states and profit-related metrics.
- **Surface (Soft Lavender: #faf8ff)**: The base background color to reduce eye strain during long shifts.
- **Alert (Salmon Pink/Red: #fee2e2)**: Used for critical warnings like "Low Stock" or "Expiry Alert."
- **Neutral (Slate Grey)**: Used for secondary text, dividers, and disabled states.

### 2.2 Typography: Inter
The system uses **Inter**, a highly legible sans-serif font optimized for digital screens.
- **Hierarchy**:
  - **Headlines (Bold)**: Used for screen titles and major card metrics (e.g., ₹12,450).
  - **Subheadings (Medium)**: Used for section titles like "Frequently Sold" or "Recent Sales."
  - **Body (Regular)**: Used for product descriptions and meta-data.
  - **Labels (Small Bold)**: Used for bilingual pairs (e.g., Home | होम).

### 2.3 Iconography
Material Design Icons (Outlined/Rounded) are used for universal recognition.
- `storefront`: Brand identity.
- `dashboard`: Navigation to overview.
- `point_of_sale`: Core billing activity.
- `inventory_2`: Stock management.
- `analytics`: Reports and business health.
- `badge`: Staff management.

---

## 3. Component Architecture

### 3.1 TopAppBar (Small)
- **Visuals**: Clean white background with a thin bottom border (`border-outline-variant`).
- **Content**: Left-aligned brand logo "Kirana Pro | किराना प्रो" with a storefront icon. Right-aligned user avatar/profile initials for quick account switching.

### 3.2 BottomNavBar
- **Visuals**: Fixed to the bottom of the viewport. Uses a pill-shaped indicator for the active state (`bg-secondary-container`).
- **Destinations**: Home, Billing, Stock, Reports, Staff.
- **Logic**: Each tab includes a vertical stack of an icon and a bilingual label.

### 3.3 Metric Cards
- **Structure**: Title (Top Left), Value (Large, Bold), Visual Indicator (Bottom Left, e.g., % change or progress bar).
- **Style**: Elevated surface with subtle borders to differentiate between "Today's Sales," "Today's Profit," and "Cash Balance."

### 3.4 List Items (Inventory/Billing)
- **Components**:
  - **Image/Icon Placeholder**: A rounded box containing a relevant category icon.
  - **Text Stack**: Product name (Primary), Brand/Volume (Secondary).
  - **Status Tag**: Small colored badge (e.g., "LOW STOCK" in light red).
  - **Action Button**: Compact "Add Stock" or "+" button for fast manipulation.

---

## 4. Screen-by-Screen Specifications

### 4.1 Smart Dashboard | डैशबोर्ड
- **Purpose**: The command center for the shop owner.
- **Layout**: 
  - **Hero Section**: Today's Sales displayed as the largest value.
  - **Secondary Metrics**: Profit and Cash Balance in a 2-column grid.
  - **Alerts Row**: Horizontal cards for "Low Stock" and "Expiry Alert" requiring immediate attention.
  - **Quick Actions**: Iconic shortcuts for "New Bill," "Add Stock," etc.
  - **Charts**: Simple line/wave graphs for Weekly Profit and Sales vs Purchases.

### 4.2 Fast Billing | बिलिंग
- **Purpose**: High-speed checkout.
- **Layout**:
  - **Search/Scan**: A prominent search bar at the top with a barcode scanner icon.
  - **Frequently Sold Grid**: 2x2 grid of common items (e.g., Milk, Bread) for one-tap adding to cart.
  - **Cart Summary**: A scrollable list showing items, quantities, and individual prices.
  - **Payment Footer**: Clear buttons for "Cash | नकद" and "UPI | यूपीआई," followed by a full-width "Complete Sale" action.

### 4.3 Inventory Stock | स्टॉक
- **Purpose**: Master list management.
- **Layout**:
  - **Search & Filter**: Search bar followed by a horizontal pill-filter (All, Low Stock, Grocery, Dairy).
  - **Product Cards**: Detailed cards showing current stock levels (e.g., "42 pcs") and expiry dates.
  - **Primary Action**: Floating or bottom-anchored "Add New Product" button.

### 4.4 Manage Product | सामान की जानकारी
- **Purpose**: Data entry and pricing logic.
- **Layout**:
  - **Form Sections**: Product Info (Name, Category, Barcode), Pricing (Purchase, Selling, Profit calculation), and Stock (Current, Min Alert, Expiry, Supplier).
  - **Dynamic Logic**: As the user enters Purchase and Selling prices, the "Profit/Unit" and "Margin %" should update in real-time.

### 4.5 Reports & Expenses | रिपोर्ट और खर्चे
- **Purpose**: Financial auditing.
- **Layout**:
  - **Tab Switcher**: Toggle between "Reports" and "Expenses."
  - **Monthly Summary**: Large pie chart or ring chart showing the breakdown of Rent, Staff, and Electricity.
  - **Net Profit Highlighting**: Large summary card showing "Total Profit" minus "Total Expenses" to give the "Net Profit."

---

## 5. Interaction States & Animations
- **Tap Feedback**: Slight scale-down (95-98%) on buttons to provide tactile confirmation.
- **Transitions**: Horizontal slide-in for screen navigation; subtle fade-in for modal overlays.
- **Empty States**: Friendly illustrations with clear "Add Item" prompts when lists are empty.

---

## 6. Business Logic Integration
- **Inventory Flow**: 
  - *Purchase*: Increases stock count and updates "Cash Balance" (deduction).
  - *Sale*: Decreases stock count, updates "Today's Sales," and adds to "Cash Balance."
  - *Profit Calculation*: `(Selling Price - Purchase Price) * Quantity`.
  - *Net Balance*: `Current Cash + (Sales - Expenses)`.

---

## 7. Future Considerations
- **Supplier Ledger**: Tracking credit given to/taken from suppliers.
- **Customer Udhaar (Credit)**: Managing local customer credit accounts.
- **Dark Mode**: High-contrast theme for low-light shop environments.
- **Multi-device Sync**: Cloud-based backup for multiple staff devices.

---
*End of Design Specification*
