import React, { createContext, useContext, useReducer } from 'react';
import { storeReducer, initialState } from './storeReducer';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

interface StoreContextProps {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <StoreContext.Provider
      value={{
        products: state.products,
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};