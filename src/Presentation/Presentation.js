import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/Model";
import LogoHeader from "../LogoHeader/LogoHeader";
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
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
  }

  componentDidMount() {
    modelInstance.addObserver(this);
  }

  handlePlayList = () => {
    modelInstance.pushPlaylist();
  }

  removeFromPlaylist(id){
    this.props.model.removeSongFromPlaylist(id);
    this.setState({
      playlist: this.props.model.getPlaylist()
    });
  }

  render() {
    let songList = null;
    let logo = <LogoHeader model={modelInstance}/>;

    //let song = fetch("https://api.spotify.com/v1/tracks/4y3OI86AEP6PQoDE6olYhO", httpOptions).then(response => response.json())

    songList = this.state.playlist.map(song => (
      <div className="row songRow" id={song.id}>
        <div className="col-2">
          <img src={song.album.images[0].url} alt='Cover' height="60" width="60"/>
        </div>
        <div className="col-8 playlistText">
          <div id="songName">{song.name}</div>
          <div id="artisName">{song.artists[0].name}</div>
        </div>
        <div className="col-2">
          <button type='button' className='btn-danger' id='removeButton' onClick={() => {this.removeFromPlaylist(song.id)}}>-</button>
        </div>
      </div>
    ));

    return (
      <div className="Presentation">
        {logo}
        <div align="center">
          <div className="blackBorder backgroundForm col-lg-6 d-none d-md-flex">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <h3 align="center" className="my-2 playList">{this.state.playlistName}</h3>
              </div>
              <form>
                {songList}
              </form>
            </div>
          </div>
          <div className="blackBorderMob backgroundFormMob col-sm-12 d-md-none">
            <div>
              <h3 align="center" className="my-2 playList">{this.state.playlistName}</h3>
              <form>
                {songList}
              </form>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <Link to="/filter">
            <button id="searchBtn" type="submit" className="btn btn-lg btn-success form-group" onClick={this.handlePlayList}>Done</button>
          </Link>
        </div>
      </div>
    );

  }
  update() {
    this.setState({
      playlist: this.props.model.getPlaylist()
    })
  }
}

export default Presentation;
