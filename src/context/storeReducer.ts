import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

export interface State {
    products: Product[];
    cartItems: CartItem[];
}

type Action =
    | { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'SET_QUANTITY'; payload: { productId: string, quantity: number } }
    | { type: 'CLEAR_CART' };

export const initialState: State = {
    products: [],
    cartItems: [],
};

export const storeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PRODUCTS': {
            return {
                ...state,
                products: [...action.payload]
            }
        }
        case 'ADD_TO_CART': {
            const existingCartItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (!existingCartItem) {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
                };
            }

            return { ...state };
        }

        case 'REMOVE_FROM_CART': {
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };
        }

        case 'SET_QUANTITY': {
            const existingCartItem = state.cartItems.find((item) => item.id === action.payload.productId);
            if (existingCartItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
                    ),
                };
            }
            return { ...state };
        }

        case 'CLEAR_CART': {
            return {
                ...state,
                cartItems: [],
            };
        }

        default:
            return state;
    }
};