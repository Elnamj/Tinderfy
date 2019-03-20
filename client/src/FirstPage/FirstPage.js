import React, { Component } from "react";
import Slideshow from "../Slideshow/Slideshow";
import "./FirstPage.css";


class FirstPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FirstPage">
        <div className="justify-content-center row" id="slideshow">
          <Slideshow model={this.props.model}/>
        </div>
      </div>
    );
  }
}

export default FirstPage;
