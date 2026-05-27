export interface Product {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  barcode: string | null;
  purchase_price: number;
  selling_price: number;
  current_stock: number;
  min_stock_alert: number;
  expiry_date: string | null;
  unit: string;
  created_at?: string;
  updated_at?: string;
}

export interface Sale {
  id: string;
  owner_id: string;
  cashier_id: string | null;
  total_amount: number;
  payment_method: 'cash' | 'upi';
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  price_at_sale: number;
  created_at: string;
}

export interface Profile {
  id: string;
  name: string | null;
  phone: string;
  role: 'owner' | 'cashier' | 'staff';
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  owner_id: string;
  category: 'rent' | 'salary' | 'electricity' | 'other';
  amount: number;
  date: string;
  note: string | null;
  created_at: string;
}
