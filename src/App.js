import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";

//Componentes Extras
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import CheckIfLogin from "./Components/extras/CheckLogin";

//Axios
import axios from "axios";

//Paginas
import Home from "./pages/Home";
import Dispositivos from "./pages/Dispositivos";
import Perfil from "./pages/Perfil";
import Principal from "./pages/Principal";
import RegisterForm from "./pages/RegisterForm";
import Login from "./pages/Login";

//Axios Config
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common["access-control-allow-origin"] = "*";

export class App extends Component {
  render() {
    return (
      <div>
        <Router history={createBrowserHistory}>
          <CheckIfLogin />
          <ScrollToTop />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/dispositivos" component={Dispositivos} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/" component={Principal} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Register" component={RegisterForm} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
