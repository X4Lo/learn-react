import React from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto my-12"
            data-testid="product-list-container"
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
            {products.length === 0 && (
                <p className="text-gray-500 text-center py-10">No products found</p>
            )}
        </div>
    );
};

export default ProductList;