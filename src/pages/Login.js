import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Container,
} from "reactstrap";
import Cookies from 'js-cookie';
import axios from "axios";

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
    console.log(this.props);
    this.state = {
      message: this.props.location.state
        ? this.props.location.state.message
        : "",
    };
  }

  signIn = () => {
    const userData = { email: this.email, password: this.password };
    axios
      .post(
        "/auth/login", userData,
        { withCredentials: true },
        { crossDomain: true }
        )     
      .then((res) => {
        this.setState({
            loading: false,
        })
        axios.defaults.headers.common['Authorization'] = "Bearer " + Cookies.get('jwt');
        this.props.history.push("/home");
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errors: err,
          loading: false,
        });
      });
  }

  render() {
    return (
      <Container styles={styles.container}>
        <div>
          <h1 style={styles.title}>Iniciar Sesion</h1>

          <Form>
            <FormGroup>
              <Label for="email">
               Correo
              </Label>
              <Input
                type="text"
                id="email"
                style={{
                  width: "100%",
                  backgroundColor:"white",
                  paddingLeft: "8px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                }}
                onChange={(e) => (this.email = e.target.value)}
                placeholder="Correo"
              />
              
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                id="password"
                onChange={(e) => (this.password = e.target.value)}
                placeholder="Contraseña"
              />
            </FormGroup>

            {this.state.message !== "" ? (
              <Alert color="danger" className="text-center">
                {this.state.message}
              </Alert>
            ) : (
              ""
            )}

            <div class="d-flex justify-content-center">
              <Button color="link" href="/register">
                Crear Una cuenta
              </Button>
            </div>

            <div class="d-flex justify-content-center">
              <Button
                color="primary"
                onClick={this.signIn}
                class="btn btn-default"
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
