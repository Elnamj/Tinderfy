import React, {Component} from "react";
import { Link } from "react-router-dom";
import model from "../data/Model";
import "./Filter.css";
import App from "../App"
import LogoHeader from "../LogoHeader/LogoHeader";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          genreList: this.props.model.getGenreTypeList(),
          genre: "",
          artist: "",
          playlistName: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGenre = this.handleGenre.bind(this);
        this.handleArtist = this.handleArtist.bind(this);
        this.handlePlaylistName = this.handlePlaylistName.bind(this);
    }

    showGenreList() {
      return this.state.genreList.map(songType => (
          <option key={songType} value={songType.q_name}>{songType.list_name}</option>
      ));
    }

    handleGenre(e){
      this.setState({genre: e.target.value});
    }

    handleArtist(e){
      this.setState({artist: e.target.value});
    }

    handlePlaylistName(e){
      this.setState({playlistName: e.target.value});
    }

    handleSubmit(){
      model.search(this.state.artist, this.state.genre);
      model.setPlaylistName(document.getElementById('namePlaylist').value);
      console.log(document.getElementById('namePlaylist').value);
    }

    render() {
      model.setAccToken();
      let logo = <LogoHeader model={model}/>;
        return (
            <div className="row-sm-12 row-lg-12 py-lg-2 my-lg-2" align="center">
              {logo}
                <div className="blackBorder backgroundForm col-lg-3 col-sm-12 mt-3">
                    <div>
                        <h3 align="center" className="my-2">Create Playlist</h3>
                        <form onSubmit={this.handleSubmit}>
                          <div className="form-group text-left">
                              <label>Your new playlist name</label>
                              <div className="input-group" >
                                  <input onChange={this.handlePlaylistName} id="namePlaylist" value={this.state.playlistName} type="text" className="form-control" placeholder="e.g. Best Playlist Ever"/>
                              </div>
                          </div>
                          <div className="my-2">
                            <label>What kind of songs do you want?</label>
                          </div>
                            <div className="form-group text-left">
                                <label>Genre</label>
                                <select id="genreSelect" className="form-control" onChange={this.handleGenre}>
                                  <option selected disabled>Click to choose</option>
                                    {this.showGenreList()}
                                </select>
                            </div>
                            <div id="artistSelect" className="form-group text-left">
                                <label>Artist</label>
                                <div className="input-group">
                                    <input onChange={this.handleArtist} value={this.state.artist} type="text" className="form-control" placeholder="e.g. Beyoncé"/>
                                </div>
                            </div>
                            <Link to="/swipe">
                              <button id="searchBtn" type="submit" className="btn btn-success form-group btn1" onClick={this.handleSubmit} disabled={!((this.state.genre !== '' || this.state.artist !== '') && this.state.playlistName !== '')}>Start Matching</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
      }
}


export default Filter;
