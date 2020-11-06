import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const styles = {
  limit: {
    maxWidth: "70%",
  },
  videoContenedor: {
    position: "relative",
    paddingBottom: "56.25%",
    paddingTop: "25px",
    height: 0,
  },
  iframeStyles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
};

export class Pop extends Component {
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
          <Modal.Title>{this.props.item.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.videoContenedor}>
            <iframe
              title={this.props.item.nombre}
              style={styles.iframeStyles}
              src={this.props.item.url}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.handleClose()}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Pop;
