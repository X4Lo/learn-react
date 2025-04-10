import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { useStore } from "./context/StoreContext";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  const { cartItems } = useStore();
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
  }, [cartItems]);

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="container mx-auto min-h-screen" data-testid="product-list-container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
