import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const styles = {
  title: {
    paddingTop: "50px",
    fontSize: "30px",
    paddingBottom: "10px",
  },
  container: {
    backgroundColor: "white !important",
    minHeight: "100vh",
    minWidth: "100vw",
  },
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      emailError: "",
      passwordError: "",
      email: "",
      password: "",
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  signIn = (event) => {
    event.preventDefault()
    this.setState({
      loading: true,
    });
    if (!this.state.email) {
      this.setState({
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
        passwordError: "No debe estar vacío",
        message: "",
      });
    } else {
      this.setState({
        passwordError: "",
      });
    }
    if (!(this.state.email === "" || this.state.password === "")) {
      const userData = { correo: this.state.email, contraseñaUsuario: this.state.password };
      axios
        .post(
          "/auth/login",
          userData,
          { withCredentials: true },
          { crossDomain: true }
        )
        .then((res) => {
          axios.defaults.headers.common["Authorization"] =
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

  render() {
    return (
      <Container styles={styles.container}>
        <div>
          <h1>Iniciar sesión</h1>
          <hr className="my-3" />
          <Form>
            <FormGroup>
              <Label>Correo</Label>
              <Input
                type="email"
                name="email"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  paddingLeft: "8px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                }}
                onChange={(event) => this.handleChange(event)}
                placeholder="Correo"
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
              <Label>Contraseña</Label>
              <Input
                type="password"
                name="password"
                onChange={(event) => this.handleChange(event)}
                placeholder="Contraseña"
              />
            </FormGroup>

            {this.state.passwordError !== "" ? (
              <Alert variant="danger" className="text-center">
                {this.state.passwordError}
              </Alert>
            ) : (
              ""
            )}

            {this.state.message !== "" ? (
              <Alert variant="danger" className="text-center">
                {this.state.message}
              </Alert>
            ) : (
              ""
            )}
            <div className="d-flex justify-content-center">
              <Button color="link" href="/register">
                Crear Una cuenta
              </Button>
            </div>

            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                color="primary"
                disabled={this.state.loading}
                onClick={(event) => this.signIn(event)}
                className="btn btn-default"
                size="lg"
                style={{
                  backgroundColor: "#52D967",
                  borderRadius: "15px",
                  border: "none",
                  minWidth: "150px",
                }}
              >
                Ingresar
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    );
  }
}
