import React, { Component } from "react";
import NavBar from "../Components/NavBar/NavBar";

import AddItem from "../Components/AddItem/AddItem";
import VistaDispositivos from "../Components/VistaDispositivos/VistaDispositivos";

import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.headers.common["authorization"] = "Bearer " + Cookies.get("jwt");

const styles = {
  container: {
    paddingBottom: "70px",
  },
};

export class Dispositivos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dispositivos: [],
      loading: false,
      errors: "",
    };
    this.registrarDispositivo = this.registrarDispositivo.bind(this);
    this.sumarUso = this.sumarUso.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        "/devices/getAllDisps",
        { withCredentials: true },
        { crossDomain: true }
      )
      .then((res) => {
        this.setState({
          loading: false,
          dispositivos: res.data,
        });
      })
      .catch((err) => {
          console.log(err.response)
        this.setState({
          errors: err.response.data.error,
          loading: false,
        });
      });
  }

  registrarDispositivo = (objeto) => {
    axios
      .post(
        "/devices/agregarDisp",
        objeto,
        { withCredentials: true },
        { crossDomain: true }
      )
      .then((res) => {
        let joined = this.state.dispositivos.concat(res.data)
        console.log(joined)
        this.setState({
            dispositivos: joined
        })
      })
      .catch((err) => {});
      ;
  };

  sumarUso = (objeto) => {
    axios
      .post(
        "/devices/agregarHoras",
        objeto,
        { withCredentials: true },
        { crossDomain: true }
      )
      .then((res) => {
        this.state.dispositivos.forEach((dispositivo) => {
            if (dispositivo.idDispositivo === objeto.idDispositivo) {
                dispositivo.Sumatoria += objeto.horasUso
            }
        });
      })
      .catch((err) => {});
      ;
  };

  eliminar = (objeto) => {
    axios
      .post(
        "/devices/deshabilitarDisp",
        objeto,
        { withCredentials: true },
        { crossDomain: true }
      )
      .then((res) => {
        let arr = this.state.dispositivos.filter((item) => {
            if(item.idDispositivo !== objeto.deviceID)
                return item
        })
        this.setState({
            dispositivos: arr
          });
      })
      .catch((err) => {});
      ;
  };

  render() {
    return (
      <div style={styles.container}>
        <AddItem registrarDispositivo={(objeto) => this.registrarDispositivo(objeto)}/>
        {this.state.errors ? <div>{this.state.errors}</div> : <VistaDispositivos sumarUso={(objeto) => this.sumarUso(objeto)} eliminar={(objeto) => this.eliminar(objeto)}  dispositivos={this.state.dispositivos} />}
        <NavBar />
      </div>
    );
  }
}

export default Dispositivos;
