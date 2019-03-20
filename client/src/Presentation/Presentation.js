import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/Model";
import "./Presentation.css";

const httpOptions = {
  headers: {
    "X-Mashable-Key": "",
    method: "GET",
    /*headers: {
      Authorization: `Bearer ${userAccessToken}`
    }*/
  }
}

class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: this.props.model.getPlaylist(),
      playlistName: this.props.model.getPlaylistName()
    };
  }

  render() {
    let songList = null;

    //let song = fetch("https://api.spotify.com/v1/tracks/4y3OI86AEP6PQoDE6olYhO", httpOptions).then(response => response.json())

    songList = this.state.playlist.map(song => (
      <div className="row songRow" key={song.name}>
        <div className="col-3">
          <img src={song.albumcover} alt='Cover' height="60" width="60"/>
        </div>
        <div className="col-9 playlistText">
          <div id="songName">{song.name}</div>
          <div id="artisName">{song.artist}</div>
        </div>
      </div>
    ));

    return (
      <div className="Presentation">
        <div className="row-sm-12 row-lg-12 py-lg-5 my-lg-5" align="center">
          <div className="blackBorder backgroundForm col-lg-3 col-sm-12">
            <div>
              <h3 align="center" className="my-2 playList">{this.state.playlistName}</h3>
              <form>
                {songList}
              </form>
            </div>
          </div>
          <button id="searchBtn" type="submit" className="btn-lg btn-success form-group">Share</button>
        </div>
      </div>
    );

  }
}

export default Presentation;
