import { create } from 'zustand';
import { Product, SaleItem } from '../shared/types';

interface CartState {
  items: SaleItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (product, quantity) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.product_id === product.id);
      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product_id: product.id, quantity, price_at_sale: product.selling_price }];
      }
      
      const newTotal = newItems.reduce((acc, item) => acc + item.quantity * item.price_at_sale, 0);
      return { items: newItems, total: newTotal };
    }),
  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.product_id !== productId);
      const newTotal = newItems.reduce((acc, item) => acc + item.quantity * item.price_at_sale, 0);
      return { items: newItems, total: newTotal };
    }),
  clearCart: () => set({ items: [], total: 0 }),
}));
