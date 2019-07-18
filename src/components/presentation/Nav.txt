import React, { Fragment } from 'react';
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

export default ({ navProps }) => {
  return (
    <div className="navbar-container balls">
      <Navbar expand="md">
        <Navbar.Brand as="ul" className="app-header" href="#home">
          <Link to="/">Scratch</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="">
            {navProps.isAuthenticated ? (
              <Fragment>
                <LinkContainer to="/settings">
                  <Nav.Link>Settings</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={navProps.handleLogout}>Logout</Nav.Link>
              </Fragment>
            ) : (
              <Fragment>
                <LinkContainer to="/signup">
                  <Nav.Link className="">Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
