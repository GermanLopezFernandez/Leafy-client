import React, { Component } from "react";
import axios from "axios";

//NavBar
import NavBar from "../Components/NavBar/NavBar";

//Barra de arriba
import AddItem from "../Components/AddItem/AddItem";

//Lista de Dispositivos
import VistaDispositivos from "../Components/VistaDispositivos/VistaDispositivos";

import lupa from "../images/lupa.svg";
const styles = {
  container: {
    paddingBottom: "60px",
    minHeight: "100vh",
    backgroundColor: "#ECECEC",
  },
  lupa: {
    width: "60px",
    height: "60px",
    marginTop: "50px",
  },
  errorText: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "20px",
    marginLeft: "30px",
    marginRight: "30px",
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

  //Cuando el componente se carga se buscan los dispositivos.
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
        this.setState({
          errors: err.response.data.error,
          loading: false,
        });
      });
  }

  //Se registra un disp y se agrega al arreglo del estado.
  registrarDispositivo = (objeto) => {
    axios
      .post(
        "/devices/agregarDisp",
        objeto,
        { withCredentials: true },
        { crossDomain: true }
      )
      .then((res) => {
        let joined = this.state.dispositivos.concat(res.data);
        this.setState({
          dispositivos: joined,
        });
        this.forceUpdate();
      })
      .catch((err) => {});
  };


  //Se suma uso del dispotivo.
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
            dispositivo.sumatoria += objeto.horasUso;
          }
        });
        this.forceUpdate();
      })
      .catch((err) => {});
  };

  eliminar = (objeto) => {
    if (objeto.horas !== 0){
      axios
      .post(
        "/devices/deshabilitarDisp",
        objeto,
        { withCredentials: true },
        { crossDomain: true }
      )
      .then((res) => {
        let arr = this.state.dispositivos.filter((item) => {
          if (item.idDispositivo !== objeto.idDispositivo) {
            return item;
          }
          return null;
        });
        this.setState({
          dispositivos: arr,
        });
        this.forceUpdate();
      })
      .catch((err) => {});
    }
  };

  render() {
    return (
      <div style={styles.container} className="mt-2">
        <AddItem
          registrarDispositivo={(objeto) => this.registrarDispositivo(objeto)}
        />
        {this.state.dispositivos.length === 0 ? (
          <div>
            <img
              src={lupa}
              style={styles.lupa}
              className="rounded mx-auto d-block"
              alt="Icono Lupa"
            />
            <div style={styles.errorText}>
              Parece que no tienes articulos registrados
            </div>
          </div>
        ) : (
          <VistaDispositivos
            sumarUso={(objeto) => this.sumarUso(objeto)}
            eliminar={(objeto) => this.eliminar(objeto)}
            dispositivos={this.state.dispositivos}
          />
        )}
        <NavBar />
      </div>
    );
  }
}

export default Dispositivos;
