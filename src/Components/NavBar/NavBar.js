import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import hogar from "../../images/iconoHogar.svg";
import dispositivos from "../../images/iconoFoco.svg";
import perfil from "../../images/iconoPerfil.svg";
import { NavLink } from "react-router-dom";


const styles = {
  container: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "70px",
    textUnderline: "none",
    backgroundColor: "white"
  },
  centerText: {
    textAlign: "center",
    marginTop: "40px",
  },
  icon: {
    marginTop: "30px",
    height: "25px",
    width: "25px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  imgWrap: {
    width: "100%",
  },
  notDecoration: {
    textDecoration: "none",
    color: "#464646",
  },
};

const items = [
  {
    route: "/home",
    word: "Mi hogar",
    icono: hogar,
  },
  {
    route: "/dispositivos",
    word: "Dispositivos",
    icono: dispositivos,
  },
  {
    route: "/perfil",
    word: "Perfil",
    icono: perfil,
  },
];

let itemsMap = items.map((item, i) => {
  return (
    <Col xs={4} key={i}>
      <NavLink
        to={item.route}
        style={styles.notDecoration}
        activeStyle={{
          fontWeight: "bold",
          color: "#52D967",
        }}
      >
        <Row>
          <Col xs={12}>
            <div style={styles.imgWrap}>
              <img src={item.icono} alt={item.word} style={styles.icon} />
            </div>
          </Col>
        </Row>
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
