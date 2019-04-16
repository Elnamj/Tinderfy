import React, {Component} from "react";
import {Link} from "react-router-dom";
import modelInstance from "../data/Model";
import LogoHeader from "../LogoHeader/LogoHeader";
import "./Swipe2.css";
import SwipeCard from "../SwipeCard/SwipeCard";
import Sound from "react-sound";
import Cards, { Card } from 'react-swipe-card';

class Swipe2 extends Component {
    constructor(props) {
        super(props);
        this.cardList = [];
        this.state = {
            state: "LOADING",
            current_song: "",
            playlist: [],
            want_sound: false}

    };



    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    componentDidMount() {
        modelInstance.addObserver(this);
    }

    render() {
        let songCard = null;
        let logo = <LogoHeader model={modelInstance}/>;
        let song_audio = "";
        let heartBtn = (
            <div className="col-2">
                <img className="img-fluid d-block mx-auto icon" src={require("../images/fave.png")}
                     onClick={this.handleSongAdded}/>
            </div>
        );
        let xBtn = (
            <div className="col-2">
                <img className="img-fluid d-block mx-auto icon"
                     src={require("../images/thankunext.png")} onClick={this.handleSongDissed}/>
            </div>
        );
        let createBtn = <Link to="/presentation">
            <button className="btn cool-btn btn1">Done</button>
        </Link>;

        switch (this.state.state) {
            case "LOADING":
                songCard = (
                    <div className="col-8 justify-content-center text-center">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                );
                break;
            case "REG_VIEW":
              const Wrapper = () => {
                return (
              	  <Cards onEnd={console.log('end')} className='master-root'>
                      {this.cardList.map(item =>
                        <Card
                          onSwipeLeft={console.log('swipe left')}
                          onSwipeRight={console.log('swipe right')}>
                          <div>{item}</div>
                        </Card>
                      )}
                    </Cards>
                )
              }
              songCard = <Wrapper/>;

                break;

            case "EMPTY":
                songCard = (
                    <div className="col-8 justify-content-center text-center">
                        <h2>No more songs loaded :( Do you want to load more?</h2>
                    </div>
                );
                break;
        }

        if (this.state.want_sound === true) {
            if (this.state.current_song.preview_url === null) {
                song_audio = (
                    <div className="bg-danger text-white text-center py-2 py-md-3">
                    A preview of the song is not available :(
                    </div>
                )
            }
            else {
                song_audio = (<Sound url={this.state.current_song.preview_url} playStatus={Sound.status.PLAYING} loop={true}/>);
            }
        }

        return (
            <div className="Swipe container">
                {song_audio}
                {logo}
                {songCard}

            </div>
        );
    };


    handleSongAdded(e) {

        modelInstance.addSongToPlaylist(this.state.current_song);
        if (this.state.state !== "EMPTY") {
            this.newSong();
            e.preventDefault();
        }
    }

    handleSongDissed(e) {

        this.newSong();
        e.preventDefault();
    }

    newSong() {
        let next_song = modelInstance.popSearchResults();
        console.log(next_song);
        if (next_song === undefined) {
            this.setState({want_sound: false, state: "EMPTY"});
        } else {
            this.setState({current_song: next_song}, this.componentDidMount);
        }
    }


    update(details) {
        this.setState({want_sound: true, state: "REG_VIEW"});
        modelInstance.getSearchResults().forEach(track => {
          this.cardList.push(<SwipeCard modelInstance={modelInstance} song={track} details={false}/>)
        });
    console.log(this.cardList);

  }
}

export default Swipe2;
