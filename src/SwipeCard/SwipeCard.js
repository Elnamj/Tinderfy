import React, {Component} from "react";
import {Link} from "react-router-dom";
import modelInstance from "../data/Model";
import "./SwipeCard.css";
import Sound from "react-sound";

var preview = "https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86";

class SwipeCard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let song_details = null;
        let featuring_artists = null;

        switch (this.props.details) {
            case true:
                song_details = (
                    <div>
                        <div className="row border-bottom p-2">
                            <h2 className="col-12">{this.props.song.name}</h2>
                            <h3 className="col-12 font-italic text-secondary"> {this.props.song.artists[0].name}</h3>
                        </div>
                        <div className="my-4">
                            <h5 className="m-2">Album: {this.props.song.album.name}</h5>
                            <h5 className="m-2">Released: {this.props.song.album.release_date}</h5>
                        </div>
                    </div>
                );
                break;
            case false:
                song_details = (
                    <div>
                        <h3 className="col-12 text-truncate px-1 my-1">{this.props.song.name}</h3>
                        <h4 className="col-12 font-italic text-secondary text-truncate px-1"> {this.props.song.artists[0].name}</h4>
                    </div>
                );
                break;
        }
        
        if (this.props.song.artists.length > 1) {
            featuring_artists = this.props.song.artists.map(artist => (
                <h5 className="my-2 text d-inline">{artist.name}, </h5>
            ));
            featuring_artists.splice(0,1, <h5 className="my-2 d-inline">Featuring: </h5>);
            console.log(featuring_artists);
        }
        
        console.log(this.props.song);
        return (
            <div className="row swipe-card justify-content-center shadow-lg py-2 bg-white">
                <div className="col-lg-6 col-md-6 col-xs-12">
                    <img className="img-fluid no-drag" src={this.props.song.album.images[0].url}/>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 card-text mt-2">
                    {song_details}
                    <div className="my-4 d-none d-md-inline">
                        <h5 className="m-2">Album: {this.props.song.album.name}</h5>
                        <h5 className="m-2">Released: {this.props.song.album.release_date}</h5>
                        <div className="mx-2">{featuring_artists}</div>
                    </div>
                </div>

            </div>

        );

    }
}

export default SwipeCard;
