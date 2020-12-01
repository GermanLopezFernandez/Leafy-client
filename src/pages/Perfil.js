import React, { Component } from 'react'
import NavBar from "../Components/NavBar/NavBar"
import Presentacion from "../Components/Presentacion/Presentacion"

import axios from "axios";

const styles = {
  container: {
    paddingBottom: "80px",
    minHeight: "100vh",
    backgroundColor: "#ECECEC"
  },
};

export class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
          perfil: {},
          loading: false,
          errors: "",
        };
        this.changeProfile = this.changeProfile.bind(this)
      }

      componentDidMount() {
        axios
          .get(
            "/profile/getProfile",
            { withCredentials: true },
            { crossDomain: true }
          )
          .then((res) => {
            this.setState({
              perfil: res.data
            });
          })
          .catch((err) => {
          });
      }

      changeProfile = (objeto) => {
        axios
          .post(
            "/profile/modProfile", objeto,
            { withCredentials: true },
            { crossDomain: true }
          )
          .then((res) => {
            let modifiedState = this.state.perfil
            if(objeto.nuevoNombre){
              modifiedState.NombreUsuario = objeto.nuevoNombre
            }
            if(objeto.nuevoCorreo){
              modifiedState.Correo = objeto.nuevoCorreo
            }
            this.setState({
              perfil: modifiedState
            }) 
            this.forceUpdate()
          })
          .catch((err) => {
          });
    
      }

    render() {
        return (
            <div style={styles.container}>
                <Presentacion perfil={this.state.perfil} changeProfile={(objeto)=> this.changeProfile(objeto)}/>
                <NavBar />
            </div>
        )
    }
}

export default Perfil
