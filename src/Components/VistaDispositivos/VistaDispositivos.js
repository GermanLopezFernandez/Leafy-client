import React, { Component } from "react";

import Dispositivo from "./Dispositivo.js";

const styles = {
  container: {
    paddingLeft: "20px",
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingRight: "20px",
  },
};

export class VistaDispositivos extends Component {
  render() {
    let dispositivosMapeados = this.props.dispositivos ? (
        this.props.dispositivos.map((item, i) => {
            return <Dispositivo sumarUso={(objeto) => this.props.sumarUso(objeto)} eliminar={(objeto) => this.props.eliminar(objeto)} item={item} key={item.idDispositivo} />;
          })
    ): (
        "Cargando"
    )

    return <div style={styles.container}>{dispositivosMapeados}</div>;
  }
}

export default VistaDispositivos;
