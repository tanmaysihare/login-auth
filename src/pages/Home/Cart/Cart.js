import { useContext,useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../store/cart-context';
import AuthContext from '../../../store/auth-context';

const Cart = (props) => {
  const authCtx = useContext(AuthContext); 
  const cartCtx = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const email = authCtx.email;
  
  useEffect(() => {
    // Fetch user-specific cart data based on props.email
    fetch(`https://crudcrud.com/api/1418bfe8cfcb4148acce3e04c5b9fed1/cart${email}`, {
      method: 'GET',
     
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update cart items in context with the fetched data
        console.log('Received data:', data);
        const cartItems = data.map((item) => ({
          id: item._id, // or use a different field if necessary
          name: item.name,
          amount: item.amount,
          price: item.price,
        }));
        cartCtx.replaceCartItems(cartItems); // Make sure you have a replaceCartItems function in your context
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setIsLoading(false);
      });
  }, []);


  const totalAmount = `Rs.${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    // Remove the item from the server-side cart data
    fetch(`https://crudcrud.com/api/1418bfe8cfcb4148acce3e04c5b9fed1/cart${email}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: id,
         }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        // Update cart items in context after successful removal
        cartCtx.removeItem(id); 
      })
      .catch((error) => {
        console.error('Error removing cart item:', error);
      });
  };

  const cartItemAddHandler = (item) => {
    // Add the item to the server-side cart data
    fetch(`https://crudcrud.com/api/1418bfe8cfcb4148acce3e04c5b9fed1/cart${email}`, {
      method: 'POST',
      body: JSON.stringify({
        itemId: item.id,
        name: item.name,
        amount: item.amount,
        price: item.price,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        // Update cart items in context after successful addition
        cartCtx.addItem({ ...item, amount: 1 });
      })
      .catch((error) => {
        console.error('Error adding cart item:', error);
      });
  };
  

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {isLoading && <p>Loading cart...</p>}
      {!isLoading && (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>
              Close
            </button>
            {hasItems && <button className={classes.button}>Order</button>}
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
