import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";

export class Pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consumoReal: "",
      tipoDeRecibo: "tipo1",
      errorConsumo: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange = (event) => {
    console.log(this.state)
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSend = async () => {
    this.setState({
      loading: true,
    });
    let Data = {
      consumoReal: this.state.consumoReal,
      idCasa: this.props.perfil.idHogar,
      tipoRecibo: this.state.tipoDeRecibo
    };
    console.log(Data)
    if (this.state.consumoReal) {
      Axios.post(
        "/devices/agregarFechaCorte",
        Data,
        { withCredentials: true },
        { crossDomain: true }
      )
        .then((res) => {
          this.setState({
            errorConsumo: "",
          });
          this.props.handleClose();
        })
    } else {
      this.setState({
        errorConsumo: "No debe estar vacío",
      });
    }
    this.setState({
      loading: false,
    });
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
          <Modal.Title>Registrar fecha de corte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="consumo" custom size="sm">
              <Form.Label>Consumo Real</Form.Label>
              <Form.Control
                type="number"
                placeholder={0}
                onChange={this.handleChange}
                name="consumoReal"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Ingresa la cantidad real en kW que obtuviste en tu recibo
              </Form.Text>
            </Form.Group>
            {this.state.errorConsumo !== "" ? (
              <Alert variant="danger" className="text-center">
                {this.state.errorConsumo}
              </Alert>
            ) : (
              ""
            )}
            <Form.Group controlId="nombre" custom size="sm">
              <Form.Label>Tipo de recibo</Form.Label>
              <Form.Control
                as="select"
                placeholder={0}
                onChange={this.handleChange}
                name="tipoDeRecibo"
              >
                <option>tipo1</option>
                <option>tipo1a</option>
                <option>tipo1b</option>
                <option>tipo1c</option>
                <option>tipo1d</option>
                <option>tipo1e</option>
                <option>tipo1f</option>
              </Form.Control>
              <Form.Text id="passwordHelpBlock" muted>
                Ingresa la cantidad real en kW que obtuviste en tu recibo
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={this.state.loading}
            variant="secondary"
            onClick={(event) => this.handleSend(event)}
          >
            Registrar fecha de corte
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Pop;
