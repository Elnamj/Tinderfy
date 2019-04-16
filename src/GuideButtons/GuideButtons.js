import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GuideButtons.css";
import App from "../App";
import {Offline,Online} from "react-detect-offline";


class GuideButtons extends Component {
  render() {
    return (
      <div className="welcome-buttons row">
            {/* <a href="https://tinderfy-backend.herokuapp.com/login" > */}
            <div className="col-6">
                <Link to="/">
                <button className="btn btn1 cool-btn" id="btn1">Back</button>
                </Link>
            </div>
            {/* <a href="https://tinderfy-backend.herokuapp.com/login" > */}
            {/*<a href="http://localhost:8888/login">*/}
        <Online>
          <div className="col-6">
             <a href="https://tinderfy-backend.herokuapp.com/login" >
             <button className="btn btn1 cool-btn" id="btn1">Start</button>
             </a>
          </div>
        </Online>
        <Offline>
          <div className="col-6">
             <button className="btn btn1 cool-btn" id="btn1" disabled>Start</button>
          </div>
        </Offline>
        </div>
    );
  }
}

export default GuideButtons;
