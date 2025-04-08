import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {

    const handleAddToCart = (product: Product) => {
        console.log('Added to cart:', product.name);
    }

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto my-12"
            data-testid="product-list-container"
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                />
            ))}
            {products.length === 0 && (
                <p className="text-gray-500 text-center py-10">No products found</p>
            )}
        </div>
    );
};

export default ProductList;