// import { createContext, useMemo, useState } from "react";

// const PROGRESS_STATES = {
//     IDLE: "",
//     CART: "cart",
//     CHECKOUT: "checkout",
// };

// const UserProgressContext = createContext({
//     progress: PROGRESS_STATES.IDLE,
//     showCart: () => {},
//     showCheckout: () => {},
//     resetProgress: () => {},
// });

// export function UserProgressContextProvider({ children }) {
//     const [progress, setProgress] = useState(PROGRESS_STATES.IDLE);

//     const value = useMemo(
//         () => ({
//             progress,
//             showCart: () => setProgress(PROGRESS_STATES.CART),
//             showCheckout: () => setProgress(PROGRESS_STATES.CHECKOUT),
//             resetProgress: () => setProgress(PROGRESS_STATES.IDLE),
//         }),
//         [progress]
//     );

//     return (
//         <UserProgressContext.Provider value={value}>
//             {children}
//         </UserProgressContext.Provider>
//     );
// }

// export default UserProgressContext;

import { createContext, useMemo, useState } from "react";

const PROGRESS_STATES = {
    IDLE: "",
    CART: "cart",
    CHECKOUT: "checkout",
};

const UserProgressContext = createContext({
    progress: PROGRESS_STATES.IDLE,
    showCart: () => {},
    showCheckout: () => {},
    resetProgress: () => {},
});

export function UserProgressContextProvider({ children }) {
    const [progress, setProgress] = useState(PROGRESS_STATES.IDLE);

    const value = useMemo(
        () => ({
            progress,
            showCart: () => setProgress(PROGRESS_STATES.CART),
            showCheckout: () => setProgress(PROGRESS_STATES.CHECKOUT),
            resetProgress: () => setProgress(PROGRESS_STATES.IDLE),
        }),
        [progress]
    );

    return (
        <UserProgressContext.Provider value={value}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;
