import CartContext from "./cartContext";
import React, {  useReducer,useContext,useEffect } from 'react';
const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          items: [...state.items, action.payload],
          total: state.total + action.payload.price,
        };
      case 'REMOVE_FROM_CART':
        const updatedItems = state.items.filter(item => item.id !== action.payload.id);
        const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price, 0);
        return { ...state, items: updatedItems, total: updatedTotal };
      default:
        return state;
    }
  };
  
  export const CartStateProvider = ({ children }) => {
    const initialCartState = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
    const [state, dispatch] = useReducer(cartReducer, initialCartState);
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);
    return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };
  export const useCart = () => useContext(CartContext);