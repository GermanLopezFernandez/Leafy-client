import React, { Component } from 'react'
import NavBar from "../Components/NavBar/NavBar"

import AddItem from "../Components/AddItem/AddItem"
import VistaDispositivos from "../Components/VistaDispositivos/VistaDispositivos"

const styles = {
    container: {
        paddingBottom: "70px"
    }
}

export class Dispositivos extends Component {
    render() {
        return (
            <div style={styles.container}>
                <AddItem/>
                <VistaDispositivos />
                <NavBar/>
            </div>
        )
    }
}

export default Dispositivos
