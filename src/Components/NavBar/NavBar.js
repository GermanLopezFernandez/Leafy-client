import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import hogar from "../../images/iconoHogar.svg";
import dispositivos from "../../images/iconoFoco.svg";
import perfil from "../../images/iconoPerfil.svg";
import video from "../../images/iconoVideo.svg";
import { NavLink } from "react-router-dom";

const styles = {
  container: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "70px",
    textUnderline: "none",
    backgroundColor: "white",
    paddingLeft: "5px",
    paddingRight: "5px"
  },
  centerText: {
    textAlign: "center",
    marginTop: "5px",
    fontSize: "15px"
  },
  icon: {
    marginTop: "10px",
    height: "25px",
    width: "25px",
  },
  notDecoration: {
    textDecoration: "none",
    color: "#464646",
  },
};

const items = [
  {
    route: "/home",
    word: "Hogar",
    icono: hogar,
  },
  {
    route: "/dispositivos",
    word: "Aparatos",
    icono: dispositivos,
  },
  {
    route: "/perfil",
    word: "Perfil",
    icono: perfil,
  },
  {
    route: "/consejos",
    word: "Consejos",
    icono: video,
  }
];

let itemsMap = items.map((item, i) => {
  return (
    <Col xs={3} key={i}>
      <NavLink
        to={item.route}
        style={styles.notDecoration}
        activeStyle={{
          fontWeight: "bold",
          color: "#52D967",
        }}
      >
        <div className="col-xs-12">
        <img src={item.icono} alt={item.word} style={styles.icon} className="mx-auto d-block" />
        </div>
            
        <Row>
          <Col xs={12}>
            <div style={styles.centerText}>{item.word}</div>
          </Col>
        </Row>
      </NavLink>
    </Col>
  );
});

export class NavBar extends Component {
  render() {
    return (
      <div style={styles.container}>
          <Row>{itemsMap}</Row>
      </div>
    );
  }
}

export default NavBar;
