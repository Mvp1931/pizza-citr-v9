import { useState, useEffect, useDebugValue } from "react";
import PizzaOfTheDay from "./PizzaOfTheDay";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(
    pizzaOfTheDay
      ? `${pizzaOfTheDay.id} : ${pizzaOfTheDay.name}`
      : "Loading...",
  );

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const Response = await fetch("/api/pizza-of-the-day");
      const potdJson = await Response.json();
      setPizzaOfTheDay(potdJson);
    }
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
