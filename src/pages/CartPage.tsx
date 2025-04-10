import React from "react";
import { useStore } from "../context/StoreContext";
import CartList from "../components/CartList";

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, setQuantity } = useStore();

    const handleRemoveFromCart = (productId: string) => {
        removeFromCart(productId);
    }

    const handleQuantityUpdate = (productId: string, quantity: number) => {
        setQuantity(productId, quantity);
    }

    return (
        <>
            <CartList cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onQuantityUpdate={handleQuantityUpdate} />
        </>
    )
}

export default CartPage;