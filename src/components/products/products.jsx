import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './products.css';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products");
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Función para agregar un artículo al carrito (hardcodeando valores para la prueba)
    const addToCart = async (productId) => {
        const quantity = 1; // Cantidad hardcodeada para la prueba
        const userId = 1;
        try {
            await axios.post("http://localhost:8080/addToCart", { userId,productId, quantity });
            console.log("Product added to cart:", productId);
            window.alert("Producto añadido al carrito");
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };

    return (
        <div>
            <div className="catalogo">
                {Array.isArray(products) && products.map(product => (
                    <div className="products" key={product.id}>
                        <img src={product.image}  />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
