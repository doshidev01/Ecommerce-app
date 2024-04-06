import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import "./cart.css";

// Cart component
export const Cart = () => {
  // Accessing shop context to get products, cart items, and total cart amount
  const { products, cartItems, getTotalCartAmount } = useContext(ShopContext);

  // Calculate total amount of items in the cart
  const totalAmount = getTotalCartAmount();

  // Navigate function for routing
  const navigate = useNavigate();

  // Filter products that are in the cart
  const cartProducts = products.filter(product => cartItems[product.id] > 0);

  // Render cart component
  return (
    <div className="cart">
      <div>
        <h1> Your Cart Items </h1>
      </div>

      {/* Display cart items */}
      <div className="cartItems">
        {cartProducts.map((Product) => {
           if (cartItems[Product.id] !== 0) {
              return <CartItem key={Product.id} data={Product} />
           }
        })}
      </div>
      
      {/* Display subtotal and checkout buttons */}
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> SubTotal: $ { totalAmount }</p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button> Checkout </button>
        </div>
      ) : (
        // Display message if cart is empty
        <h1> Your Cart is Empty </h1>
      )}
    </div>
  )
}

