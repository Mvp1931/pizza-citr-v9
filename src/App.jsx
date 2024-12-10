import { createRoot } from "react-dom/client";
import Pizza from "./Pizza.jsx";

const App = () => {
  return (
    <div>
      <h1>Padre Gino's Pizza - Order Now</h1>
      <Pizza name="Cheese Pizza" description="It's soooo much cheese" />
      <Pizza
        name="Pepperoni Pizza"
        description="Mozzarella cheese, pepperoni, and onions"
      />
      <Pizza
        name="Hawaiian Pizza"
        description="Sliced ham, pineapple, and mozzarella cheese"
      />
      <Pizza
        name="The Big Meat Pizza"
        description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
      />
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
