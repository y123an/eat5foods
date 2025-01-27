import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variation: {
    price: number;
    stock: number;
    sku: string;
  };
  variationId?: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;

  addToCart: (item: CartItem) => void;
  increaseCartItemQuantity: (id: string, variationId?: string) => void;
  increaseCartItemQuantityBy: (
    id: string,
    amount: number,
    variationId?: string
  ) => void;
  decreaseCartItemQuantity: (id: string, variationId?: string) => void;
  removeFromCart: (id: string, variationId?: string) => void;
  clearCart: () => void;
  loadCart: () => void;
  toggleCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,

  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (existing) =>
          existing.id === item.id &&
          JSON.stringify(existing.variation) === JSON.stringify(item.variation)
      );
      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = state.items.map((existing) =>
          existing.id === item.id &&
          JSON.stringify(existing.variation) === JSON.stringify(item.variation)
            ? { ...existing, quantity: existing.quantity + 1 }
            : existing
        );
      } else {
        updatedItems = [...state.items, item];
      }
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  increaseCartItemQuantity: (id, variationId) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id && item.variationId === variationId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  increaseCartItemQuantityBy: (id, amount, variationId) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id && item.variationId === variationId
          ? { ...item, quantity: item.quantity + amount }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  decreaseCartItemQuantity: (id, variationId) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.id === id && item.variationId === variationId
      );

      if (existingItem && existingItem.quantity > 1) {
        const updatedItems = state.items.map((item) =>
          item.id === id && item.variationId === variationId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return { items: updatedItems };
      } else {
        const updatedItems = state.items.filter(
          (item) => !(item.id === id && item.variationId === variationId)
        );
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return { items: updatedItems };
      }
    });
  },

  removeFromCart: (id, variationId) => {
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => !(item.id === id && item.variationId === variationId)
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },

  loadCart: () => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") ?? "[]"
    ) as CartItem[];

    set({ items: savedCart });
  },

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));

export default useCartStore;
