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
                <figure className="shadow"><img src="https://static.stereogum.com/uploads/2019/01/Ariana-Grande-_7-rings_-Artwork-1547761906-640x640.jpg" alt="ariana" height="150" width="150"></img></figure>
                <figure className="shadow"><img src="https://static.hiphopdx.com/2011/06/beyonce4.jpg" alt="beyonce" height="150" width="150"></img></figure>
                <figure className="shadow"><img src="https://www.hypergallery.com/media/catalog/product/cache/1/small_image/420x/17f82f742ffe127f42dca9de82fb58b1/c/o/coldplay_floweroflife_albumcoverartprint_hanging_1.jpg" alt="coldplay" height="150" width="150"></img></figure>
                <figure className="shadow"><img src="https://streamd.hitparade.ch/cdimages/justin_timberlake-man_of_the_woods_s.jpg" alt="justin" height="150" width="150"></img></figure>
                <figure className="shadow"><img src="https://t2.genius.com/unsafe/523x0/https%3A%2F%2Fimages.genius.com%2F2640f833069973cd0823c1f709b6353a.1000x1000x1.jpg" alt="khalid" height="150" width="150"></img></figure>
                <figure className="shadow"><img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Macklemore_Gemini.png" alt="macklemore" height="150" width="150"></img></figure>
                <figure className="shadow"><img src="http://dis.resized.images.s3.amazonaws.com/540x540/105902.jpeg" alt="robyn" height="150" width="150"></img></figure>
                <figure className="shadow"><img src="https://images-na.ssl-images-amazon.com/images/I/91Da6C9HuUL._SL1500_.jpg" alt="taylor" height="150" width="150"></img></figure>
                <figure className="shadow"><img src="https://media.pitchfork.com/photos/5ae0a2be23bb310b1c0efa29/1:1/w_320/Tove%20Styrke_Sway.jpg" alt="tove" height="150" width="150"></img></figure>
                </div>
              </div>
            </section>
            <div className="row btn-position">
            <a href={process.env.NODE_ENV === "production" ? "https://tinderfy-backend.herokuapp.com/callback" : 'http://localhost:8888/login' >
              <button className="btn btn-success">Login to Spotify </button>
            </a>
            </div>
        </div>

    );
  }
}

export default Slideshow;
