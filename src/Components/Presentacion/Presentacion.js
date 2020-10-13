import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const styles = {
  cuadroVerde: {
    backgroundColor: "#048C73",
    height: "150px",
    lineHeight: "150px",
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "30px",
  },
  title: {
    width: "100%",
    fontWeight: "700",
    fontSize: "20px",
    paddingBottom: "5px",
    textAlign: "center",
  },
  subTitle: {
    width: "100%",
  },
  titleContainer: {
    marginTop: "50px",
    paddingBottom: "50px",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#52D967",
    border: "none",
    marginTop: "30px",
    maxWidth: "200px",
    width: "100px",
  },
  infoTitle: {
    width: "100%",
    fontWeight: "700",
    fontSize: "20px",
    paddingBottom: "5px",
    paddingTop: "15px",
    paddingLeft: "40px",
  },
  infoSubTitle: {
    paddingLeft: "40px",
  },
  buttonLogout: {
    maxWidth: "200px",
    width: "600px",
    marginLeft: "40px",
    marginTop: "60px",
  },
};
export class Presentacion extends Component {
  render() {
    return (
      <div>
        <div style={styles.cuadroVerde}>TacoDeGerman</div>
        <Row>
          <Col xs={6}>
            <div style={styles.titleContainer}>
              <div style={styles.title}>Rol</div>
              <div style={styles.subTitle}>Admin</div>
            </div>
          </Col>
          <Col xs={6}>
            <div style={styles.titleContainer}>
              <div style={styles.title}>Id de casa</div>
              <div style={styles.subTitle}>3123172</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div style={styles.infoTitle}>Correo</div>
            <div style={styles.infoSubTitle}>
              germanlopezfernandez.glf@gmail.com
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div style={styles.infoTitle}>Usuario</div>
            <div style={styles.infoSubTitle}>TacoDeGerman</div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div style={styles.infoTitle}>Correo</div>
            <div style={styles.infoSubTitle}>
              germanlopezfernandez.glf@gmail.com
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={styles.title}></Col>
          <Col xs={6}>
            <Button variant="success" style={styles.button}>
              Editar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button variant="danger" style={styles.buttonLogout}>
              Salir
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Presentacion;
