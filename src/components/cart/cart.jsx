import React, { useState, useEffect } from 'react';
import './cart.css';
import axios from 'axios';

export default function Cart() {
    // Estado para almacenar los elementos del carrito
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado

    useEffect(() => {
        // Función asincrónica para obtener los elementos del carrito del servidor
        const fetchCartItems = async () => {
            try {
                // Realizar una solicitud GET al servidor para obtener los elementos del carrito
                const response = await axios.get("http://localhost:8080/cart");
                // Obtener los datos de los elementos del carrito desde la respuesta
                const cartItemsData = response.data;

                // Consolidar los elementos del carrito sumando las cantidades para los mismos productos
                const consolidatedCartItems = cartItemsData.reduce((accumulator, currentItem) => {
                    // Buscar si el producto ya existe en el carrito consolidado
                    const existingItemIndex = accumulator.findIndex(item => item.product.id === currentItem.product.id);
                    if (existingItemIndex !== -1) {
                        // Si el producto ya existe, sumar la cantidad al producto existente
                        accumulator[existingItemIndex].quantity += currentItem.quantity;
                    } else {
                        // Si el producto no existe, añadirlo al carrito consolidado
                        accumulator.push(currentItem);
                    }
                    return accumulator;
                }, []);

                // Establecer los elementos del carrito consolidado en el estado
                setCartItems(consolidatedCartItems);
            } catch (error) {
                // Manejar errores en caso de que falle la solicitud
                console.error("Error fetching cart items:", error);
            }
        };
        // Llamar a la función para obtener los elementos del carrito al cargar el componente
        fetchCartItems();

        // Verificar si el usuario está logueado al cargar el componente
        // Puedes implementar la lógica de autenticación aquí
        // Por ahora, simplemente estableceremos isLoggedIn en true para demostrar la funcionalidad
        setIsLoggedIn(true);
    }, []);

    // Función para añadir un producto al carrito
    const addToCart = () => {
        if (!isLoggedIn) {
            // Si el usuario no está logueado, mostrar un mensaje indicando que debe iniciar sesión
            alert("Debes iniciar sesión para añadir productos al carrito");
            return;
        }

        // Si el usuario está logueado, puedes agregar el producto al carrito normalmente
        // Agrega aquí la lógica para agregar el producto al carrito utilizando axios o cualquier otra biblioteca o método que prefieras
        // Por ejemplo:
        axios.post("http://localhost:8080/addToCart", { userId, productId, quantity })
            .then(response => {
                console.log("Producto agregado al carrito:", response.data);
                // Aquí puedes mostrar un mensaje de éxito si lo deseas
            })
            .catch(error => {
                console.error("Error al agregar el producto al carrito:", error);
                // Aquí puedes mostrar un mensaje de error si lo deseas
            });
    };

    return (
        <div className="cart-section">
            <h2>Cart</h2>
            <button onClick={addToCart}>Add to Cart</button>
            <ul>
                {cartItems.map((item, index) => (
                    // Renderizar cada elemento del carrito con su nombre, precio y cantidad
                    <li key={index}>{item.product.name} - ${item.product.price} (Quantity: {item.quantity})</li>
                ))}
            </ul>
        </div>
    );
}
