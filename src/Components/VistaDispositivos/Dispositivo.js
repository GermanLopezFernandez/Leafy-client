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
    marginTop: "10px",
  },
  imgWrap: {
    width: "100%",
  },
  nombre: {
    height: "55px",
    lineHeight: "55px",
    fontWeight: "500",
  },
  horas: {
    height: "55px",
    lineHeight: "55px",
    fontWeight: "600",
    fontSize: "20px",
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

  render() {
    let iconoDispositivo = listaDispositivos.find( electronico => electronico.nombre === this.props.item.tipo).icono;
    return (
      <div>
        <Pop showModal={this.state.showModal} item={this.props.item} handleClose={() => this.handleClose()}/>
        <div style={styles.container}>
          <Row>
            <Col xs={2}>
            <img src={iconoDispositivo} alt="Icono Producto" style={styles.icon} onClick={ () => this.handleOpen() }/>

            </Col>
            <Col xs={5}>
              <div style={styles.nombre}>{this.props.item.nombre}</div>
            </Col>
            <Col xs={3}>
              <div style={styles.horas}>{this.props.item.horas} hrs</div>
            </Col>
            <Col xs={2}>
              <div style={styles.imgWrap}>
                <img src={iconoEditar} alt="Icono editar" style={styles.icon} onClick={ () => this.handleOpen() }/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dispositivo;
