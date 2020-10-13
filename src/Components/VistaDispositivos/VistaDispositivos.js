import React, { Component } from 'react'

import Dispositivo from "./Dispositivo.js"

const dispositivos = [
    {
        nombre: "TV SALAaaaaa",
        tipo: "Televisor",
        horas: "20",
        id: "1",
        variante: "Grande"
    },
    {
        nombre: "Foco Led",
        tipo: "Lampara",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "Tostadora",
        tipo: "Tostadora",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "lavadora",
        tipo: "Lavadora",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "Estufa",
        tipo: "Estufa",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "Cafetera",
        tipo: "Cafetera",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "Foco Led",
        tipo: "Lampara",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "Tostadora",
        tipo: "Tostadora",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "lavadora",
        tipo: "Lavadora",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "Estufa",
        tipo: "Estufa",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    {
        nombre: "Cafetera",
        tipo: "Cafetera",
        horas: "30",
        id: "2",
        variante: "Grande"
    },
    
    
]

const styles = {
    container: {
        paddingLeft: "20px",
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingRight: "20px",
    },
}

let dispositivosMapeados = dispositivos.map((item, i) => {
    return (
    <Dispositivo item={item} key={i}/>
    );
  });

export class VistaDispositivos extends Component {
    render() {
        return (
            <div style={styles.container}>
                {dispositivosMapeados}
            </div>
        )
    }
}

export default VistaDispositivos
