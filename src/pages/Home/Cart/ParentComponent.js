// ParentComponent.js
import React, { useState } from 'react';
import AuthForm from '../../../components/Auth/AuthForm';
import Cart from './Cart';

const ParentComponent = () => {
  const [enteredEmail, setEnteredEmail] = useState('');

  // Function to handle email input change and set it in the state
  const emailInputChangeHandler = (email) => {
    setEnteredEmail(email);
  };

  return (
    <div>
      {/* Pass enteredEmail and emailInputChangeHandler as props to AuthForm */}
      <AuthForm enteredEmail={enteredEmail} onEmailChange={emailInputChangeHandler} />

      {/* Pass enteredEmail as a prop to Cart */}
      <Cart email={enteredEmail} />
    </div>
  );
};

export default ParentComponent;
