import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import listaDispositivos from "../extras/listaDispositivos";

const styles = {
  limit: {
    maxWidth: "70%"
  }
}

export class Pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dispositivo: "",
      nombre: "",
      variacion: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const selectDispositivo = listaDispositivos.map((item, i) => {
      return <option  style={styles.limit} key={i}>{item.nombre}</option>;
    });

    let arrVariante = []
    if(this.state.dispositivo){
        arrVariante = listaDispositivos.find( electronico => electronico.nombre === this.state.dispositivo ).variante;
    }

    const selectVariante = arrVariante.map((item, i) => {
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
                onChange={this.handleChange}
                name="dispositivo"
              >
                {selectDispositivo}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="selectVariante" custom size="sm">
              <Form.Label>Escoge una variante</Form.Label>
              <Form.Control
                as="select"
                disabled={!this.state.dispositivo}
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
          <Button variant="secondary" onClick={this.props.handleClose}>
            Añadir
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Pop;
