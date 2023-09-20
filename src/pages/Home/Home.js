import React,{useState} from "react";
import Header from "./Layout/Header";
import Meals from "./meals/Meals";
import Cart from "./Cart/Cart";
import CartProvider from "./store/CartProvider";



function Home() {
  const [cartIsShown, setCartIsShown] = useState(false);
 
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <>
    
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      
      <main>
        <Meals />
      </main>
      </CartProvider>
    
      </>
  );
}

export default Home;
