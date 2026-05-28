# Kirana Smart Manager | किराना स्मार्ट मैनेजर

**Kirana Smart Manager** is a modern, high-efficiency Inventory Management and Point-of-Sale (POS) system tailored specifically for local Indian Kirana shops (general stores).
 It balances a polished, professional aesthetic with bilingual accessibility to empower shopkeepers across India.

---

## 🚀 Key Features

### 1. Fast Billing (POS)
- **High-Speed Checkout**: Optimized for peak hours with a "Fast Select" grid for common items.
- **Bilingual Interface**: Seamless switching and display of English and Hindi labels.
- **Flexible Payments**: Built-in support for Cash and UPI workflows.
- **Cart Management**: Real-time quantity adjustments and total calculations.

### 2. Smart Inventory Management
- **Stock Tracking**: Monitor stock levels with visual cues for low stock and upcoming expiry.
- **Dynamic Pricing**: Automatic margin and profit-per-unit calculations during product entry.
- **Search & Filter**: Powerful search (English/Hindi) and categorical filtering.

### 3. Business Intelligence Dashboard
- **Daily Metrics**: Instant visibility into Today's Sales, Today's Profit, and Cash Balance.
- **Critical Alerts**: Dedicated alerts for Low Stock and Expiry items.

---

## 🛠 Technology Stack

### Frontend (Web)
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with the custom *Bharat Retail Core* design system.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **I18n**: [i18next](https://www.i18next.com/)

### Mobile (Planned)
- **Framework**: React Native (Expo)
- **Storage**: WatermelonDB / SQLite for offline-first resilience.

### Backend (Planned)
- **Infrastructure**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Edge Functions)

---

## 📂 Project Structure

```
Kirana_Pro/
├── web/              # Next.js Web Application
│   ├── src/app/      # App Router routes (Dashboard, Billing, Stock)
│   ├── src/components/ # Shared UI components (MetricCard, TopAppBar, etc.)
│   └── src/store/    # Zustand state stores
├── mobile/           # React Native / Expo Application (In Progress)
├── shared/           # Shared types and bilingual (i18n) dictionaries
└── supabase/         # Backend schemas and configurations
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Kirana_Pro
   ```

2. **Setup Web App**
   ```bash
   cd web
   npm install
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

---

## 🗺 Implementation Roadmap

- [x] Project Scaffolding & Design System Setup
- [x] Bilingual Support (English/Hindi)
- [x] Dashboard MVP
- [x] Fast Billing POS Module
- [x] Inventory Management Module
- [ ] Supabase Backend Integration (Auth & DB)
- [ ] Barcode Scanning (Camera Integration)
- [ ] Mobile App (Expo) Initialization
- [ ] PDF Report Generation

---

## 🎨 Design Philosophy: Bharat Retail Core
The UI is built on the **Bharat Retail Core** design system, utilizing:
- **Primary Blue (#1e3a8a)** for trust and reliability.
- **Mint Green (#22c55e)** for profit and growth.
- **Soft Lavender (#faf8ff)** surface to reduce eye strain.
- **Bilingual Typography**: Inter font with clear English/Hindi pairings.

---

By - Dhruw_Shekhar