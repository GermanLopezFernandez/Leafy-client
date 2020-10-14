import React, { Component } from "react";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Dispositivos from "./pages/Dispositivos"
import Perfil from "./pages/Perfil"
import Logout from './pages/Logout';
import Principal from './pages/Principal';
import Success from './pages/Succes';
import join from './pages/Join'
import Create from './pages/Create'
import PrivateRoute from './Components/Login/auth';
import {RegisterForm} from './images/RegisterForm';
import Login from './pages/Login'

axios.defaults.baseURL =
  'http://localhost:5000';
axios.defaults.headers.common['access-control-allow-origin'] = "*"

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/dispositivos" component={Dispositivos} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path= "/" component= {Principal}/>
            <Route path ="/login" component= {Login}/>
            <Route  path= "/Register" component={RegisterForm}/>
            <PrivateRoute path="/dash" component />
            <Route exact path ="/logout" component= {Logout}/>
            <Route path="/success" component={Success}/>
            <Route path="/join" component={join}/>
            <Route path="/create" component={Create}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
