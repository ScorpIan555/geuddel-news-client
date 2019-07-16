import React from 'react';
import { Button } from 'bootstrap';
import { NavLink } from 'react-router-dom';

export default ({ navProps }) => {
  return (
    <div className="navbar-container">
            
      <div className="bg-dark navbar-dark" data-sticky="top">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
         
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    POWERED BY NEWSAPI.org
                  </a>
                </li>
             
              </ul>
              <form className="form-inline col p-0 pl-md-2 pr-md-3">
                <input
                  className="form-control w-100"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>

              <ul className="navbar-nav">
                
                <li className="nav-item">
                  <NavLink 
                    to='/signup'
                  >
                    Signup
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    to='/login'
                  >
                    Login
                  </NavLink>
                </li>


              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
