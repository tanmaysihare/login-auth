import React,{useContext} from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { Image } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import { Link } from "react-router-dom";
import AuthContext from "../../../../store/auth-context";


const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
    const price = `Rs. ${props.price.toFixed(2)}`;
    const email = authCtx.email;
  const addToCartHandler = amount => {
   

    fetch(`https://crudcrud.com/api/1418bfe8cfcb4148acce3e04c5b9fed1/cart${email}`, {
      method: 'POST',
      body: JSON.stringify({
        itemId: props._id,
        name: props.name,
        amount: amount,
        price: props.price,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        // Update cart items in context after successful addition
        cartCtx.addItem({ 
          id:props.id,
          name:props.name,
          amount: amount,
          price: props.price
        });
      })
      .catch((error) => {
        console.error('Error adding cart item:', error);
      });


  };
  
    return (
      <>
    
    <li className={classes.meal}>
    <Link className="nav-item nav-link"  to={`/productDetailId/${props.id}`}> <div>
        <h3>{props.name}</h3>
        <Image thumbnail src={props.description}/>
        <div className={classes.price}>{price}</div>
      </div></Link>
      <div><MealItemForm onAddToCart={addToCartHandler}/></div>
    </li>
    
    </>
  );
};
export default MealItem;
