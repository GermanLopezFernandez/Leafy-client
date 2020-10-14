import React, { Component } from "react";
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
  button: {
    backgroundColor: "#52D967",
    border: "none",
    maxWidth: "200px",
    width: "500px",
    marginTop: "30px",
  },
  titleContainer: {
    marginTop: "30px",
    textAlign: "center",
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
    width: "500px",
    marginTop: "30px",
  },
};
export class Presentacion extends Component {
  render() {
    return (
      <div>
        <div style={styles.cuadroVerde}>TacoDeGerman</div>
        <div style={styles.titleContainer}>
          <div className="col-xs-12 mt-2">
            <div style={styles.title}>Rol</div>
            <div style={styles.subTitle}>Admin</div>
          </div>
          <div className="col-xs-12 mt-2">
            <div style={styles.title}>Id de casa</div>
            <div style={styles.subTitle}>3123172</div>
          </div>
        </div>

        <div className="col-xs-12">
          <div style={styles.infoTitle}>Correo</div>
          <div style={styles.infoSubTitle}>
            germanlopezfernandez.glf@gmail.com
          </div>
        </div>
        <div className="col-xs-12">
          <div style={styles.infoTitle}>Usuario</div>
          <div style={styles.infoSubTitle}>TacoDeGerman</div>
        </div>
        <div className="col-xs-12">
          <div style={styles.infoTitle}>Correo</div>
          <div style={styles.infoSubTitle}>
            germanlopezfernandez.glf@gmail.com
          </div>
        </div>
        <div className="col-xs-12 d-flex justify-content-center">
          <Button style={styles.button}>Editar</Button>
        </div>
        <div className="col-xs-12 d-flex justify-content-center">
          <Button variant="danger" style={styles.buttonLogout}>
            Salir
          </Button>
        </div>
      </div>
    );
  }
}

export default Presentacion;
