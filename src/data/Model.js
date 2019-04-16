import ObservableModel from "./ObservableModel";
import React, {Component} from "react";
import {Router, Link} from 'react-router';

class Model extends ObservableModel {
    constructor(props) {
        super(props);
        this._genreList = [{list_name: "Pop", q_name: "pop"}, {
            list_name: "Hip Hop",
            q_name: "hip hop"
        }, {list_name: "Jazz", q_name: "jazz"}, {list_name: "Electronic/Dance", q_name: "edm"},
            {list_name: "Rock", q_name: "rock"}, {list_name: "Indie", q_name: "indie"}, {
                list_name: "Metal",
                q_name: "metal"
            }, {list_name: "Country", q_name: "country"}, {list_name: "Soul", q_name: "soul"},
            {list_name: "Classical", q_name: "classical"}, {
                list_name: "Happy",
                q_name: "happy"
            }, {list_name: "Romantic", q_name: "romantic"}];
        this._searchResults = "";
        this._playlist = [];
        this._playlistName = "";
        this.httpOptions = {
            headers: {'Authorization': 'Bearer '}
        };
        this.httpOptionsPost = {
            headers: {'Authorization': 'Bearer ', 'Content-Type': 'application/json'}
        };
        this.setAccToken = this.setAccToken.bind(this);
        this.removeSongFromPlaylist = this.removeSongFromPlaylist.bind(this);
    }

    getGenreTypeList() {
        return this._genreList;
    }

    getPlaylist() {
        return this._playlist;
    }

    getSearchResults() {
        return this._searchResults;
    }

    getPlaylistName() {
        return this._playlistName;
    }

    setPlaylistName(name) {
        this._playlistName = name;
    }

    addSongToPlaylist(song) {
        this._playlist.push(song);
        console.log("the song has been added!");
        console.log(this._playlist);
    }

    popSearchResults() {
        return this._searchResults.shift();
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
        if (this.getHashParams().access_token) {
            let accTok = this.getHashParams().access_token;
            this.httpOptions = {
                headers: {'Authorization': 'Bearer ' + accTok}
            };
            this.httpOptionsPost = {
                headers: {'Authorization': 'Bearer ' + accTok, 'Content-Type': 'application/json'}
            };
        }
    }

    search(artistName, genre) {
        var url = `https://api.spotify.com/v1/search?type=track&market=se&limit=50&q=`;
        if (genre !== "") {
            url += `genre:%22${genre}%22%20`;
        }
        if (artistName !== "") {
            url += `artist:${artistName}`;
        }
        fetch(url, this.httpOptions)
            .then(response => response.json())
            .catch(this.handleError).then(result => {
                if (result !== undefined) {
                    var songurl = "https://api.spotify.com/v1/tracks/?ids=";
                    result.tracks.items.forEach(function (track) {
                        var track_id = track.id;
                        songurl += track_id + ",";
                    });
                    songurl = songurl.substring(0, songurl.length - 1);
                    fetch(songurl, this.httpOptions)
                        .then(response => response.json())
                        .catch(this.handleError).then(new_result => {
                        if (new_result.tracks !== undefined) {
                            this._searchResults = new_result.tracks;
                            console.log(this._searchResults);
                            this.notifyObservers("search_done");
                        }
                        else {
                            this.notifyObservers("no result")
                        }
                    });
                }
                else {
                    this.notifyObservers("no result")
                }
            });
    }

    pushPlaylist = () => {
        var url1 = `https://api.spotify.com/v1/me`;
        fetch(url1, this.httpOptions)
            .then(response => response.json())
            .catch(this.handleError)
            .then(result => {
                var url = `https://api.spotify.com/v1/users/${result.id}/playlists`;
                const body = JSON.stringify({
                    'name': this._playlistName,
                    'description': "Created with Tinderfy 🔥"
                });

                return fetch(url, {method: "POST", headers: this.httpOptionsPost.headers, body})
            })
            .then(response => response.json())
            .catch(this.handleError)
            .then(result => {
                let tracks = [];
                var playlistId = result.id;
                var urlTracks = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
                this._playlist.map(song => {
                    tracks.push(song.uri);
                });
                this._playlist = [];
                const body = JSON.stringify({
                    'uris': tracks
                });
                fetch(urlTracks, {method: "POST", headers: this.httpOptionsPost.headers, body: body})
                    .then(response => response.json())
                    .catch(this.handleError)
            });
    };
    removeSongFromPlaylist(id) {
        this._playlist = this._playlist.filter(song => song.id !== id);
        this.notifyObservers("removeSong");
    }

    handleError(error) {
        console.log(error);
        if (error.json) {
            error.json().then(error => {
                console.error("API Error:", error.message || error);
            });
        } else {
            console.error("API Error:", error.message || error);
        }
    }

    emptyPlaylist() {
        this._playlist = [];
    }

}


const model = new Model();
export default model;
