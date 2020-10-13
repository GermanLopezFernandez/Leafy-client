import React, { Component } from 'react'

import NavBar from "../Components/NavBar/NavBar"

const styles = {
    container: {
        paddingBottom: "70px"
    }
}


export class Home extends Component {
    render() {
        return (
            <div style={styles.container}>
                <NavBar />
            </div>
        )
    }
}

export default Home
