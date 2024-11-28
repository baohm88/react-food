import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const config = {};

export default function Meals() {
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp(
        "https://react-foodorder-backend.onrender.com/meals",
        config,
        []
    );

    if (isLoading) {
        return <p className="center">Fetching meals...</p>;
    }

    if (error) {
        return <Error title="Failed to fetch meals!" message={error} />;
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} {...meal} />
            ))}
        </ul>
    );
}
