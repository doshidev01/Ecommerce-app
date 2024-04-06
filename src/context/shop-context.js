import React, { useState, createContext, useEffect } from 'react';

// Creating ShopContext to manage global state
export const ShopContext = createContext(null);

// Function to get default cart items
const getDefaultCart = (products) => {
    let cart = {};
    products.forEach(product => {
        cart[product.id] = 0;
    })
    return cart;
}

// ShopContextProvider component
export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);

    // Fetching products data from an API on component mount
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setCartItems(getDefaultCart(data.products));
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    // State to store cart items
    const [cartItems, setCartItems] = useState(getDefaultCart(products));

    // Function to calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }

    // Function to add product to cart
    const addToCart = (ProdID) => {
        setCartItems((prevState) => ({...prevState, [ProdID]: prevState[ProdID] + 1}))
    };

    // Function to remove product from cart
    const removeFromCart = (ProdID) => {
        setCartItems((prevState) => ({...prevState, [ProdID] : Math.max(0, prevState[ProdID] - 1)}))
    }

    // Function to update cart item count
    const updateCartItemCount = (newAmount, itemID) => {
        setCartItems((prevState) => ({...prevState, [itemID]: newAmount }))
    }

    // Context value to provide access to state and functions
    const contextValue = {
        products,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount
    };

    // Providing context value to children components
    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

