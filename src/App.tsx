import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { Product } from "./types/Product";
import { StoreProvider, useStore } from "./context/StoreContext";
import axios from "axios";

const App: React.FC = () => {
  const { products, cartItems, addToCart, setProducts } = useStore();

  const [cartCount, setCartCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  }

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:3000/products');
        setProducts(response.data || []);
      } catch (err) {
        console.log("Error fetching products", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [])

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="container mx-auto min-h-screen" data-testid="product-list-container">
        {
          isLoading &&
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="loading-spinner animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        }
        {!isLoading &&
          <ProductList products={products} onAddToCart={handleAddToCart} />
        }
      </main>
    </>
  );
}

export default () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  )
};
