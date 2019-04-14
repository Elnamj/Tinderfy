import ObservableModel from "./ObservableModel";
import React, {Component} from "react";
import {Router, Link} from 'react-router';

class Model extends ObservableModel {
    constructor(props) {
        super(props);
        this._genreList = [{list_name: "Pop", q_name: "pop"}, {list_name: "Hip Hop", q_name: "hip%20hop"}, {list_name: "Jazz", q_name: "jazz"}, {list_name: "Electronic/Dance", q_name: "electronic/dance"},
                           {list_name: "Rock", q_name: "rock"}, {list_name: "Indie", q_name: "indie"}, {list_name: "Metal", q_name: "metal"}, {list_name: "Country", q_name: "country"}, {list_name: "Soul", q_name: "soul"}, {list_name: "Classical", q_name: "classical"}];
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

    search(artistName, genre) {
        var url = `https://api.spotify.com/v1/search?type=track&market=se&q=`;
        if (genre !== "") {
            url += `genre:%22${genre}%22%20`;
        }
        if (artistName !== "") {
            url += `artist:${artistName}`;
        }
        fetch(url, this.httpOptions).then(response => response.json())
            .catch(this.handleError).then(result => {
                var songurl = "https://api.spotify.com/v1/tracks/?ids=";
                console.log(result);
                result.tracks.items.forEach(function (track) {
                    var track_id = track.id;
                    songurl += track_id + ",";
                });
            songurl = songurl.substring(0, songurl.length - 1);
            fetch(songurl, this.httpOptions).then(response => response.json())
                .catch(this.handleError).then(new_result => {
                    this._searchResults = new_result;
                    console.log(new_result)
            });
        });
    }

}


const model = new Model();
export default model;
