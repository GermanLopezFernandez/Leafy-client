import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Gauge from "../Components/HomeInfo/Gauge";
import ConsumoPersonal from "../Components/HomeInfo/ConsumoPersonal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../Components/NavBar/NavBar";
import Alert7days from "../Components/HomeInfo/Alert7days";
import AlertNuevoUsuario from "../Components/HomeInfo/AlertNuevoUsuario";
import listaConsejos from "../Components/extras/listaConsejos";
import Consejo from "../Components/Consejos/Consejo";
import Accordion from 'react-bootstrap/Accordion'
let compare = (a, b) => {
  if (a.consumo < b.consumo) {
    return -1;
  }
  if (a.consumo > b.consumo) {
    return 1;
  }
  return 0;
};


const styles = {
  container: {
    paddingBottom: "60px",
    minHeight: "100vh",
    backgroundColor: "#ECECEC",
  },
  graphContainer: {
    paddingLeft: "20px",
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingRight: "20px",
  },
  cardContainer: {
    borderRadius: "15px",
    backgroundColor: "white",
    marginBottom: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  containerTitle: {
    paddingLeft: "20px",
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingRight: "20px",
    backgroundColor: "white",
  },
  title: {
    fontSize: "30px",
    color: "#464646",
  },
  mainInfo: {
    width: "100%",
    fontWeight: "700",
    fontSize: "20px",
    paddingBottom: "10px",
    textAlign: "center",
  },
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gauge: 0,
      consumoTotalParaPagar: 0,
      consumoPersonal: 0,
      ultimaEntrada: 0,
      tipPersonalizado: "3"
    };
  }

  componentDidMount() {
    //Saber el consumo en watts personal.
    axios
      .post(`/devices/consumoPersonal`)
      .then((res) => {
        this.setState({
          consumoPersonal: res.data.consumoPersonal[0].consumo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // Saber el consumo por mes total familiar.
    axios
      .post("/devices/consumoTotal")
      .then((res) => {
        this.setState({
          gauge: res.data.consumoTotal[0].consumo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // Informacion de grafica familiar.
    let colores = [
      "rgba(82, 217, 103, 1)",
      "rgba(4, 140, 116, 1)",
      "rgba(255, 149, 95, 1)",
      "rgba(200, 0, 3, 1)",
    ];
    axios.post("/devices/consumoFamiliar").then((res) => {
      let ipd = res.data.consumoPersona;
      console.log(ipd)
      let Username = [];
      let kwh = [];
      ipd = ipd.sort(compare);
      ipd.forEach((record) => {
        Username.push(record.nombreUsr);
        kwh.push(record.consumo / 1000);
      });

      //let min = Math.ceil((Math.min.apply(null, kwh) - 40) / 20) * 20
      //if(min < 0){
      //  min = 0
      //}

      this.setState({
        Data: {
          labels: Username,
          datasets: [
            {
              label: "",
              data: kwh,
              backgroundColor: colores,
            },
          ],
        },
        options: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
    //Consumo Semanal
    axios.post("/devices/consumoSemanal").then((res) => {
      let ipd = res.data.consumoFinal;
      let semana = [];
      let kwh = [];
      for(let i = ipd.length-1; i >= 0; i--){
        semana.push(i+1)
        kwh.push(ipd[i][i+1]/1000)
      }
      let colores2 = [
        "rgba(82, 217, 103, 1)",
        "rgba(82, 217, 103, 1)",
        "rgba(82, 217, 103, 1)",
        "rgba(82, 217, 103, 1)",
      ];
      this.setState({
        Data2: {
          labels: semana,
          datasets: [
            {
              label: "",
              data: kwh,
              backgroundColor: colores2,
            },
          ],
        },
        options2: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    })
    .catch((err) => {
      console.log("Paso un error")
    });
    //Obtener estimado a apgar
    axios
      .post("/devices/consumoTotalParaPagar", { tipoRecibo: "tipo1" })
      .then((res) => {
        this.setState({
          consumoTotalParaPagar: res.data.consumo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //Obtener dias de modificacion
    axios
      .post("/devices/obtenerDiasDeModificacion")
      .then((res) => {
        this.setState({
          ultimaEntrada: res.data.result,
        });
      })
      .catch((err) => {
        console.log("Sucedio un error");
        console.log(err);
      });
    //Obtener consejoPersonalizado
    axios
      .get("/devices/obtenerTipPersonalizado")
      .then((res) => {
        this.setState({
          tipPersonalizado: String(res.data.result),
        });
      })
      .catch((err) => {
        console.log("Sucedio un error");
      });
  }

  render() {
    let message = this.state.ultimaEntrada >= 7 ? <Alert7days days={this.state.ultimaEntrada}/> : 
    this.state.ultimaEntrada === -1 ? <AlertNuevoUsuario /> : <div></div>;
    const tipEncontrado = listaConsejos.find( consejo => consejo.id === this.state.tipPersonalizado);
    return (
      <div style={styles.container} className="mt-2">
        <div style={styles.containerTitle}>
          <Row>
            <Col xs={12}>
              <h1 style={styles.title}>Hogar</h1>
            </Col>
          </Row>
        </div>
        {message}
        <div style={styles.graphContainer}>
          <div style={styles.cardContainer}>
            <Gauge
              consumo={this.state.gauge}
              pagar={this.state.consumoTotalParaPagar}
            />
          </div>
          <div style={styles.cardContainer}>
            <ConsumoPersonal consumo={this.state.consumoPersonal} />
          </div>
          <Accordion>
          <Consejo item={tipEncontrado} id={tipEncontrado.id} />
          </Accordion>
          
          <div style={styles.cardContainer}>
            <div style={styles.mainInfo}>kW consumidos por persona</div>
            <Bar data={this.state.Data} options={this.state.options} />
          </div>
          <div style={styles.cardContainer}>
            <div style={styles.mainInfo}>Historial kW consumidos en casa por semana</div>
            <Line data={this.state.Data2} options={this.state.options2} />
          </div>
        </div>
        <NavBar />
      </div>
    );
  }
}
