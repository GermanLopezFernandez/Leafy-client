import React, { Component } from "react";
import GaugeChart from "react-gauge-chart";

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

export class Gauge extends Component {
  render() {
    return (
      <div>
        <div style={styles.mainInfo}>
          kW consumidos en la casa
        </div>
        <GaugeChart
          id="gauge-chart8"
          nrOfLevels={4}
          percent={(this.props.consumo / 2500000).toFixed(2)}
          formatTextValue={() => (this.props.consumo / 1000).toFixed(2)}
          textColor="#000000"
          cornerRadius={3}
          arcWidth={0.25}
        />
        <div style={styles.mainInfo}>
          Estimado total a pagar
        </div>
        <div style={styles.consumo}>
            ${(this.props.pagar / 1).toFixed(2)}
        </div>
      </div>
    );
  }
}

export default Gauge;
