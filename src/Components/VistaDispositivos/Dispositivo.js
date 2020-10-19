import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import iconoEditar from "../../images/iconoEditar.svg";
import Pop from "./Pop";
import listaDispositivos from "../extras/listaDispositivos";

const styles = {
  container: {
    borderRadius: "15px",
    height: "80px",
    backgroundColor: "white",
    marginBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  icon: {
    height: "30px",
    width: "30px",
  },
  edit: {
    height: "25px",
    width: "25px",
  },
  imgWrap: {
    width: "100%",
  },
  nombre: {
    height: "60px",
    fontWeight: "500",
  },
  horas: {
    height: "60px",
    fontWeight: "600",
    fontSize: "15px",
  },
};

export class Dispositivo extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  truncateText = (text, length) => {
    if (text.length <= length) {
      return text;
    }
    return text.substr(0, length) + '..';
  };

  render() {
    let iconoDispositivo = listaDispositivos.find(
      (electronico) => electronico.nombre === this.props.item.tipo
    ).icono;
    return (
      <div>
        <Pop
          showModal={this.state.showModal}
          item={this.props.item}
          handleClose={() => this.handleClose()}
          sumarUso={(objeto) => this.props.sumarUso(objeto)}
          eliminar={(objeto) => this.props.eliminar(objeto)}
        />
        <div style={styles.container}>
          <Row>
            <Col
              xs={2}
              className="d-flex align-items-center justify-content-center"
            >
              <img
                src={iconoDispositivo}
                alt="Icono Producto"
                style={styles.icon}
                onClick={() => this.handleOpen()}
              />
            </Col>
            <Col xs={5} className="d-flex align-items-center">
              <div style={styles.nombre} className="d-flex align-items-center">
              {this.truncateText(this.props.item.nombreDispositivo, 14)}
              </div>
            </Col>
            <Col
              xs={3}
              className="d-flex align-items-center justify-content-center"
            >
              <div style={styles.horas} className="d-flex align-items-center">
                {this.props.item.sumatoria} hrs
              </div>
            </Col>
            <Col
              xs={2}
              className="d-flex align-items-center justify-content-center"
            >
              <div style={styles.imgWrap}>
                <img
                  src={iconoEditar}
                  alt="Icono editar"
                  style={styles.edit}
                  onClick={() => this.handleOpen()}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dispositivo;
