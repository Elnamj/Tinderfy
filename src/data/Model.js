import ObservableModel from "./ObservableModel";
import React, {Component} from "react";
import {Router, Link} from 'react-router';

class Model extends ObservableModel {
    constructor(props) {
        super(props);
        this._genreList = ["Pop", "hip%20hop", "Jazz", "R&B", "Electronic/Dance", "Rock", "Indie", "Metal", "Country", "Soul", "Classical"];
        this._searchResults = "";
        this._playlist = [];
        this._playlistName = "";
        this.httpOptions = {
            headers: {'Authorization': 'Bearer '}
        };
        this.setAccToken = this.setAccToken.bind(this);
    }

    getGenreTypeList() {
        return this._genreList;
    }

    getPlaylist() {
        return this._playlist;
    }

    getPlaylistName() {
        return this._playlistName;
    }

    getSearchResults() {
        console.log("getting search results...");
        return this._searchResults;
    }

    setPlaylistName(name) {
        this._playlistName = name;
    }

    addSongToPlaylist(song) {
        this._playlist.push(song);
        console.log("the song has been added!");
        console.log(this._playlist);
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
            headers: {'Authorization': 'Bearer ' + this.getHashParams().access_token}
        };
    }


    getArtistId(name) {
        const url = `https://api.spotify.com/v1/search?q=${name}&type=artist&limit=1`;
        return fetch(url, this.httpOptions).then(response => response.json())
            .catch(this.handleError);
    }

    search(artistName, genre) {
        var url = `https://api.spotify.com/v1/search?type=track&market=se&q=`;
        if (genre !== "") {
            url += `genre:%22${genre}%22%20`;
        }
        if (artistName !== "") {
            url += `artist:${artistName}`;
        }
        /*
        if (artistName !== null){
            this.getArtistId(artistName).then(artist_obj => {
              console.log(artist_obj.artists.items[0])
              //const url = `https://api.spotify.com/v1/recommendations?seed_artist=${artist_obj.artists.items[0].id}&seed_genres=${genre}`;var url =`https://api.spotify.com/v1/search?genre:${genre}%20artist:${artistName}&type=track`;
              this._searchResults= fetch(url, this.httpOptions).then(response => response.json())
              .catch(this.handleError).then(result => {
                this._searchResult = result
                console.log(result)
              });
            });
        }
        else {
        */
        var artistID = "";
        //const url = `https://api.spotify.com/v1/recommendations?seed_artist=${artistID}&seed_genres=${genre}`;
        //var url = `https://api.spotify.com/v1/search?q=genre:%22${genre}%22%20artist:${artistName}&type=track&market=se`;
        console.log(url);
        fetch(url, this.httpOptions).then(response => response.json())
            .catch(this.handleError).then(result => {
            this._searchResults = result.tracks.items;
            console.log(this._searchResults);
            console.log("done")
        });

    }

    getTrackItem(id) {
        var song_url = "https://api.spotify.com/v1/tracks/0GjEhVFGZW8afUYGChu3Rr";
        fetch(song_url, this.httpOptions).then(response => response.json())
            .catch(this.handleError).then(result => {
            console.log(result);
            return result;
        });
    }

}


const model = new Model();
export default model;
