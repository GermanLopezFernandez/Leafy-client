import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

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
    const data = { email: this.email, password: this.password };

    const requesInfo = {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    };
    fetch("http//localhost:3000/login", requesInfo)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Email o contraseña incorrecto");
      })
      .then((token) => {
        localStorage.setItem("token", token);
        this.props.history.push("/dash");
      })
      .catch((e) => {
        this.setState({ message: e.message });
      });
  };

  render() {
    return (
      <div className="col-md-6">
        <h1>Iniciar Sesion</h1>
        <hr className="my-3" />
        <Form>
          <FormGroup>
            <Label for="email">Email </Label>
            <Input
              type="text"
              id="email"
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
                backgroundColor: "#048c73",
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
  }
}
