import { useState, useEffect, useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { CartContext } from "../Contexts";
import { useCurrency } from "../useCurrency";
import Pizza from "../Pizza";
import Cart from "../Cart";

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  let price, selectedPizza;

  // const Intlf = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  async function fetchPizzaTypes() {
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const pizzaRes = await fetch("/api/pizzas");
    const pizzaJson = await pizzaRes.json();
    setPizzaTypes(pizzaJson);

    console.log(pizzaJson);
    setLoading(false);
  }

  async function checkout() {
    setLoading(true);
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    console.log(cart);
    setCart([]);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = useCurrency(selectedPizza.sizes[pizzaSize]);
  }

  function addPizzaToCart() {
    setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2> Create Order </h2>
        <form action={addPizzaToCart}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                id="pizza-type"
                value={pizzaType}
                onChange={(e) => setPizzaType(e.target.value)}
              >
                {pizzaTypes.map((pizza) => (
                  <option key={pizza.id} value={pizza.id}>
                    {pizza.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    type="radio"
                    checked={pizzaSize === "S"}
                    id="pizza-s"
                    name="pizza-size"
                    value="S"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    type="radio"
                    checked={pizzaSize === "M"}
                    id="pizza-m"
                    name="pizza-size"
                    value="M"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    type="radio"
                    checked={pizzaSize === "L"}
                    id="pizza-l"
                    name="pizza-size"
                    value="L"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {loading ? (
            <h3>Loading pizzas...</h3>
          ) : (
            <div className="order-pizza">
              <Pizza
                name={selectedPizza.name}
                image={selectedPizza.image}
                description={selectedPizza.description}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {loading ? (
        <h3>OnLoading pizzas...</h3>
      ) : (
        <Cart checkout={checkout} cart={cart} />
      )}
    </div>
  );
}
