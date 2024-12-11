import { useContext } from "react";
import { CartContext } from "./Contexts";
import Cart from "./Cart";

export default function Header() {
  return (
    <nav>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <div className="nav-cart">
        <span className="nav-cart-number">{Cart.length}</span>
      </div>
    </nav>
  );
}
