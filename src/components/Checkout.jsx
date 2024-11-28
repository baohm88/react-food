import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Error from "./Error";

export default function Checkout() {
    const { items, clearCart } = useContext(CartContext);
    const { progress, resetProgress } = useContext(UserProgressContext);
    const { data, isLoading, error, sendRequest, clearData } = useHttp(
        "https://react-foodorder-backend.onrender.com/orders",
        { method: "POST", headers: { "Content-Type": "application/json" } }
    );

    const cartTotal = items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    const handleCloseCheckout = () => resetProgress();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const customerData = Object.fromEntries(formData.entries());

        sendRequest({
            order: {
                items,
                customer: customerData,
            },
        });
    };

    if (data && !error) {
        return (
            <Modal
                open={progress === "checkout"}
                onClose={() => {
                    clearData();
                    clearCart();
                    resetProgress();
                }}
            >
                <h2>Success!</h2>
                <p>Your order has been submitted successfully.</p>
                <p>We will contact you via email shortly.</p>
                <p className="modal-actions">
                    <Button
                        onClick={() => {
                            clearCart();
                            resetProgress();
                        }}
                    >
                        Close
                    </Button>
                </p>
            </Modal>
        );
    }

    return (
        <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" id="name" type="text" />
                <Input label="Email Address" id="email" type="email" />
                <Input label="Street" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" />
                    <Input label="City" id="city" type="text" />
                </div>
                {error && <Error title="Submission Failed" message={error} />}
                <div className="modal-actions">
                    {!isLoading ? (
                        <>
                            <Button type="button" onClick={handleCloseCheckout}>
                                Close
                            </Button>
                            <Button type="submit">Submit Order</Button>
                        </>
                    ) : (
                        <span>Sending order...</span>
                    )}
                </div>
            </form>
        </Modal>
    );
}
