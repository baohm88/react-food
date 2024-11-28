import { createContext, useReducer, useMemo } from "react";

const CartContext = createContext({
    items: [],
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const updatedItems = state.items.map((item) =>
                item.id === action.item.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            if (!state.items.some((item) => item.id === action.item.id)) {
                updatedItems.push({ ...action.item, quantity: 1 });
            }

            return { ...state, items: updatedItems };
        }

        case "REMOVE_ITEM": {
            const updatedItems = state.items
                .map((item) =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);

            return { ...state, items: updatedItems };
        }

        case "CLEAR_CART":
            return { ...state, items: [] };

        default:
            console.warn(`Unhandled action type: ${action.type}`);
            return state;
    }
}

export function CartContextProvider({ children }) {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] });

    const value = useMemo(
        () => ({
            items: cart.items,
            addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
            removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
            clearCart: () => dispatch({ type: "CLEAR_CART" }),
        }),
        [cart]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export default CartContext;
