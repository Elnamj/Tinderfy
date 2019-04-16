import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import App from "../App";
import {Offline,Online} from "react-detect-offline";


class Welcome extends Component {
  render() {
    return (
      <div className="welcome-buttons row justify-content-center text-center">
            {/* <a href="https://tinderfy-backend.herokuapp.com/login" > */}
            <div className="col-6">
                <Link to="/guide">
                <button className="cool-btn btn1 btn" id="btn1">Guide</button>
                </Link>
            </div>
            {/* <a href="https://tinderfy-backend.herokuapp.com/login" > */}
            {/* <a href="http://localhost:8888/login">*/}
          <Online>
            <div className="col-6">
               <a href="https://tinderfy-backend.herokuapp.com/login" >
               <button className="cool-btn btn1 btn" id="btn1">Start</button>
               </a>
            </div>
          </Online>
          <Offline>
            <div className="col-6">
               <button className="cool-btn btn1 btn" disabled id="btn1">Start</button>
            </div>
          </Offline>
        </div>
    );
  }
}

export default Welcome;
