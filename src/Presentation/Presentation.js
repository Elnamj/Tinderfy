import React, { Component } from "react";
import { Link } from "react-router-dom";
import modelInstance from "../data/Model";
import LogoHeader from "../LogoHeader/LogoHeader";
import "./Presentation.css";
import {Offline,Online} from "react-detect-offline";

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

  cancelPlayList = () => {
    modelInstance.emptyPlaylist();
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
        <Offline>
          <div className="bg-danger text-white text-center py-2 py-md-3">
            No internet connection!
          </div>
        </Offline>
        <div className="d-md-none">
          {logo}
        </div>
        <div className="row">
          <div className="col-lg-1">
          </div>
          <div className="blackBorder backgroundForm col-lg-6 d-none d-md-flex" align="center">
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
          <div className="col-lg-5 col-sm-12 justify-content-center">
            <div className="d-none d-md-flex justify-content-center">
              {logo}
            </div>
            <Online>
              <div className="row justify-content-center">
                <Link to="/filter">
                  <button id="searchBtn" type="submit" className="btn btn-lg cool-btn btn1 form-group" onClick={this.handlePlayList} disabled={(this.state.playlist.length === 0)}>Save & Start Over</button>
                </Link>
              </div>
            </Online>
            <Offline>
              <div className="row justify-content-center">
                <Link to="/filter">
                  <button id="searchBtn" type="submit" className="btn btn-lg cool-btn btn1 form-group" disabled>Save & Start Over</button>
                </Link>
              </div>
            </Offline>
            <div className="row justify-content-center">
              <Link to="/filter">
                <button id="searchBtn2" type="submit" className="btn btn-lg cool-btn btn1 form-group" onClick={this.cancelPlayList}>Cancel</button>
              </Link>
            </div>
          </div>
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
