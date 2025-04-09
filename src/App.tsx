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
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  }

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await axios.get<Product[]>('http://localhost:3000/products');
      setProducts(response.data || []);
    } catch (err) {
      console.log("Error fetching products", err);
      setError("Error fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="container mx-auto min-h-screen" data-testid="product-list-container">
        {isLoading &&
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="loading-spinner animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        }
        {!isLoading && !error &&
          <ProductList products={products} onAddToCart={handleAddToCart} />
        }
        {
          error && (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
              <div className="error-message text-red-500 text-lg font-semibold mb-4">Error: {error}</div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={fetchProducts}
              >
                Reload
              </button>
            </div>
          )
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
