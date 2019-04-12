import ObservableModel from "./ObservableModel";
import React, { Component } from "react";
import { Router, Link } from 'react-router';

class Model extends ObservableModel {
    constructor(props) {
        super(props);
        this._genreList = ["Pop", "Hiphop", "Jazz", "R&B", "Electronic/Dance", "Rock", "Indie", "Metal", "Country", "Soul", "Klassiskt"];
        this._searchResult = [];
        this._playlist = [];
        this._playlistName = "";
        this.httpOptions = {
            headers: { 'Authorization': 'Bearer '}
          };
        this.setAccToken = this.setAccToken.bind(this);
      }

    getGenreTypeList() {
        return this._genreList;
    }

    getPlaylist() {
        return this._playlist;
    }

    getPlaylistName(){
      return this._playlistName;
    }

    getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);

      e = r.exec(q)
      while (e) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
         e = r.exec(q);

      }
      return hashParams;
    }

    setAccToken() {
      this.httpOptions = {
        headers: { 'Authorization': 'Bearer ' + this.getHashParams().access_token}};
    }


    getArtistId(){
      console.log(this.token);
      const url = "https://api.spotify.com/v1/search?q=Madonna&type=track";
      return fetch(url, this.httpOptions).then(response => response.json())
      .catch(this.handleError);

    }

    search(q) {
          const url = "https://api.spotify.com/v1/search?q=Madonna&type=track";
          return fetch(url, this.httpOptions).then(response => response.json())
          .catch(this.handleError);
    }

}


const model = new Model();
export default model;
