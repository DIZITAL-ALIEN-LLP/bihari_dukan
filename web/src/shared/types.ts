export interface Product {
  id: string;
  name: string;
  name_hi: string;
  category: string;
  barcode?: string;
  purchase_price: number;
  selling_price: number;
  current_stock: number;
  min_stock_alert: number;
  expiry_date?: string;
  unit: string; // e.g., 'pcs', 'kg', 'ltr'
}

export interface Sale {
  id: string;
  timestamp: string;
  items: SaleItem[];
  total_amount: number;
  payment_method: 'cash' | 'upi';
  cashier_id: string;
}

export interface SaleItem {
  product_id: string;
  quantity: number;
  price_at_sale: number;
}

export interface Expense {
  id: string;
  category: 'rent' | 'salary' | 'electricity' | 'other';
  amount: number;
  date: string;
  note?: string;
}

export interface User {
  id: string;
  phone: string;
  role: 'owner' | 'cashier' | 'staff';
  name: string;
}
