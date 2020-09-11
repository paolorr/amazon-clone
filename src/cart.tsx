import React, { createContext, useContext, useReducer } from 'react';

export interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
  rating: number;
  image: string;
}

interface CartContextData {
  basket: Product[];
  totalItems: number;
  subtotal: number;
}

const initialState: CartContextData = {
  basket: [],
  totalItems: 0,
  subtotal: 0,
};

type Action =
  | { type: 'ADD_TO_BASKET'; item: Omit<Product, 'quantity'> }
  | { type: 'REMOVE_FROM_BASKET'; id: string };

const CartContext = createContext<{
  state: CartContextData;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function fixDecimal(value: number) {
  return Number(value.toFixed(2));
}

function addToBasket(
  state: CartContextData,
  item: Omit<Product, 'quantity'>,
): CartContextData {
  let newBasket = [...state.basket];
  const index = newBasket.findIndex(product => product.id === item.id);

  console.log('called addToBasket');

  if (index < 0) {
    newBasket = [...newBasket, { ...item, quantity: 1 }];
  } else {
    console.log('quantity before:', newBasket[index].quantity);
    newBasket[index].quantity += 1;
    console.log('quantity after:', newBasket[index].quantity);
  }

  return {
    ...state,
    basket: newBasket,
    totalItems: state.totalItems + 1,
    subtotal: fixDecimal(state.subtotal + item.price),
  };
}

function removeFromBasket(state: CartContextData, id: string): CartContextData {
  const newBasket = [...state.basket];
  const index = newBasket.findIndex(product => product.id === id);
  let removedItem: Product | undefined;

  if (index >= 0) {
    [removedItem] = newBasket.splice(index, 1);
  } else {
    alert(`Can't remove product (id: ${id}) as it's not in basket!`);
  }

  return {
    ...state,
    basket: newBasket,
    totalItems: state.totalItems - (removedItem ? removedItem.quantity : 0),
    subtotal: fixDecimal(
      state.subtotal -
        (removedItem ? removedItem.price * removedItem.quantity : 0),
    ),
  };
}

const reducer = (state: CartContextData, action: Action): CartContextData => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return addToBasket(state, action.item);
    case 'REMOVE_FROM_BASKET':
      return removeFromBasket(state, action.id);
    default:
      return state;
  }
};

const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

function useCart(): [CartContextData, React.Dispatch<Action>] {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return [context.state, context.dispatch];
}

export { CartProvider, useCart };

// https://youtu.be/B6ay3jAZN5o?t=4204
