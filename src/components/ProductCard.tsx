import React, { useState } from 'react';
import { Product } from '../types/Product';
import { MinusIcon, PlusIcon, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {

    const handleAddToCart = () => {
        onAddToCart(product)
    }

    const [isFlipped, setIsFlipped] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="max-w-sm">
            <div
                className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                onClick={handleCardClick}
            >
                <div className="flip-card-inner h-[375px]">
                    {/* Front Side */}
                    <div className="flip-card-front bg-white shadow-lg rounded-lg overflow-hidden h-full">
                        <div className="relative overflow-hidden">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-50 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-4"
                            />
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                                <p className="text-gray-600 text-sm truncate">{product.description}</p>
                            </div>
                            <div className="mt-4 flex justify-between items-center gap-5">
                                <span className="text-xl font-semibold text-blue-500">${product.price}</span>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full inline-block">
                                    {product.category}
                                </span>
                            </div>

                            {isInCart ? (
                                <div className="mt-3 flex justify-between items-center gap-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded transition duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (quantity > 1) {
                                                setQuantity(quantity - 1);
                                            } else {
                                                setIsInCart(false);
                                            }
                                        }}
                                    >
                                        <MinusIcon />
                                    </button>
                                    <span className="text-lg font-semibold">{quantity}</span>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded transition duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setQuantity(quantity + 1);
                                        }}
                                    >
                                        <PlusIcon />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="mt-3 text-white text-sm font-semibold py-2 px-4 rounded flex justify-center items-center gap-2 transition duration-300 bg-blue-500 hover:bg-blue-600"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsInCart(true);
                                        setQuantity(1);
                                        handleAddToCart();
                                    }}
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Back Side */}
                    <div className="flip-card-back bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center h-full">
                        <h3 className="text-lg font-bold mb-4">{product.name}</h3>
                        <p className="text-gray-600 text-sm text-center">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;