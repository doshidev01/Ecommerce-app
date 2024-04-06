import React, {useContext} from 'react';
import { ShopContext } from '../../context/shop-context';
import { Trash } from 'phosphor-react';

// CartItem component
export const CartItem = (props) => {
    // Destructuring props to get necessary data
    const { id,title,  price, thumbnail } = props.data;

    // Accessing shop context to get cart items and functions for cart manipulation
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

    // Render CartItem component
    return (
        <div className="cartItem">
            <img src={ thumbnail } alt={`thumbnail for Product ${title}`} />
            <div className="description">
                <p>
                    <b> {title} </b>
                </p>
                <p> Price: ${price} </p>

                {/* Count handler for cart items */}
                <div className="countHandler">
                    <button onClick={ () => removeFromCart(id)}> < Trash size={12} /> </button>
                    <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}/>
                    <button onClick={() => addToCart(id)}> + </button>
                </div>
            </div>
        </div>
    )
}
