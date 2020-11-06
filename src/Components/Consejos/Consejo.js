import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pop from "./Pop";
import PlayIcon from "../../images/playIcon.svg"
const styles = {
  cardContainer: {
    borderRadius: "15px",
    backgroundColor: "white",
    marginBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  header: {
    backgroundColor: "white",
    color: "black",
    fontSize: "16px",
    fontWeight: "600"
  },
  rowHeight: {
    minHeight: "40px"
  },
  removeDecoration: {
    backgroundColor: "white",
    color: "black !important",
    textDecoration: "none !important"
  },
  edit: {
    height: "25px",
    width: "25px",
  },
};

export class Consejo extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    return (
      <div>
        <Pop
          showModal={this.state.showModal}
          item={this.props.item}
          handleClose={() => this.handleClose()}
        />
      <Card style={styles.cardContainer}>
          <Accordion.Toggle as={Card.Header} eventKey={this.props.item.id} style={styles.header}>
            <Row style={styles.rowHeight}>
            <Col
              xs={10}
              className="d-flex align-items-center"
            >
              {this.props.item.nombre}
            </Col>
            <Col
              xs={2}
              className="d-flex align-items-center justify-content-center"
            >
              <div style={styles.imgWrap}>
                <img
                  src={PlayIcon}
                  alt="Icono editar"
                  style={styles.edit}
                  onClick={() => this.handleOpen()}
                />
              </div>
            </Col>
          </Row>
          </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.item.id}>
    <Card.Body>{this.props.item.descripcion}</Card.Body>
        </Accordion.Collapse>
      </Card>
      </div>
    );
  }
}

export default Consejo;
