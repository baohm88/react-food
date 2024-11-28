import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function MealItem({ id, name, price, image, description }) {
    const { addItem } = useContext(CartContext);

    // const { name, price, image, description } = meal;

    function handleAddMealToCart() {
        addItem({ id, name, price, image, description });
    }

    return (
        <li className="meal-item">
            <article>
                <img
                    src={`https://react-foodorder-backend.onrender.com/${image}`}
                    alt={name}
                />
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">
                        {currencyFormatter.format(price)}
                    </p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}
