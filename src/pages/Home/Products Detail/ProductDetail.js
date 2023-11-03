import React,{useContext} from "react";
import { useParams } from "react-router-dom";
import MealItemForm from "../meals/MealItem/MealItemForm";
import CartContext from "../store/cart-context";
import AuthContext from "../../../store/auth-context";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";

function ProductsDetail(props) {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
const { id } = useParams(); 
const product = props.mealsLists.find((meal) => meal.id === id); // Find the product based on productDetailId
if (! product) {
  // Product found, you can access its properties
  console.log("product not found");
  // Render the product details here
  return <h1>Product not found</h1>
} 

const email = authCtx.email;

const addToCartHandler = amount => {
   

  fetch(`https://crudcrud.com/api/b50a664780c44bc39b6a482ec9e60e79/cart${email}`, {
    method: 'POST',
    body: JSON.stringify({
      itemId: product._id,
      name: product.name,
      amount: amount,
      price: product.price,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      // Update cart items in context after successful addition
      cartCtx.addItem({ 
        id:product.id,
        name:product.name,
        amount: amount,
        price: product.price
      });
    })
    .catch((error) => {
      console.error('Error adding cart item:', error);
    });
  };
  return (
    <>
     
        
        <div className="card-group">
        <div style={{width:'25rem',margin:'5rem'}}>
          <div className="card">
            <Image
              className="card-img-top"
              src={product.description}
              alt="Product Image"
              style={{width:'25rem',height:'25rem'}}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Price: ${product.price}</small>
              </p>
              <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
          </div>
        </div>
          <div style={{margin:"5rem"}}>
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{margin:"5rem"}}>
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
    </>
  );
}
export default ProductsDetail;
