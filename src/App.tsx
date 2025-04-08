import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { Product } from "./types/Product";
import { StoreProvider, useStore } from "./context/StoreContext";

const App: React.FC = () => {
  const { products, cartItems, addToCart, removeFromCart, clearCart } = useStore();

  const [cart, setCart] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = (product: Product) => {
    if (!cart.some((p: Product) => p.id == product.id)) {
      setCart([...cart, product]);
    }
  }

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart])

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="container mx-auto min-h-screen" data-testid="product-list-container">
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main>
    </>
  );
}

export default () => {
  return (
    <>
      <StoreProvider>
        <App />
      </StoreProvider>
    </>
  )
};
