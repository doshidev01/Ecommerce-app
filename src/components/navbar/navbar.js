import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { ShopContext } from '../../context/shop-context';
import logo from "./logo.webp";
import "./navbar.css";

// Navbar component
const Navbar = () => {
  // Accessing shop context to get cart items
  const { cartItems } = useContext(ShopContext);

  // Calculate total items in cart
  const totalItemsInCart = Object.values(cartItems).reduce((acc, item) => acc + item, 0);

  // Render Navbar component
  return (
    <div className="navbar">
      <a href="https://www.innocaption.com/" target="_blank">
        <img src={logo} alt="Logo" className="logo" />
      </a>
      <div className="title"> 
        <Link to="/">InnoCaption Shop</Link> 
      </div>
      
      <div className="links">
        <Link to="/cart"><ShoppingCart size={32} /> 
            {/* Display total items in cart */}
            {totalItemsInCart > 0 && <span className="cart-count">{totalItemsInCart}</span>}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
