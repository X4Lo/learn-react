import React, { createContext, useContext, useReducer } from 'react';
import { storeReducer, initialState } from './storeReducer';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

interface StoreContextProps {
    products: Product[];
    cartItems: CartItem[];
    setProducts: (products: Product[]) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    setQuantity: (productId: string, quantity: number) => void;
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

    const setProducts = (products: Product[]) => {
        dispatch({ type: 'SET_PRODUCTS', payload: products });
    };

    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const setQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'SET_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <StoreContext.Provider
            value={{
                products: state.products,
                cartItems: state.cartItems,
                setProducts,
                addToCart,
                removeFromCart,
                setQuantity,
                clearCart,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};