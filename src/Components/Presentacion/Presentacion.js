import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Pop from "./Pop"
import PopAdmin from "./PopAdmin"
import { withRouter } from 'react-router'; 
import axios from "axios"
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
  },
  infoSubTitle: {
  },
  buttonLogout: {
    maxWidth: "200px",
    width: "500px",
    marginTop: "30px",
  },
  buttonAdmin: {
    maxWidth: "200px",
    width: "500px",
    marginTop: "30px",
    backgroundColor: "#048C73",
  },
};



export class Presentacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModalAdmin: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCloseAdmin = this.handleCloseAdmin.bind(this);
    this.handleOpenAdmin = this.handleOpenAdmin.bind(this);
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

  handleCloseAdmin = () => {
    this.setState({
      showModalAdmin: false,
    });
  }

  //Abre el modal
  handleOpenAdmin = () => {
    this.setState({
      showModalAdmin: true,
    });
  }

  logout = () => {
    localStorage.removeItem('leafyToken')
    delete axios.defaults.headers.common["Authorization"];
    this.props.history.push("/")
  }
  render() {
    let botonAdmin = this.props.perfil.esAdmin ? <div className="col-xs-12 d-flex justify-content-center">
    <Button style={styles.buttonAdmin} onClick={() => this.handleOpenAdmin()}>Ingresar fecha de corte</Button>
    </div> : 
    ""
    return (
      <div>
        <Pop showModal={this.state.showModal} handleClose={() => this.handleClose()} changeProfile={(objeto)=> this.props.changeProfile(objeto)} perfil={this.props.perfil}/>
        <PopAdmin showModal={this.state.showModalAdmin} handleClose={() => this.handleCloseAdmin()} changeProfile={(objeto)=> this.props.changeProfile(objeto)} perfil={this.props.perfil}/>
        <div style={styles.cuadroVerde}>{this.props.perfil.NombreUsuario}</div>
        <div style={styles.titleContainer}>
          <div className="col-xs-12 mt-2">
            <div style={styles.infoTitle}>Rol</div>
            <div style={styles.infoSubTitle}>{this.props.perfil.esAdmin ? "Admin" : "Usuario"}</div>
          </div>
          {botonAdmin}
          <div className="col-xs-12 mt-2">
            <div style={styles.infoTitle}>ID hogar</div>
            <div style={styles.infoSubTitle}>{this.props.perfil.idHogar}</div>
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
      </div>
    );
  }
}

export default withRouter(Presentacion);
