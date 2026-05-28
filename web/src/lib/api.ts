import { supabase } from './supabase';
import { Product, Sale, SaleItem } from '@/shared/types';

export const productsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data as Product[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Product;
  },

  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    return data as Product;
  },

  async update(id: string, product: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Product;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

export const salesApi = {
  async create(sale: Omit<Sale, 'id' | 'created_at'>, items: Omit<SaleItem, 'id' | 'sale_id' | 'created_at'>[]) {
    // Start a transaction-like process
    // 1. Create the sale
    const { data: saleData, error: saleError } = await supabase
      .from('sales')
      .insert([sale])
      .select()
      .single();
    
    if (saleError) throw saleError;

    // 2. Prepare and insert sale items
    const saleItems = items.map(item => ({
      ...item,
      sale_id: saleData.id
    }));

    const { error: itemsError } = await supabase
      .from('sale_items')
      .insert(saleItems);
    
    if (itemsError) throw itemsError;

    // 3. Update stock levels for each product
    // Note: In a production app, this should be done via a database RPC function 
    // to ensure atomicity and prevent race conditions.
    for (const item of items) {
      // Get current stock
      const { data: product } = await supabase
        .from('products')
        .select('current_stock')
        .eq('id', item.product_id)
        .single();

      if (product) {
        await supabase
          .from('products')
          .update({ current_stock: product.current_stock - item.quantity })
          .eq('id', item.product_id);
      }
    }

    return saleData as Sale;
  },

  async getRecent() {
    const { data, error } = await supabase
      .from('sales')
      .select('*, sale_items(*, products(*))')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data;
  }
};
