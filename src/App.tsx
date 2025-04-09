import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { Product } from "./types/Product";
import { StoreProvider, useStore } from "./context/StoreContext";

const App: React.FC = () => {
  const { products, cartItems, addToCart } = useStore();

  // const [cart, setCart] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    // if (!cart.some((p: Product) => p.id == product.id)) {
    //   setCart([...cart, product]);
    // }
  }

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

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
    <StoreProvider>
      <App />
    </StoreProvider>
  )
};
