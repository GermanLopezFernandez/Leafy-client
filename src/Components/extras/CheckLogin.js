import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';

export class CheckLogin extends Component {
    componentDidMount() {
        let current = this.props.location.pathname;
        let cookie = localStorage.getItem('leafyToken')
        if (cookie && current !== "home" && current !== "/dispositivos" && current !== "perfil") {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + cookie;
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
