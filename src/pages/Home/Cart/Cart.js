import { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../store/cart-context';
import AuthContext from '../../../store/auth-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const hasItems = cartItems.length > 0;

  useEffect(() => {
    // Define your user's email (replace 'user@example.com' with the actual email)
    const userEmail = authCtx.token;

    // Make a GET request to retrieve cart items when the component mounts
    axios
      .get(`https://crudcrud.com/api/cart/${userEmail}`)
      .then((response) => {
        setCartItems(response.data); // Update cart items in the component state
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching cart items:', error);
      });
  }, [authCtx.token]);

  const cartItemRemoveHandler = (id) => {
    // Define your user's email (replace 'user@example.com' with the actual email)
    const userEmail = authCtx.token;

    // Make a DELETE request to remove a cart item
    axios
      .delete(`https://crudcrud.com/api/cart/${userEmail}/${id}`)
      .then(() => {
        // Remove the item from the component state
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        // Handle errors
        console.error('Error removing cart item:', error);
      });
  };

  const cartItemAddHandler = (item) => {
    // Define your user's email (replace 'user@example.com' with the actual email)
    const userEmail = authCtx.token;

    // Make a POST request to add a cart item
    axios
      .post(`https://crudcrud.com/api/cart/${userEmail}`, item)
      .then(() => {
        // Add the item to the component state
        setCartItems((prevCartItems) => [...prevCartItems, item]);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error adding cart item:', error);
      });
  };

  const cartItemsList = cartItems.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={() => cartItemRemoveHandler(item.id)}
      onAdd={() => cartItemAddHandler({ ...item, amount: 1 })}
    />
  ));

  return (
    <div className={classes.cart}>
      <ul className={classes['cart-items']}>{cartItemsList}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`Rs.${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </div>
  );
};

export default Cart;
