import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StrapiProduct, StrapiVariant } from '@/lib/strapi';

export interface CartItem {
  product: StrapiProduct;
  variant: StrapiVariant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  addItem: (product: StrapiProduct, variant: StrapiVariant, quantity?: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  removeItem: (variantId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCurrency: () => string;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (product, variant, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.variant.id === variant.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.variant.id === variant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { product, variant, quantity }],
          });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.variant.id === variantId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variant.id !== variantId),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        );
      },

      getCurrency: () => {
        return get().items[0]?.product.currency || 'INR';
      },
    }),
    {
      name: 'poster-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
