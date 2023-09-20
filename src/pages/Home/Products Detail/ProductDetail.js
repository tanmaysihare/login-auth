import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CartProvider from "../store/CartProvider";
import Header from "../Layout/Header";
import Cart from "../Cart/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
// import AvailableMeals from "../meals/AvailableMeals";

function ProductsDetail(props) {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const params = useParams();

  return (
    <>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        </CartProvider>
        <div className="card-group">
        <div style={{width:'25rem',margin:'5rem'}}>
          <div className="card">
            <image
              className="card-img-top"
              src='https://prasadyash2411.github.io/ecom-website/img/Album%201.png'
              alt="Card image cap"
              style={{width:'25rem',height:'25rem'}}
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
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
          <div style={{margin:"5rem"}}>
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                  {params.productDetailId}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{margin:"5rem"}}>
            <div className="card ">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
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
