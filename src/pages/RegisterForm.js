import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Axios from "axios";
import Alert from "react-bootstrap/Alert";
import logo from "../images/logo.png";

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
      message:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.Validate = this.Validate.bind(this);
    this.succes = this.succes.bind(this);
    this.join = this.join.bind(this);
    this.create = this.create.bind(this);
  }

  //Funcion para cambiar el estado cuando un cambio se vea reflejado en las forms. 
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //Cambia de pagina a success. Elegir entre crear casa o unirse a una. 
  succes = () => {
    this.setState({
      currentPage: "succes",
    });
  };

  //Cambia de pagina a join. Para unirse a una casa. 
  join = () => {
    this.setState({
      currentPage: "join",
    });
  };

  //Cambia de pagina a create. Para crear a una casa. 
  create = () => {
    this.setState({
      currentPage: "create",
    });
  };

  //Valida que toda la informacion echa en el registro de usuario sea correcta, si si. Pasa a success. 
  Validate = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    let emailValido = false;
    let passwordValido = false;
    //VALIDACION DEL CORREO
    //Si se encuentra vacío, marca error de que no se debe de encontrar vacio. 
    if (!this.state.email) {
      this.setState({
        emailError: "No debe estar vacío",
      });
    } else {
      //Revisar que la string no mide mas de 70 chars. (Requisito de la BD).
      if (stringMideMasDe(this.state.email, 70)){
        this.setState({
          emailError: "No debe de contener más de 70 caracteres",
        });
      }
      else{
        //Revisar si el correo es valido mediante REGEX.
        if (correoEsValido(this.state.email)) {
          let Data = { correo: this.state.email };
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
                emailError: "",
              });
              emailValido = true;
            })
            .catch((err) => {
              this.setState({
                emailError: err.response.data.error,
              });
            });
        //Si el correo no es valido, se registra. 
        } else {
          this.setState({
            emailError: "Debe de ser un correo válido",
          });
        }
      }
    }
    //VALIDACION DE PASSWORD
    //Si se encuentra vacia, se registra. 
    if (!this.state.password) {
      this.setState({
        passwordError: "No debe estar vacío",
      });
    } else {
      //Revisar que la password mida por lo menos 8 chars.
      if (passwordEsValido(this.state.password)) {
        passwordValido = true;
        this.setState({
          passwordError: "",
        });
      } else {
        this.setState({
          passwordError: "La contraseña debe de medir mínimo 8 caractéres",
        });
      }
    }
    //VALIDACION DE NOMBRE
    //Revisar que no se encuentre vacio el nombre
    if (!this.state.name) {
      this.setState({
        nameError: "No debe estar vacío",
      });
    } else {
      //Validar que no mida mas de 70 caracteres.
      if(stringMideMasDe(this.state.name, 70)){
        this.setState({
          nameError: "No debe de contener más de 70 caracteres",
        });
      }
      else{
        this.setState({
          nameError: "",
        });
      }
    }
    //VALIDACION DE CONFIRM PASSWORD
    if (!this.state.confirmPassword) {
      this.setState({
        confirmPasswordError: "No debe estar vacío",
      });
    } else {
      if (this.state.confirmPassword !== this.state.password) {
        this.setState({
          confirmPasswordError: "Las contraseñas deben de ser iguales",
        });
      } else {
        this.setState({
          confirmPasswordError: "",
        });
      }
    }
    //Validar que no exista ningun error en el registro.
    //Si no existe, se cambia a la pagina de success.
    if (
      !(
        this.state.email === "" ||
        this.state.password === "" ||
        this.state.name === "" ||
        this.state.confirmPassword === "" ||
        this.state.confirmPassword !== this.state.password
      ) &&
      emailValido &&
      passwordValido
    ) {
      this.setState({
        currentPage: "succes",
      });
    }
    this.setState({
      loading: false,
    });
  };

  //Funcion para unirse a una casa. 
  joinUp = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    //Revisamos que la password de la casa no este vacia.
    if (!this.state.passwordCasa) {
      this.setState({
        passwordCasaError: "No debe estar vacio",
        message: ""
      });
    } else {
      this.setState({
        passwordCasaError: "",
      });
    }
    //Revisamos que el id de la casa no este vacio.
    if (!this.state.idcasa) {
      this.setState({
        idcasaError: "No debe estar vacio",
        message: ""
      });
    } else {
      this.setState({
        idcasaError: "",
      });
    }
    if (
      !(
        this.state.idcasa === "" ||
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
          Axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          localStorage.setItem('leafyToken', res.data.token)
          this.props.history.push("/home");
        })
        .catch((err) => {
          this.setState({
            message: err.response.data.error,
          });
        });
    }
    this.setState({
      loading: false,
    });
  };

  createUp = (event) => {
    let passwordValido = false
    event.preventDefault();
    if (!this.state.passwordCasa) {
      this.setState({
        loading: false,
        passwordCasaError: "No debe estar vacio",
        message: "",
      });
    } else {
      if (passwordEsValido(this.state.passwordCasa)) {
        this.setState({
          passwordCasaError: "",
        });
        passwordValido = true
      } else {
        this.setState({
          passwordCasaError: "La contraseña debe de medir mínimo 8 caractéres",
        });
      }
    }
    if (
      !(
        this.state.email === "" ||
        this.state.password === "" ||
        this.state.name === "" ||
        this.state.passwordCasa === ""
      ) && passwordValido
    ) {
      const Data = {
        correo: this.state.email,
        contraseñaUsuario: this.state.password,
        nombreUsuario: this.state.name,
        contraseñaCasa: this.state.passwordCasa,
      };
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
            "Bearer " + res.data.token;
          localStorage.setItem('leafyToken', res.data.token)
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
        <h1>Unirse a una casa</h1>
        <hr className="my-3" />
        <Form>
          <FormGroup>
            <Label for="id">ID de la casa</Label>
            <Input
              type="text"
              id="id"
              placeholder="ID de la casa"
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
            <Label for="Housepassword">Contraseña de la casa</Label>
            <Input
              type="password"
              id="Housepassword"
              name="passwordCasa"
              placeholder="Contraseña de la casa"
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
          {this.state.message ? (
          <Alert variant="danger" className="text-center">
            {this.state.message}
          </Alert>
        ) : (
          ""
        )}
          <div className="d-flex justify-content-center">
            <Button
              disabled={this.state.loading}
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
              Ingresar
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
              disabled={this.state.loading}
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
                disabled={this.state.loading}
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
