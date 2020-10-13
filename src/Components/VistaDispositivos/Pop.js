import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./styles.css"

const styles = {
  fullWidth: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: "250px",
    borderRadius: "15px",
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "25px",
    backgroundColor: "#52D967",
    border: "none"
  },
  buttonSubmit: {
    minWidth: "100px",
    borderRadius: "15px",
    marginBottom: "20px",
    fontSize: "18px",
    backgroundColor: "#048c73",
    border: "none"
  },
  buttonDelete: {
    minWidth: "100px",
    borderRadius: "15px",
    marginBottom: "20px",
    fontSize: "18px",
    backgroundColor: "#d9534f",
    border: "none"
  },
  numero: {
    textAlign: "center",
    fontSize: "40px",
  },
  texto: {
    textAlign: "center",
    fontSize: "20px",
  },
  textEliminar: {
    fontSize: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  textEliminarChico: {
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "15px",
  },
  containerBody: {
    minHeight: "350px"
  }
};

export class Pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dispositivo: "",
      nombre: "",
      variacion: "",
      selected: "Registrar",
      horas: 0,
    };
    this.handleSelectRegistrar = this.handleSelectRegistrar.bind(this);
    this.handleSelectOpciones = this.handleSelectOpciones.bind(this);
    this.sumar = this.sumar.bind(this);
    this.restar = this.restar.bind(this);
  }

  handleSelectRegistrar = (event) => {
    this.setState({
      selected: "Registrar",
    });
  };

  handleSelectOpciones = (event) => {
    this.setState({
      selected: "Opciones",
    });
  };

  sumar = () => {
    let h = this.state.horas;
    this.setState({
      horas: h + 1,
    });
  };

  restar = () => {
    let h = this.state.horas;
    if (h !== 0) {
      this.setState({
        horas: h - 1,
      });
    }
  };

  render() {
    let botonEliminar = (
      <Button variant="danger" style={styles.buttonDelete} onClick={this.props.handleClose}>
        Eliminar dispositivo
      </Button>
    );

    let botonAgregar = (
      <Button style={styles.buttonSubmit} onClick={this.props.handleClose}>
        Registrar Uso
      </Button>
    );

    let contenido =
      this.state.selected === "Registrar" ? (
        <div>
          <div style={styles.fullWidth}>
            <Button
              variant="success"
              style={styles.button}
              onClick={() => this.sumar()}
            >
              +
            </Button>
          </div>
          <div>
            <div style={styles.numero}>{this.state.horas}</div>
            <div style={styles.texto}>horas</div>
          </div>
          <div style={styles.fullWidth}>
            <Button
              variant="success"
              style={styles.button}
              onClick={() => this.restar()}
            >
              -
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div style={styles.textEliminar}>
            <Row style={{marginTop: "60px"}}>
              <Col xs={6}>
                Nombre:
              </Col>
              <Col xs={6}>
              {this.props.item.nombre}
              </Col>
            </Row>
          </div>

          <div style={styles.textEliminar}>
            <Row>
              <Col xs={6}>
              Tipo:
              </Col>
              <Col xs={6}>
              {this.props.item.tipo}
              </Col>
            </Row>
          </div>

          <div style={styles.textEliminar}>
            <Row>
              <Col xs={6}>
              Variante:
              </Col>
              <Col xs={6}>
              {this.props.item.variante}
              </Col>
            </Row>
          </div>
          <div style={styles.textEliminarChico}>
            Eliminar un dispositivo no quita el registro que tienes, este seguirá contando a tu consumo. 
          </div>
        </div>
      );

    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleClose}
        animation={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.item.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.containerBody}>
          <Nav fill variant="pills" defaultActiveKey={this.state.selected}>
            <Nav.Item>
              <Nav.Link
                eventKey="Registrar"
                onSelect={(event) => this.handleSelectRegistrar()}
              >
                Registrar
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Opciones"
                onSelect={(event) => this.handleSelectOpciones()}
              >
                Opciones
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {contenido}
        </Modal.Body>
        <Modal.Footer>
          {this.state.selected==="Registrar" ? botonAgregar : botonEliminar}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Pop;
