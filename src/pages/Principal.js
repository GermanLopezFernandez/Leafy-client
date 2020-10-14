import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import logo from "../images/logo.png";
import backimage from "../images/eco-friendly-living-room-blur.jpg";
import { Container } from "reactstrap";

const styles = {
  spaceUp: {
    paddingTop: "80px",
  },
  back: {
    backgroundImage: `url(${backimage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    minHeight: "100vh",
    minWidth: "100vw"
  },
  buttonLogin: {
    backgroundColor: "#52d967",
    borderRadius: "15px",
    border: "none",
    minWidth: "200px",
    marginBottom: "30px",
    marginTop: "80px",
  },
  buttonSignup: {
    backgroundColor: "#048c73",
    borderRadius: "15px",
    border: "none",
    minWidth: "200px",
  },
  logo: {
    width: "250px",
  },
};

export default class Principal extends Component {
  render() {
    return (
      <Container className="d-flex align-items-center justify-content-center" style={styles.back}>
        <div>
          <img
            src={logo}
            className="rounded mx-auto d-block"
            alt="Leafy Logo"
            style={styles.logo}
          />
          <Form>
            <div className="d-flex justify-content-center">
              <Button size="lg" style={styles.buttonLogin} href="/login">
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
      </Container>
    );
  }
}
