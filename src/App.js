import { Switch, Route, useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Contact from "./pages/ContactUS/Contact";
import ProductsDetail from "./pages/Home/Products Detail/ProductDetail";
import CartProvider from './pages/Home/store/CartProvider';

import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    let logoutTimer;

    if (authCtx.isLoggedIn) {
      // Set a timeout for auto-logout (e.g., 15 minutes)
      logoutTimer = setTimeout(() => {
        authCtx.logout(); // Call your logout function from the auth context
        history.replace('/auth'); // Redirect to the login page
      }, 15 * 60 * 1000); // 15 minutes in milliseconds
    }

    // Clear the timeout if the user logs out or leaves the app
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [authCtx, history]);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
        <Route path='/auth'>
          <AuthPage />
        </Route>
        )}
        {authCtx.isLoggedIn && (
        <Route path='/passwordChange'>
          <UserProfile />
        </Route>
        )}
         {authCtx.isLoggedIn && (
        <Route path='/home'>
          <CartProvider>
          <Home />
          </CartProvider>
        </Route>
        )}
         {authCtx.isLoggedIn && (
        <Route path='/aboutUs'>
          <About />
        </Route>
        )}
         {authCtx.isLoggedIn && (
        <Route path='/contactUs'>
          <Contact />
        </Route>
        )}
         {authCtx.isLoggedIn && (
        <Route path='/home/:productDetailId'>
          <ProductsDetail />
        </Route>
        )}
        
      </Switch>
    </Layout>
  );
}

export default App;
