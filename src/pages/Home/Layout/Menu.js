import React from "react";
import {  Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="m-auto " id="navbarNavAltMarkup" >
          <ul style={{ listStyle: "none"}}>
            <li style={{ float: "left", }}>
              <Link className="nav-item nav-link active" to="/home">
                Home
              </Link>
            </li>
            <li style={{ float: "left", marginLeft: "10rem" }}>
              <Link className="nav-item nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li style={{ float: "left", marginLeft: "10rem" }}>
              <Link className="nav-item nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
          
          </ul>
        </div>
      </nav>
    </>
  );
};  

export default Menu;
