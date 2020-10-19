import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Cookies from "js-cookie";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";
import logo from "../images/logo.png";

export class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      currentPage: "registro",
      passwordCasa: "",
      passwordCasaError: "",
      idcasa: "",
      idcasaError: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.Validate = this.Validate.bind(this);
    this.succes = this.succes.bind(this);
    this.join = this.join.bind(this);
    this.create = this.create.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  succes = () => {
    this.setState({
      currentPage: "succes",
    });
  };

  join = () => {
    this.setState({
      currentPage: "join",
    });
  };

  create = () => {
    this.setState({
      currentPage: "create",
    });
  };

  Validate = (event) => {
    event.preventDefault();
    if (!this.state.email) {
      this.setState({
        loading: false,
        emailError: "No debe estar vacío",
        message: "",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
    if (!this.state.password) {
      this.setState({
        loading: false,
        passwordError: "No debe estar vacío",
        message: "",
      });
    } else {
      this.setState({
        passwordError: "",
      });
    }
    if (!this.state.name) {
      this.setState({
        loading: false,
        nameError: "No debe estar vacío",
        message: "",
      });
    } else {
      this.setState({
        nameError: "",
      });
    }
    if (!this.state.confirmPassword) {
      this.setState({
        loading: false,
        confirmPasswordError: "No debe estar vacío",
        message: "",
      });
    } else {
      this.setState({
        confirmPasswordError: "",
      });
      if (this.state.confirmPassword !== this.state.password) {
        this.setState({
          loading: false,
          confirmPasswordError: "Las contraseñas deben de ser iguales",
          message: "",
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }
    if (
      !(
        this.state.email === "" ||
        this.state.password === "" ||
        this.state.name === "" ||
        this.state.confirmPassword === "" ||
        this.state.confirmPassword !== this.state.password
      )
    ) {
      this.setState({
        currentPage: "succes",
      });
    }
  };

  joinUp = (event) => {
    event.preventDefault();
    if (!this.state.passwordCasa) {
      this.setState({
        loading: false,
        passwordCasaError: "No debe estar vacio",
        message: "",
      });
    } else {
      this.setState({
        passwordCasaError: "",
      });
    }
    if (!this.state.idcasa) {
      this.setState({
        loading: false,
        idcasaError: "No debe estar vacio",
        message: "",
      });
    } else {
      this.setState({
        passwordCasaError: "",
      });
    }
    if (
      !(
        this.state.email === "" ||
        this.state.password === "" ||
        this.state.name === "" ||
        this.state.passwordCasa === ""
      )
    ) {
      const Data = {
        correo: this.state.email,
        contraseñaUsuario: this.state.password,
        nombreUsuario: this.state.name,
        contraseñaCasa: this.state.passwordCasa,
        idHogar: this.state.idcasa,
      };
      Axios.post(
        "/auth/registerWHC",
        Data,
        { withCredentials: true },
        { crossDomain: true }
      )
        .then((res) => {
          this.setState({
            loading: false,
          });
          Axios.defaults.headers.common["Authorization"] =
            "Bearer " + Cookies.get("jwt");
          this.props.history.push("/home");
        })
        .catch((err) => {
          this.setState({
            message: err.response.data.error,
            loading: false,
          });
        });
    }
  };

  createUp = (event) => {
    event.preventDefault();
    console.log("aa");
    if (!this.state.passwordCasa) {
      this.setState({
        loading: false,
        passwordCasaError: "No debe estar vacio",
        message: "",
      });
    } else {
      this.setState({
        passwordCasaError: "",
      });
    }
    if (
      !(
        this.state.email === "" ||
        this.state.password === "" ||
        this.state.name === "" ||
        this.state.passwordCasa === ""
      )
    ) {
      const Data = {
        correo: this.state.email,
        contraseñaUsuario: this.state.password,
        nombreUsuario: this.state.name,
        contraseñaCasa: this.state.passwordCasa,
      };
      console.log(Data);
      Axios.post(
        "/auth/register",
        Data,
        { withCredentials: true },
        { crossDomain: true }
      )
        .then((res) => {
          this.setState({
            loading: false,
          });
          Axios.defaults.headers.common["Authorization"] =
            "Bearer " + Cookies.get("jwt");
          this.props.history.push("/home");
        })
        .catch((err) => {
          this.setState({
            message: err.response.data.error,
            loading: false,
          });
        });
    }
  };

  render() {
    let join = (
      <div className="col-md-6">
        <h1>Join</h1>
        <hr className="my-3" />
        {this.state.message !== "" ? (
          <Alert color="danger" className="text-center">
            {this.state.message}
          </Alert>
        ) : (
          ""
        )}
        <Form>
          <FormGroup>
            <Label for="id">ID </Label>
            <Input
              type="text"
              id="id"
              placeholder="Ingrese la id "
              name="idcasa"
              onChange={(event) => this.handleChange(event)}
            />
          </FormGroup>

          {this.state.idcasaError !== "" ? (
            <Alert variant="danger" className="text-center">
              {this.state.idcasaError}
            </Alert>
          ) : (
            ""
          )}
          <FormGroup>
            <Label for="Housepassword">Contraseña de Hogar</Label>
            <Input
              type="Housepassword"
              id="Housepassword"
              name="passwordCasa"
              placeholder="ingrese La contraseña de hogar"
              onChange={(event) => this.handleChange(event)}
            />
          </FormGroup>
          {this.state.passwordCasaError !== "" ? (
            <Alert variant="danger" className="text-center">
              {this.state.passwordCasaError}
            </Alert>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-center">
            <Button
              color="primary"
              onClick={this.joinUp}
              className="btn btn-default"
              size="lg"
              style={{
                backgroundColor: "#52d967",
                borderRadius: "15px",
                border: "none",
              }}
            >
              {" "}
              ingresar{" "}
            </Button>
          </div>
        </Form>
      </div>
    );

    let create = (
      <div className="col-md-6">
        <h1>Registrar Hogar</h1>
        <hr className="my-3" />
        <Form>
          <FormGroup>
            <div className="HousePassword">
              <Label for="HousePassword">Contraseña</Label>
              <Input
                placeholder="Ingrese su contraseña"
                type="password"
                name="passwordCasa"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </FormGroup>
          {this.state.passwordCasaError !== "" ? (
            <Alert variant="danger" className="text-center">
              {this.state.passwordCasaError}
            </Alert>
          ) : (
            ""
          )}
          <FormGroup>
            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                className="btn btn-default"
                size="lg"
                style={{
                  backgroundColor: "#52d967",
                  borderRadius: "15px",
                  border: "none",
                }}
                onClick={(event) => this.createUp(event)}
              >
                Crear casa
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    );

    let succes = (
      <div>
        <h1>Bienvenido a leffy</h1>
        <hr className="mt-30" />
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={logo}
            className="rounded mx-auto d-block"
            alt="Leafy Logo"
            style={{ width: "250px" }}
          />
        </div>

        <div className="d-flex justify-content-center">
          <div className="mt-5">
            <Button
              size="lg"
              style={{
                backgroundColor: "#52d967",
                borderRadius: "15px",
                border: "none",
              }}
              onClick={this.join}
            >
              Unirse a una casa
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="mt-5">
            <Button
              size="lg"
              style={{
                backgroundColor: "#048c73",
                borderRadius: "15px",
                border: "none",
              }}
              onClick={this.create}
            >
              {" "}
              Crear una casa{" "}
            </Button>
          </div>
        </div>
      </div>
    );

    let registro = (
      <div className="col-md-6">
        <h1>Registrar</h1>
        <hr className="my-3" />
        <Form>
          <FormGroup>
            <div className="name">
              <Label for="name">Nombre completo</Label>
              <Input
                type="text"
                placeholder="Nombre Completo"
                name="name"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </FormGroup>
          {this.state.nameError !== "" ? (
            <Alert variant="danger" className="text-center">
              {this.state.nameError}
            </Alert>
          ) : (
            ""
          )}

          <FormGroup>
            <Label for="email">Email </Label>
            <Input
              type="text"
              placeholder="Ingrese su correo"
              name="email"
              onChange={(event) => this.handleChange(event)}
            />
          </FormGroup>
          {this.state.emailError !== "" ? (
            <Alert variant="danger" className="text-center">
              {this.state.emailError}
            </Alert>
          ) : (
            ""
          )}
          <FormGroup>
            <div className="password">
              <Label for="password">Contraseña</Label>
              <Input
                placeholder="Ingrese su contraseña"
                type="password"
                name="password"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </FormGroup>
          {this.state.passwordError !== "" ? (
            <Alert variant="danger" className="text-center">
              {this.state.passwordError}
            </Alert>
          ) : (
            ""
          )}

          <FormGroup>
            <div className="confirmPassword">
              <Label for="Confirmar password">Confirmar Contraseña</Label>
              <Input
                placeholder="Ingrese su contraseña"
                type="Password"
                name="confirmPassword"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </FormGroup>

          {this.state.confirmPasswordError !== "" ? (
            <Alert variant="danger" className="text-center">
              {this.state.confirmPasswordError}
            </Alert>
          ) : (
            ""
          )}
          <FormGroup>
            <div className="d-flex justify-content-center">
              <Button color="link" href="/login">
                ¿tienes una cuenta?
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                className="btn btn-default"
                size="lg"
                style={{
                  backgroundColor: "#52d967",
                  borderRadius: "15px",
                  border: "none",
                }}
                onClick={(event) => this.Validate(event)}
              >
                siguiente
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    );

    let desplegar =
      this.state.currentPage === "registro"
        ? registro
        : this.state.currentPage === "succes"
        ? succes
        : this.state.currentPage === "join"
        ? join
        : this.state.currentPage === "create"
        ? create
        : "";
    return <div>{desplegar}</div>;
  }
}

export default RegisterForm;
