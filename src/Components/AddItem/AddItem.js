import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import iconoSumar from "../../images/iconoSumar.svg";
import Pop from "./Pop";

const styles = {
  container: {
    paddingLeft: "20px",
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingRight: "20px",
    backgroundColor: "white",
  },
  title: {
    fontSize: "20px",
    color: "#464646",
  },
  icon: {
    height: "25px",
    width: "25px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  imgWrap: {
    width: "100%",
  },
};

export class AddItem extends Component {
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
    return (
    <div>
        <Pop showModal={this.state.showModal} handleClose={() => this.handleClose()} registrarDispositivo={(objeto) => this.props.registrarDispositivo(objeto)}/>
        <div style={styles.container}>
        <Row>
          <Col xs={10}>
            <h2 style={styles.title}>Dispositivos</h2>
          </Col>
          <Col xs={2}>
            <div style={styles.imgWrap}>
              <img src={iconoSumar} alt="Icono sumar" style={styles.icon} onClick={ () => this.handleOpen() }/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    );
  }
}

export default AddItem;
