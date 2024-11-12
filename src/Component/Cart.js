import React from 'react'
import { useCart } from '../context/CartStateProvider'
const Cart = () => {
    const { state, dispatch } = useCart();
    const removeFromCart = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    };
    return (
        <div>
            <h2>Cart</h2>
            <p>Total Items: {state.items.length}</p>
            <p>Total Price: ${state.total.toFixed(2)}</p>

            {state.items.map((item) => (
                <div key={item.id}>
                    <p>{item.category}</p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                </div>
            ))}
        </div>
    )
}

export default Cart