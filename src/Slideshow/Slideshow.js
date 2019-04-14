import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Slideshow.css";

class Slideshow extends Component {
  render() {
    return (
      <div className="Slideshow">
            <section className="slides">
              <div className="content">
                <div className="carrousel">
                <figure className="shadow"><img src={require("./Images/ariana.png")} alt="ariana" height="150" width="150"></img></figure>
                <figure className="shadow"><img src={require("./Images/beyonce.jpg")} alt="beyonce" height="150" width="150"></img></figure>
                <figure className="shadow"><img src={require("./Images/coldplay.jpg")} alt="coldplay" height="150" width="150"></img></figure>
                <figure className="shadow"><img src={require("./Images/justin.jpg")} alt="justin" height="150" width="150"></img></figure>
                <figure className="shadow"><img src={require("./Images/khalid.jpg")} alt="khalid" height="150" width="150"></img></figure>
                <figure className="shadow"><img src={require("./Images/macklemore.jpeg")}  alt="macklemore" height="150" width="150"></img></figure>
                <figure className="shadow"><img src={require("./Images/robyn.jpg")} alt="robyn" height="150" width="150"></img></figure>
                <figure className="shadow"><img src={require("./Images/taylor.jpg")} alt="taylor" height="150" width="150"></img></figure>
                <figure className="shadow"><img src={require("./Images/tove.jpg")} alt="tove" height="150" width="150"></img></figure>
                </div>
              </div>
            </section>
        </div>

    );
  }
}

export default Slideshow;
