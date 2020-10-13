import React, { Component } from 'react'


import NavBar from "../Components/NavBar/NavBar"
import Presentacion from "../Components/Presentacion/Presentacion"

const styles = {
    container: {
        paddingBottom: "70px"
    }
}

export class Perfil extends Component {
    render() {
        return (
            <div style={styles.container}>
                <Presentacion />
                <NavBar />
            </div>
        )
    }
}

export default Perfil
