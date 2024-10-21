import React from "react";
import createRoot from "react-dom/client";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pixel Perfect Pizzas"),
    React.createElement(Pizza, {
      name: "Cheese Pizza",
      description: "It's soooo much cheese",
    }),
    React.createElement(Pizza, {
      name: "Pepperoni Pizza",
      description: "Mozzarella cheese, pepperoni, and onions",
    }),
    React.createElement(Pizza, {
      name: "Hawaiian Pizza",
      description: "Sliced ham, pineapple, and mozzarella cheese",
    }),
    React.createElement(Pizza, {
      name: "Big meat pizza",
      description: "Bacon, Pepperoni, Italian sausage, and Chorizo",
    }),
  ]);
};
const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h2", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
