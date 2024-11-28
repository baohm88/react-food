import React, { useContext } from "react";
import logoImage from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
    const { items } = useContext(CartContext);
    const { showCart } = useContext(UserProgressContext);

    const totalCartItems = items.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    function handleShowCart() {
        showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImage} alt="a restaurant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    );
}
