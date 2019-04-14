import React, { Component } from "react";
import Slideshow from "../Slideshow/Slideshow";
import Welcome from "../Welcome/Welcome";
import "./FirstPage.css";
import LogoHeader from "../LogoHeader/LogoHeader";
import model from "../data/Model";


class FirstPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let logo = <LogoHeader model={model}/>;

    return (
      // <div id="concert">
        <div className="FirstPage">
          {logo}
          <div className="justify-content-center sm-col-12" id="slideshow">
            <Slideshow model={this.props.model}/>
          </div>
          <div id="concert-overlay">
            <Welcome model={this.props.model}/>
          </div>
        </div>
      // </div>
    );
  }
}

export default FirstPage;
