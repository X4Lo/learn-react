import React from 'react';
import { Product } from '../types/Product';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {

    const handleAddToCart = () => {
        onAddToCart(product)
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                </div>
                <div className="mt-auto flex justify-between items-center">
                    <span className="text-xl font-semibold text-blue-500">${product.price}</span>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2 transition duration-300"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;