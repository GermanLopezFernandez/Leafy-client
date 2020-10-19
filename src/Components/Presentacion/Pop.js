import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export class Pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    if(this.state.nombre !== ""){
      const objeto = {
        nuevoNombre: this.state.nombre
      };
      this.props.changeProfile(objeto);
    }
    this.props.handleClose();
  };
  render() {
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
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="selectDevice" custom size="sm">
              <Form.Label>Nuevo nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de usuario"
                onChange={this.handleChange}
                name="nombre"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleSubmit()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Pop;
