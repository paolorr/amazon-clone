/* eslint-disable no-param-reassign */
import React, { createContext, useContext, useCallback } from 'react';
import { useImmer } from 'use-immer';

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
  increaseItem(productId: string): void;
  decreaseItem(productIf: string): void;
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
  const [cart, setCart] = useImmer(initialState);

  const addToCart = useCallback(
    (item: Omit<Product, 'quantity'>): void => {
      console.log('addToCart');

      setCart(draftCart => {
        const index = draftCart.items.findIndex(
          product => product.id === item.id,
        );

        if (index < 0) {
          draftCart.items.push({ ...item, quantity: 1 });
        } else {
          // console.log('quantity before:', draftCart.items[index].quantity);
          draftCart.items[index].quantity += 1;
          // console.log('quantity after:', draftCart.items[index].quantity);
        }

        draftCart.totalItems += 1;
        draftCart.subtotal = fixDecimal(draftCart.subtotal + item.price);
      });
    },
    [setCart],
  );

  const removeFromCart = useCallback(
    (id: string): void => {
      console.log('removeFromCart');

      setCart(draftCart => {
        const index = draftCart.items.findIndex(product => product.id === id);
        let removedItem: Product;

        if (index >= 0) {
          [removedItem] = draftCart.items.splice(index, 1);
        } else {
          console.warn(
            `Can't remove product (id: ${id}) as it's not in basket!`,
          );
          return;
        }

        draftCart.totalItems -= removedItem.quantity;
        draftCart.subtotal = fixDecimal(
          draftCart.subtotal - removedItem.price * removedItem.quantity,
        );
      });
    },
    [setCart],
  );

  const increaseItem = useCallback(
    (id: string): void => {
      console.log('increaseItem');

      setCart(draftCart => {
        const index = draftCart.items.findIndex(product => product.id === id);
        let item: Product;

        if (index >= 0) {
          item = draftCart.items[index];
        } else {
          console.warn(
            `Can't increase product (id: ${id}) as it's not in basket!`,
          );
          return;
        }

        // console.log('quantity before:', item.quantity);
        item.quantity += 1;
        // console.log('quantity after:', item.quantity);
        // console.log(draftCart.items[index].quantity, item.quantity);

        draftCart.totalItems += 1;
        draftCart.subtotal = fixDecimal(draftCart.subtotal + item.price);
      });
    },
    [setCart],
  );

  const decreaseItem = useCallback(
    (id: string): void => {
      console.log('decreaseItem');

      setCart(draftCart => {
        const index = draftCart.items.findIndex(product => product.id === id);
        let item: Product;

        if (index >= 0) {
          item = draftCart.items[index];
        } else {
          console.warn(
            `Can't decrease product (id: ${id}) as it's not in basket!`,
          );
          return;
        }

        console.log('quantity before:', item.quantity);
        item.quantity -= 1;
        console.log('quantity after:', item.quantity);
        console.log(draftCart.items[index].quantity, item.quantity);

        if (item.quantity <= 0) {
          draftCart.items.splice(index, 1);
        }

        draftCart.totalItems -= 1;
        draftCart.subtotal = fixDecimal(draftCart.subtotal - item.price);
      });
    },
    [setCart],
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseItem, decreaseItem }}
    >
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
