import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";
//Regex para revisar si el correo es valido.
let correoEsValido = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

//Revisa si una cadena mide mas de numChar caracteres.
//En la BD tenemos un maximo de estos valores.
let stringMideMasDe = (email, numChar) => {
  return email.length >= numChar;
};

//Revisa que la password mida por lo menos 8 caracteres.
let passwordEsValido = (password) => {
  return password.length >= 8;
};

export class Pop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      password: "",
      correo: "",
      errorNombre: "",
      errorPassword: "",
      errorEmail: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async () => {
    this.setState({
      loading: true,
    });
    let error = false;
    if (this.state.password) {
      if (!passwordEsValido(this.state.password)) {
        error = true;
        this.setState({
          errorPassword: "La contraseña debe medir mínimo 8 caractéres",
        });
      } else {
        this.setState({
          errorPassword: "",
        });
      }
    } else {
      this.setState({
        errorPassword: "",
      });
    }
    if (this.state.correo) {
      if(this.state.correo !== this.props.perfil.Correo){
        if (stringMideMasDe(this.state.correo, 70)) {
          error = true;
          this.setState({
            errorEmail: "No debe de contener más de 70 caracteres",
          });
        }
        //Revisar si el correo es valido mediante REGEX.
        else {
          if (correoEsValido(this.state.correo)) {
            let Data = { correo: this.state.correo };
            //Revisar si el correo no se encuentra ya registrado en la BD.
            await Axios.post(
              "/auth/checkIfMailExists",
              Data,
              { withCredentials: true },
              { crossDomain: true }
            )
              //Si se pasan todas las pruebas, se marca que el correo no tiene errores.
              .then((res) => {
                this.setState({
                  errorEmail: "",
                });
              })
              .catch((err) => {
                error = true;
                this.setState({
                  errorEmail: err.response.data.error,
                });
              });
            //Si el correo no es valido, se registra.
          } else {
            error = true;
            this.setState({
              errorEmail: "Debe de ser un correo válido",
            });
          }
        }
      }
    } else {
      this.setState({
        errorEmail: "",
      });
    }
    if (this.state.nombre) {
      if (stringMideMasDe(this.state.nombre, 70)) {
        error = true;
        this.setState({
          errorNombre: "No debe de contener más de 70 caracteres",
        });
      } else {
        this.setState({
          errorNombre: "",
        });
      }
    } else {
      this.setState({
        errorNombre: "",
      });
    }
    if (!error) {
      const objeto = {
        nuevoNombre: this.state.nombre,
        nuevaContraseña: this.state.password,
        nuevoCorreo: this.state.correo,
      };
      this.props.changeProfile(objeto);
      this.props.handleClose();
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
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre" custom size="sm">
              <Form.Label>Nuevo nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder={this.props.perfil.NombreUsuario}
                onChange={this.handleChange}
                name="nombre"
              />
            </Form.Group>
            {this.state.errorNombre !== "" ? (
              <Alert variant="danger" className="text-center">
                {this.state.errorNombre}
              </Alert>
            ) : (
              ""
            )}
            <Form.Group controlId="selectPassword" custom size="sm">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="************"
                onChange={this.handleChange}
                name="password"
              />
            </Form.Group>
            {this.state.errorPassword !== "" ? (
              <Alert variant="danger" className="text-center">
                {this.state.errorPassword}
              </Alert>
            ) : (
              ""
            )}
            <Form.Group controlId="selectCorreo" custom size="sm">
              <Form.Label>Nuevo Correo</Form.Label>
              <Form.Control
                type="text"
                placeholder={this.props.perfil.Correo}
                onChange={this.handleChange}
                name="correo"
              />
            </Form.Group>
            {this.state.errorEmail !== "" ? (
              <Alert variant="danger" className="text-center">
                {this.state.errorEmail}
              </Alert>
            ) : (
              ""
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={this.state.loading}
            variant="secondary"
            onClick={(event) => this.handleSubmit(event)}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Pop;
