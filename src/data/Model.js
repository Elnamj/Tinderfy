import ObservableModel from "./ObservableModel";
import React, { Component } from "react";
import { Router, Link } from 'react-router';

class Model extends ObservableModel {
    constructor(props) {
        super(props);
        this._genreList = ["Pop", "Hiphop", "Jazz", "R&B", "Electronic/Dance", "Rock", "Indie", "Metal", "Country", "Soul", "Klassiskt"];
        this._searchResult = "";
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

    setPlaylistName(name){
      this._playlistName = name;
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


    getArtistId(name){
      const url = `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=1`;
      return fetch(url, this.httpOptions).then(response => response.json())
      .catch(this.handleError);
    }

    search(artistName, genre) {
      if (genre === null){
        genre = "";
      }
      if (artistName !== null){
          this.getArtistId(artistName).then(artist_obj => {
            console.log(artist_obj.artists.items[0])
            const url = `https://api.spotify.com/v1/recommendations?seed_artist=${artist_obj.artists.items[0].id}&seed_genres=${genre}`;
            this._searchResult = fetch(url, this.httpOptions).then(response => response.json())
            .catch(this.handleError).then(result => {
              this._searchResult = result
              console.log(result)
            });
          });
      }
      else {
        var artistID = "";
        const url = `https://api.spotify.com/v1/recommendations?seed_artist=${artistID}&seed_genres=${genre}`;
        fetch(url, this.httpOptions).then(response => response.json())
        .catch(this.handleError).then(result => {
          this._searchResult = result
          console.log(result)
        });
      }
    }

}


const model = new Model();
export default model;
