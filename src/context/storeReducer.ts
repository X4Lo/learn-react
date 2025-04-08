import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";

export interface State {
    products: Product[];
    cartItems: CartItem[];
}

type Action =
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'CLEAR_CART' };

export const initialState: State = {
    products: [
        {
            "id": "1",
            "name": "React T-Shirt",
            "description": "Show your love for React with this comfy tee.",
            "price": 24.99,
            "imageUrl": "https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C61jhvWSmZ1L.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
            "category": "Shirt"
        },
        {
            "id": "2",
            "name": "Vue T-Shirt",
            "description": "A stylish shirt for Vue enthusiasts.",
            "price": 22.99,
            "imageUrl": "https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C81hy-ZbLBZL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679_.png",
            "category": "Shirt"
        },
        {
            "id": "3",
            "name": "Angular T-Shirt",
            "description": "Represent the Angular framework.",
            "price": 23.99,
            "imageUrl": "https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C61zU1gMSrBL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679_.png",
            "category": "Shirt"
        },
        {
            "id": "4",
            "name": "JavaScript Mug",
            "description": "Start your day with coffee and JavaScript.",
            "price": 15.5,
            "imageUrl": "https://m.media-amazon.com/images/I/51H-6tGpGKL._AC_UF1000,1000_QL80_.jpg",
            "category": "Mug"
        },
        {
            "id": "5",
            "name": "Node.js Hoodie",
            "description": "Stay warm and code with this Node.js hoodie.",
            "price": 45.0,
            "imageUrl": "https://m.media-amazon.com/images/I/C1q2gsVPHWL._CLa%7C2140%2C2000%7C71408n2HbqL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679_.png",
            "category": "Hoodie"
        },
        {
            "id": "6",
            "name": "CSS Sticker Pack",
            "description": "Decorate your laptop with these CSS stickers.",
            "price": 9.99,
            "imageUrl": "https://m.media-amazon.com/images/I/61fHbfQpq-L._AC_SL1500_.jpg",
            "category": "Sticker"
        },
        {
            "id": "7",
            "name": "HTML5 T-shirt",
            "description": "A cool t-shirt for web developers.",
            "price": 18.0,
            "imageUrl": "https://m.media-amazon.com/images/I/B1pppR4gVKL._CLa%7C2140%2C2000%7C71rKKdc10DL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UY1000_.png",
            "category": "Shirt"
        },
        {
            "id": "8",
            "name": "TypeScript Cap",
            "description": "Keep the sun out of your eyes while typing.",
            "price": 20.0,
            "imageUrl": "https://m.media-amazon.com/images/I/61HHeBJ1xWL._AC_SX679_.jpg",
            "category": "Cap"
        }
    ],
    cartItems: [],
};

export const storeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingCartItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingCartItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
            };
        }

        case 'REMOVE_FROM_CART': {
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };
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