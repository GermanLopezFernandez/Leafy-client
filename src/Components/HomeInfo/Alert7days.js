import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import iconoDanger from "../../images/iconoDanger.svg"

const styles = {
  header: {
    fontSize: "15px",
    color: "#93714F"
  },
  removeMargin: {
    margin: "0px"
  },
  icon: {
    height: "25px",
    width: "25px",
    marginLeft: "5px"
  },
}

export class Alert7days extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }
  render() {
    if(this.state.show){
      return (
          <Alert
            variant="warning"
            onClose={() => this.setState({ show: false })}
            dismissible
            style={styles.removeMargin}
          >
            <Alert.Heading style={styles.header}>
              <Row>
              <Col xs={2} className="d-flex align-items-center justify-content-center">
              <img
                src={iconoDanger}
                alt="Icono Danger"
                style={styles.icon}
                onClick={() => this.handleOpen()}
              />
              </Col>  
              <Col xs={10}>
              No has registrado el uso de tus dipositivos en los últimos {this.props.days} días
              </Col>  
              </Row></Alert.Heading>
          </Alert>
      ); 
    }
    return <div></div>
  }
}

export default Alert7days;
