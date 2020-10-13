import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

export default class Join extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      message: this.props.location.state
        ? this.props.location.state.message
        : "",
    };
  }

  Join = () => {
    const data = {
      id: this.id,
      Userpassword: this.Userpassword,
      Housepassword: this.Housepassword,
    };

    const requesInfo = {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    };
    fetch("http//localhost:3000/join", requesInfo)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Ingreso fallido");
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
              onChange={(e) => (this.id = e.target.value)}
              placeholder="Ingrese la id "
            />
          </FormGroup>
          <FormGroup>
            <Label for="Userpassword">Contraseña de usuario</Label>
            <Input
              type="Userpassword"
              id="Userpassword"
              onChange={(e) => (this.Userpassword = e.target.value)}
              placeholder="ingrese su contraseña"
            />
          </FormGroup>

          <FormGroup>
            <Label for="Housepassword">Contraseña de Hogar</Label>
            <Input
              type="Housepassword"
              id="Housepassword"
              onChange={(e) => (this.Housepassword = e.target.value)}
              placeholder="ingrese La contraseña de hogar"
            />
          </FormGroup>

          <div class="d-flex justify-content-center">
            <Button
              color="primary"
              onClick={this.Join}
              class="btn btn-default"
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
  }
}
