import React, { Component } from "react";

//NavBar
import NavBar from "../Components/NavBar/NavBar";
import Consejo from "../Components/Consejos/Consejo";
import listaConsejos from "../Components/extras/listaConsejos";
import Accordion from 'react-bootstrap/Accordion'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const styles = {
  container: {
    paddingBottom: "60px",
    minHeight: "100vh",
    backgroundColor: "#ECECEC",
  },
  containerVideos: {
    paddingLeft: "20px",
    paddingTop: "15px",
    paddingBottom: "15px",
    paddingRight: "20px",
  },
  cardContainer: {
    marginTop: "20px",
    backgroundColor: "white",
    color: "black !important",
    textDecoration: "none !important"
  },
  removeDecoration: {
    backgroundColor: "white",
    color: "black !important",
    textDecoration: "none !important"
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
    subtitle: {
      fontSize: "20px",
      color: "#464646",
    },
  };


export class Consejos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consejos: listaConsejos,
      consejoDelDia: 0
    };

  }

  componentWillMount() {
    var midNight = new Date();
    midNight.setHours(0,0,0,0);
    var settings = localStorage.getItem('selection');
    if (settings) settings = JSON.parse(settings);
    if (!settings || settings.date < midNight.toJSON() ) {
        settings = {
            selection: Math.floor(Math.random() * (this.state.consejos.length + 1)),
            date: midNight.toJSON()
        };
        localStorage.setItem('selection', JSON.stringify(settings));
        this.setState({
          consejoDelDia: settings.selection
        })
    } else {
      this.setState({
        consejoDelDia: settings.selection
      })
    }
  }


  render() {
    let consejosMapeados = this.state.consejos ? (
      this.state.consejos.map((item, i) => {
        return <Consejo item={item} id={item.id} />
      })
    ) : (
      <div></div>
    );

      let consejoDelDia = localStorage.getItem("selection") ?
      <Consejo item={this.state.consejos[this.state.consejoDelDia]} id={this.state.consejoDelDia} /> :
      Math.floor(Math.random() * (this.state.consejos.length + 1))

    return (
      <div style={styles.container}>
        <div style={styles.containerTitle}>
        <Row>
          <Col xs={12}>
            <h1 style={styles.title}>Consejos</h1>
          </Col>
        </Row>
      </div>
        <div style={styles.containerVideos}>
        <h2 style={styles.subtitle}>
        Consejo del día
        </h2>
        <Accordion>
          {consejoDelDia}
        </Accordion>
        <h2 style={styles.subtitle}>
        Todos
        </h2>
        <Accordion>
        {this.state.consejos.length === 0 ? <div></div> : consejosMapeados}
        </Accordion>
        </div>
        <NavBar />
      </div>
    );
  }
}

export default Consejos;
