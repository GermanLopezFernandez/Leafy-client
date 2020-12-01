import React, { Component } from 'react'

const styles = {
    mainInfo: {
        width: "100%",
    fontWeight: "700",
    fontSize: "20px",
    paddingBottom: "5px",
    textAlign: "center",
    },
    consumo: {
    width: "100%",
    fontWeight: "500",
    fontSize: "18px",
    paddingBottom: "5px",
    textAlign: "center",
    }
}

export class ConsumoPersonal extends Component {
    render() {
        return (
            <div>
<div style={styles.mainInfo}>
                Consumo personal
            </div>
            <div style={styles.consumo}>
            {(this.props.consumo / 1000).toFixed(2)} kW
            </div>
            </div>
        )
    }
}

export default ConsumoPersonal
