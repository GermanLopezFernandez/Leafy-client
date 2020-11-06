import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart";
//NavBar
import NavBar from "../Components/NavBar/NavBar";
const styles = {
  container: {
    paddingBottom: "80px",
    minHeight: "40vh",
    backgroundColor: "#ECECEC",
    borderRadius: "15px",
    padding: "15px 20px",
    margin: "5px",
  },
  title: {
    width: "100%",
    fontWeight: "700",
    fontSize: "20px",
    paddingBottom: "5px",
    textAlign: "center",
  },
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { Data: {} };
  }
  componentDidMount() {
    axios.get(`/devices/consumoPersonal`).then((res) => {
      const ipl = res.data;
      let Month = [];
      let Kwh = [];
      ipl.forEach((record) => {
        Month.push(record.Month);
        Kwh.push(record.Kwh);
      });
      this.setState({
        Data: {
          labels: Month,
          datasets: [
            {
              label: "",
              data: Kwh,
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "Blue",
                "Red",
              ],
            },
          ],
        },
      });
    });
  }
  bar() {
    axios.get("/users").then((res) => {
      console.log(res);
      const ipd = res.data;
      let Username = [];
      let kwh = [];
      ipd.forEach((record) => {
        Username.push(record.Username);
        kwh.push(record.kwh);
      });
      this.setState({
        Data: {
          labels: Username,
          datasets: [
            {
              label: "",
              data: kwh,
              backgroundColor: ["green"],
            },
          ],
        },
      });
    });
  }
  price() {
    axios.get("/users").then((res) => {
      console.log(res);
      this.setState({
        loading: false,
        Precio: res.data,
      });
    });
  }

  gauge() {
    axios.get("/devices/consumoTotal").then((res) => {
      this.setState({
        kwh: res.data,
      });
    });
  }

  render() {
    return (
      <div>
        <div style={styles.container}>
          <GaugeChart
            id="gauge-chart8"
            percent={1}
            formatTextValue={(value) => this.state.gauge + "kwh"}
            textcolor="green"
          />
          <div style={styles.title}>
            Monto estimado a pagar:{this.state.price}
          </div>
        </div>

        <div style={styles.container}>
          <Bar data={this.state.Data} options={{ maintainAspectRatio: true }} />
        </div>
        <div style={styles.container}>
          <Line
            data={this.state.Data}
            options={{ maintainAspectRatio: true }}
          />
        </div>
        <NavBar/>
      </div>
    );
  }
}
