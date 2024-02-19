import React, { useState, useEffect } from 'react';
import './cart.css';
import axios from 'axios';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    // Function to fetch cart items from the server
    

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("http://localhost:8080/cart");
                // Assuming the response has a structure like:
                // { cartItems: [{ product: { name: "Product 1", price: 10 }, quantity: 2 }, ...] }
                const cartItemsData = response.data.map(item => ({
                    product: item.product.name,
                    price: item.product.price,
                    quantity: item.quantity
                }));
                setCartItems(cartItemsData);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        fetchCartItems();
    }, []);
    console.log(cartItems)
    return (
        <div className="cart-section">
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>{item.product} - ${item.price} (Quantity: {item.quantity})</li>
                ))}
            </ul>
        </div>
    );
}
