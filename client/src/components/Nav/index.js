import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Button, Navbar, Container } from 'react-bootstrap'
import styles from './nav.css'

const userName = Auth.getUsername()

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      console.log(Auth)
      return (
        <Navbar >
          <Container>
            <Navbar.Brand className={styles.navtext} href="#home">Dollars and Bills</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className={styles.navtext}>
                Signed in as: <a href="#login">{userName}</a>
              </Navbar.Text>
              <Button variant='outline-danger'>
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    } else {
      return (
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">Dollars and Bills</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Button variant='outline-primary'>
              <a href="/signup">
                Signup
              </a>
              </Button>
              <Button variant='outline-primary'>
              <a href="/login">
                Login
              </a>
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      {showNavigation()}
    </header>
  );
}

export default Nav;