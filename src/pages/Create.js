import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.lenght > 0 && (valid = false);
  });

  return valid;
};

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: null,
      HousePassword: null,
      formErrors: {
        Id: "",
        HousePassword: "",
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (formValid(this.state.formErrors)) {
      console.log(`
      --submiting--
        Id: ${this.state.Id}
      
       HousePassword: ${this.state.HousePassword}
       `);
    } else {
      console.error("form invalid - display error message");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "id":
        formErrors.Id = value.length < 3 ? "minimum 3 characters required" : "";
        break;

      case "HousePassword":
        formErrors.HousePassword =
          value.length < 6 ? "minimum 6 characters required " : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="col-md-6">
        <h1>Registrar Hogar</h1>
        <hr className="my-3" />
        <Form onSubmit={this.handleSubmit} noValidate>
          <Form.Group>
              <Form.Label>Ingrese la id </Form.Label>
              <Form.Control
                type="text"
                className={formErrors.Id.length > 0 ? "error" : null}
                placeholder="Ingrese la id "
                name="Id"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.Id.length > 0 && (
                <span className="errorMessage">{formErrors.Id}</span>
              )}
          </Form.Group>

          <Form.Group>
              <Form.Label For="HousePassword">Contraseña</Form.Label>
              <Form.Control
                className={formErrors.HousePassword.length > 0 ? "error" : null}
                placeholder="Ingrese su contraseña"
                type="password"
                name="HousePassword"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.HousePassword.length > 0 && (
                <span className="errorMessage">{formErrors.HousePassword}</span>
              )}
          </Form.Group>
          <Form.Group>
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
              >
                Crear casa
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
