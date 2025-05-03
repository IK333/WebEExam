import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = ({ user, isAdmin, logout }) => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/" className="ms-3">
        Top Bangladeshi Companies
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-3">
          {user ? (
            <>
              {isAdmin && <Nav.Link as={Link} to="/">Manage Companies</Nav.Link>}
              <Button variant="outline-light" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">
              Admin Login
            </Nav.Link>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;