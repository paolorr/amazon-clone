import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  rating: number;
  image: string;
}

interface CartState {
  items: Product[];
  totalItems: number;
  subtotal: number;
}
interface CartContextData {
  cart: CartState;
  addToCart(item: Omit<Product, 'quantity'>): void;
  removeFromCart(productId: string): void;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

const CartContext = createContext<CartContextData>({} as CartContextData);

function fixDecimal(value: number) {
  return Number(value.toFixed(2));
}

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState(initialState);

  const addToCart = useCallback(
    (item: Omit<Product, 'quantity'>): void => {
      console.log('addToCart');

      const newCart = { ...cart };
      const index = newCart.items.findIndex(product => product.id === item.id);

      if (index < 0) {
        newCart.items.push({ ...item, quantity: 1 });
      } else {
        // console.log('quantity before:', newCart.items[index].quantity);
        newCart.items[index].quantity += 1;
        // console.log('quantity after:', newCart.items[index].quantity);
      }

      newCart.totalItems += 1;
      newCart.subtotal = fixDecimal(newCart.subtotal + item.price);

      console.log(newCart);

      setCart(newCart);
    },
    [cart],
  );

  const removeFromCart = useCallback(
    (id: string): void => {
      console.log('removeFromCart');

      const newCart = { ...cart };
      const index = newCart.items.findIndex(product => product.id === id);
      let removedItem: Product | undefined;

      if (index >= 0) {
        [removedItem] = newCart.items.splice(index, 1);
      } else {
        alert(`Can't remove product (id: ${id}) as it's not in basket!`);
        return;
      }

      newCart.totalItems -= removedItem.quantity;
      newCart.subtotal = fixDecimal(
        newCart.subtotal - removedItem.price * removedItem.quantity,
      );

      console.log(newCart);

      setCart(newCart);
    },
    [cart],
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
}

export { CartProvider, useCart };

// https://youtu.be/B6ay3jAZN5o?t=4204
