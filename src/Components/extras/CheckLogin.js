import React, { Component } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';

export class CheckLogin extends Component {
    componentDidMount() {
        let current = this.props.location.pathname;
        let cookie = Cookies.get("jwt");
        if (cookie && current !== "home" && current !== "/dispositivos" && current !== "perfil") {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + Cookies.get("jwt");
            this.props.history.push('/home')
        } else {
            if (current === "/home" || current === "/dispositivos" || current === "/perfil") {
                this.props.history.push('/')
            }
        }
	}
  render() {
    return <div>
        <React.Fragment />
    </div>;
  }
}
export default withRouter(CheckLogin);
