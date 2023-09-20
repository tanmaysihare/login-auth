import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';
import {useHistory} from 'react-router-dom';


const MainNavigation = () => {
  const history = useHistory();
 const authCtx = useContext(AuthContext);
 
 const isLoggedIn = authCtx.isLoggedIn;
 const logoutHandler = () => {
  authCtx.logout();
  history.replace('/auth');
 };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>The Generics</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && ( 
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          )}
         {isLoggedIn && (
          <li>
           <Link to='/passwordChange'>Password Change</Link>
          </li>
          )}
          {isLoggedIn &&  (
            <li>
             <Link to='/home'>Home</Link>
            </li>
          )}
           {isLoggedIn &&  (
            <li>
             <Link to='/aboutUs'>About Us</Link>
            </li>
          )}
           {isLoggedIn &&  (
            <li>
             <Link to='/contactUs'>Contact US</Link>
            </li>
          )}
          {isLoggedIn &&  (
            <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          )}
          
        </ul>
      </nav>
    </header>
    
  );
};

export default MainNavigation;
