import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Pop from "./Pop"
import Cookies from 'js-cookie';
import { withRouter } from 'react-router'; 
const styles = {
  cuadroVerde: {
    backgroundColor: "#048C73",
    height: "150px",
    lineHeight: "150px",
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "30px",
  },
  title: {
    width: "100%",
    fontWeight: "700",
    fontSize: "20px",
    paddingBottom: "5px",
    textAlign: "center",
  },
  subTitle: {
    width: "100%",
  },
  button: {
    backgroundColor: "#52D967",
    border: "none",
    maxWidth: "200px",
    width: "500px",
    marginTop: "30px",
  },
  titleContainer: {
    marginTop: "30px",
    textAlign: "center",
  },
  infoTitle: {
    width: "100%",
    fontWeight: "700",
    fontSize: "20px",
    paddingBottom: "5px",
    paddingTop: "15px",
    paddingLeft: "40px",
  },
  infoSubTitle: {
    paddingLeft: "40px",
  },
  buttonLogout: {
    maxWidth: "200px",
    width: "500px",
    marginTop: "30px",
  },
};
export class Presentacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.logout = this.logout.bind(this)
  }

  //Cierra el modal
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  }

  //Abre el modal
  handleOpen = () => {
    this.setState({
      showModal: true,
    });
  }

  logout = () => {
    Cookies.remove("jwt")
    this.props.history.push("/")
  }
  render() {
    return (
      <div>
        <Pop showModal={this.state.showModal} handleClose={() => this.handleClose()} changeProfile={(objeto)=> this.props.changeProfile(objeto)}/>
        <div style={styles.cuadroVerde}>{this.props.perfil.NombreUsuario}</div>
        <div style={styles.titleContainer}>
          <div className="col-xs-12 mt-2">
            <div style={styles.title}>Rol</div>
            <div style={styles.subTitle}>{this.props.perfil.esAdmin ? "Admin" : "Usuario"}</div>
          </div>
          <div className="col-xs-12 mt-2">
            <div style={styles.title}>ID hogar</div>
            <div style={styles.subTitle}>{this.props.perfil.idHogar}</div>
          </div>
        </div>

        <div className="col-xs-12">
          <div style={styles.infoTitle}>Correo</div>
          <div style={styles.infoSubTitle}>
          {this.props.perfil.Correo}
          </div>
        </div>
        <div className="col-xs-12">
          <div style={styles.infoTitle}>Usuario</div>
          <div style={styles.infoSubTitle}>{this.props.perfil.NombreUsuario}</div>
        </div>
        <div className="col-xs-12">
          <div style={styles.infoTitle}>Id del usuario</div>
          <div style={styles.infoSubTitle}>
          {this.props.perfil.idUsuario}
          </div>
        </div>
        <div className="col-xs-12 d-flex justify-content-center">
          <Button style={styles.button} onClick={() => this.handleOpen()}>Editar</Button>
        </div>
        <div className="col-xs-12 d-flex justify-content-center">
          <Button variant="danger" style={styles.buttonLogout} onClick={() => this.logout()}>
            Salir
          </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(Presentacion);
