import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import logo from "../images/logo.png";

const styles = {
  spaceUp: {
    paddingTop: "80px",
  },
  buttonLogin: {
    backgroundColor: "#52d967",
    borderRadius: "15px",
    border: "none",
    minWidth: "150px",
    marginBottom: "30px",
    marginTop: "50px"
  },
  buttonSignup: {
    backgroundColor: "#048c73",
    borderRadius: "15px",
    border: "none",
    minWidth: "150px"
  },
  logo: {
      width: "250px"
  }
};

export default class Principal extends Component {
  render() {
    return (
      <div style={styles.spaceUp}>
        <img
          src={logo}
          className="rounded mx-auto d-block"
          alt="Leafy Logo"
          style={styles.logo}
        />
        <Form>
          <div className="d-flex justify-content-center">
              <Button
                size="lg"
                style={styles.buttonLogin}
                href="/login"
              >
                Iniciar sesion
              </Button>
          </div>
          <div className="d-flex justify-content-center">
              <Button size="lg" href="/register" style={styles.buttonSignup}>
                Registrarse
              </Button>
            </div>
        </Form>
      </div>
    );
  }
}
