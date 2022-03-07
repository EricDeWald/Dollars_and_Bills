import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Button, Navbar, Container } from 'react-bootstrap'
import './nav.css'

const userName = Auth.getUsername()

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      console.log(Auth)
      return (
        <Navbar >
          <Container>
              <img className="navImg"
                src="assets/dollars_and_bills_DT.png"
                width="80px"
                height="80px"
              />
            <Navbar.Brand style={{ color: "#DFA420", fontSize: "48px", fontWeight: "bold" }} href="#home">Dollars <span className="navSpan">and</span> Bills
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ color: "#DF20BA" }}>
                Signed in as: <a href="#login" id="navIn">{userName}</a>
              </Navbar.Text>
              <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black"}}>
              <a href="/" id="navIn" onClick={() => Auth.logout()}>
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
          <img className="navImg"
                src="assets/dollars_and_bills_DT.png"
                width="80px"
                height="80px"
          />
            <Navbar.Brand style={{ color: "#DFA420", fontSize: "44px", fontWeight: "bold"}} href="#home">Dollars <span className="navSpan">and</span> Bills</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black"}}>
              <a href="/signup" id="navIn">
                Signup
              </a>
              </Button>
              <Button style={{ border: "solid #DF20BA 2px", backgroundColor: "black"}}>
              <a href="/login" id="navIn">
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