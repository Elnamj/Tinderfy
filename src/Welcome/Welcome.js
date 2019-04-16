import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import App from "../App";


class Welcome extends Component {
  render() {
    return (
      <div className="welcome-buttons row">
            {/* <a href="https://tinderfy-backend.herokuapp.com/login" > */}
            <div className="col-6">
                <Link to="/guide">
                <button className="cool-btn btn1 btn" id="btn1">Guide</button>
                </Link>
            </div>
            {/* <a href="https://tinderfy-backend.herokuapp.com/login" > */}
            {/* <a href="http://localhost:8888/login">*/}
          <div className="col-6">
             <a href="http://localhost:8888/login" >
             <button className="cool-btn btn1 btn" id="btn2">Start</button>
             </a>
          </div>
        </div>
    );
  }
}

export default Welcome;
