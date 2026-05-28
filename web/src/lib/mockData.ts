import { Product } from '@/shared/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    owner_id: 'd3b07384-d990-4395-9056-b054848074d1',
    name: 'Amul Milk (1L)',
    category: 'dairy',
    purchase_price: 60,
    selling_price: 64,
    current_stock: 42,
    min_stock_alert: 10,
    unit: 'pcs',
    barcode: '123456789',
    expiry_date: '2026-06-01'
  },
  {
    id: '2',
    owner_id: 'd3b07384-d990-4395-9056-b054848074d1',
    name: 'Fortune Oil (1L)',
    category: 'grocery',
    purchase_price: 140,
    selling_price: 155,
    current_stock: 5,
    min_stock_alert: 10,
    unit: 'pcs',
    expiry_date: null,
    barcode: null
  },
  {
    id: '3',
    owner_id: 'd3b07384-d990-4395-9056-b054848074d1',
    name: 'Parle-G (Small)',
    category: 'snacks',
    purchase_price: 4.2,
    selling_price: 5,
    current_stock: 120,
    min_stock_alert: 24,
    unit: 'pcs',
    expiry_date: null,
    barcode: '8901719101032'
  },
  {
    id: '4',
    owner_id: 'd3b07384-d990-4395-9056-b054848074d1',
    name: 'Tata Salt (1kg)',
    category: 'grocery',
    purchase_price: 24,
    selling_price: 28,
    current_stock: 15,
    min_stock_alert: 5,
    unit: 'pcs',
    expiry_date: null,
    barcode: '8901131150012'
  }
];
