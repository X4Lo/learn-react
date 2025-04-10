import React from 'react';
import { CartItem } from '../types/CartItem';

interface CartListProps {
    cartItems: CartItem[];
    onRemoveFromCart: (productId: string) => void;
    onQuantityUpdate: (productId: string, quantity: number) => void;
}

const CartList: React.FC<CartListProps> = ({ cartItems, onRemoveFromCart, onQuantityUpdate }) => {
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto my-12">
            <div className="space-y-6">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <button
                                            onClick={() => onQuantityUpdate(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="px-2 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                                        >
                                            -
                                        </button>
                                        <span className="text-gray-700 font-medium">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => onQuantityUpdate(item.id, item.quantity + 1)}
                                            className="px-2 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <button
                                    onClick={() => onRemoveFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>
                                <p className="text-lg font-bold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-10">
                        Your cart is empty
                    </p>
                )}
            </div>

            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                <h4 className="text-xl font-semibold">Total:</h4>
                <p className="text-2xl font-bold text-green-600">
                    ${totalPrice.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default CartList;