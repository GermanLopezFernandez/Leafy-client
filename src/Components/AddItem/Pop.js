import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import listaDispositivos from "../extras/listaDispositivos";

const styles = {
  limit: {
    maxWidth: "70%",
  },
};

export class Pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipo: "",
      nombre: "",
      variacion: "",
      opciones: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFirstSelection = this.checkFirstSelection.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const objeto = {
      tipo: this.state.tipo,
      tamaño: this.state.variacion,
      nombreDispositivo: this.state.nombre,
    };
    this.props.registrarDispositivo(objeto);
    this.props.handleClose();
  };

  checkFirstSelection = (event) => {
    let arrVariante = [];
    arrVariante = listaDispositivos.find(
      (electronico) => electronico.nombre === event.target.value
    ).variante;
    this.setState({
      [event.target.name]: event.target.value,
      opciones: arrVariante,
      variacion: arrVariante[0],
    });
  };

  render() {
    const selectDispositivo = listaDispositivos.map((item, i) => {
      return (
        <option style={styles.limit} key={i}>
          {item.nombre}
        </option>
      );
    });

    const selectVariante = this.state.opciones.map((item, i) => {
      return <option key={i}>{item}</option>;
    });

    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleClose}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar dispositivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="selectDevice" custom size="sm">
              <Form.Label>Escoge un dispositivo</Form.Label>
              <Form.Control
                as="select"
                htmlSize={5}
                onChange={this.checkFirstSelection}
                name="tipo"
              >
                {selectDispositivo}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="selectVariante" custom size="sm">
              <Form.Label>Escoge una variante</Form.Label>
              <Form.Control
                as="select"
                disabled={!this.state.tipo}
                onChange={this.handleChange}
                name="variacion"
                style={styles.limit}
              >
                {selectVariante}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                onChange={this.handleChange}
                name="nombre"
              />
              <Form.Text className="text-muted">Ej. Tv Sala</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleSubmit()}>
            Añadir
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Pop;
