import React,{useContext} from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { Image } from "react-bootstrap";
import CartContext from "../../store/cart-context";
import { Link } from "react-router-dom";


const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `Rs. ${props.price.toFixed(2)}`;
  const addToCartHandler = amount => {
    cartCtx.addItem({
        id:props.id,
        name:props.name,
        amount: amount,
        price: props.price
    });
  };
  
    return (
      <>
    
    <li className={classes.meal}>
    <Link className="nav-item nav-link"  to="/home/:productDetailId"> <div>
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
