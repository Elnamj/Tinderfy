import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/Model";
import "./LogoHeader.css";


class LogoHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <div className="LogoHeader">
          <div className="logo-header row justify-content-center my-md-3 my-xs-3 mt-3">
            <img className="logo" src={require("../images/logo.png")} alt="tinderfy logo"/>
          </div>
      </div>
    );

  }
}

export default LogoHeader;
