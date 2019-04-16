import React, {Component} from "react";
import {Link} from "react-router-dom";
import modelInstance from "../data/Model";
import LogoHeader from "../LogoHeader/LogoHeader";
import "./Swipe.css";
import SwipeCard from "../SwipeCard/SwipeCard";
import Sound from "react-sound";
import Draggable, {DraggableCore} from 'react-draggable';
import {Offline, Online} from "react-detect-offline";

class Swipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "LOADING",
            current_song: "",
            playlist: [],
            mobile: window.innerWidth <= 500,
            start_posX: 0,
            start_posY: 0,
            want_sound: false,
        };
        this.handleSongAdded = this.handleSongAdded.bind(this);
        this.handleSongDissed = this.handleSongDissed.bind(this);
        this.goToMobileDetail = this.goToMobileDetail.bind(this);
        this.newSong = this.newSong.bind(this);
        this.update = this.update.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
    };

    componentDidMount() {

        modelInstance.addObserver(this);
    }

    componentWillUnmount () {

    }

    render() {
        let songCard = null;
        let logo = <LogoHeader model={modelInstance}/>;
        let song_audio = "";
        let heartBtn = (
            <div className="col-2 desktopIcons mt-md-5">
                <img className="img-fluid d-block mx-auto" id="heart" src={require("../images/fave-w.png")}
                     onClick={this.handleSongAdded}/>
            </div>
        );
        let xBtn = (
            <div className="col-2 desktopIcons mt-md-5">
                <img className="img-fluid d-block mx-auto" id="dislike"
                     src={require("../images/thankunext-w.png")} onClick={this.handleSongDissed}/>
            </div>
        );
        let createBtn = null;
        switch (this.state.state) {
            case "ERROR":
                heartBtn = null;
                xBtn = null;
                createBtn = <Link to="/filter">
                    <button className="btn cool-btn btn1">Try again</button>
                </Link>;
                songCard = <h2 className="text-white my-5 py-5">No search results 😞</h2>;
                break;
            case "LOADING":
                heartBtn = null;
                xBtn = null;
                createBtn = null;
                songCard = (<div class="spinner-border m-5 spinner text-light"role="status">
                    <span class="sr-only">Loading...</span>
                </div>);
                break;
            case "REG_VIEW":
                createBtn = <Link to="/presentation">
                    <button className="btn cool-btn btn1">Done</button>
                </Link>;
                songCard = (
                    <Draggable position={{x: 0, y: 0}} bounds={{top: -17, bottom: 15}} onStart={this.handleStart} onStop={this.handleStop}
                               defaultPosition={{x: 0, y: 0}} onDrag={this.handleDrag}>
                        <div className="col-8 justify-content-center text-center-lg mt-2 shadow-lg"  onClick={this.goToMobileDetail} onMouseDown={this.handleDragStart}
                             onMouseUp={this.handleDrop} onMouseMove={this.handleDragging} onTouchStart={this.handleTouchStart}
                             onTouchEnd={this.handleTouchEnd} onTouchMove={this.handleTouching}>
                                <SwipeCard className="dragging" model={modelInstance} song={this.state.current_song} details={false}/>
                        </div>
                    </Draggable>
                );
                break;
            case "DETAIL_VIEW":
                logo = null;
                heartBtn = null;
                xBtn = null;
                createBtn = null;
                songCard = (
                    <div className="bg-white">
                        <div className="col-12 justify-content-center">
                            <SwipeCard model={modelInstance} song={this.state.current_song} details={true} id="card-yo"/>
                        </div>
                        <div className="row justify-content-center mt-3 bg-white h-100">
                            <div className="col-2 mobileIcons">
                                <img className="img-fluid d-block mx-auto" id="heart" src={require("../images/thankunext-b.png")}
                                     onClick={this.handleSongAdded}/>
                            </div>
                            <div className="col-2 mobileIcons">
                                <img className="img-fluid d-block mx-auto" id="dislike"
                                     src={require("../images/fave-b.png")} onClick={this.handleSongDissed}/>
                            </div>
                        </div>
                    </div>

                );
                break;
            case "EMPTY":
                heartBtn = null;
                xBtn = null;
                songCard = (
                    <div className="col-8 justify-content-center text-center">
                        <h2 className="text-white my-5">DAMN! You're on fire, and we're out of songs 💔 Click the done button below to check out your playlist! 🔥</h2>
                    </div>
                );
                break;
        }

        if (this.state.want_sound === true) {
            if (this.state.current_song.preview_url === null) {
                song_audio = (
                    <div className="bg-danger text-white text-center py-2 py-md-3">
                    A preview of the song is not available 😢
                    </div>
                )
            }
            else {
                song_audio = (<Sound url={this.state.current_song.preview_url} playStatus={Sound.status.PLAYING} loop={true}/>);
            }
        }

        return (
            <div className="Swipe" id="swipe-top">
                <Offline>
                    <div className="bg-danger text-white text-center py-2 py-md-3">
                        Oops! No internet connection! 🤷‍
                    </div>
                </Offline>
                {song_audio}
                {logo}
                <div className="row my-md-3 my-2 justify-content-center d-none d-md-flex">
                    {xBtn}
                    {songCard}
                    {heartBtn}
                </div>
                <div className="row mb-2 d-md-none justify-content-center">
                    {songCard}
                </div>
                <div className="row py-3 d-md-none justify-content-center">
                    {xBtn}
                    {heartBtn}
                </div>
                <div className="justify-content-center text-center mt-sm-5 mt-lg-3">
                    {createBtn}
                </div>
            </div>
        );
    };

    handleStart(e) {
        if (e.touches !== undefined) {
            this.setState({start_posX: e.touches[0].clientX, start_posY: e.touches[0].clientY})
        }
        else {
            this.setState({start_posX: e.clientX, start_posY: e.clientY})
        }
    }

    handleStop(e) {
        let moved = 0;
        let limit = 150;
        if (e.changedTouches !== undefined) {
            moved = this.state.start_posX - e.changedTouches[0].clientX;
            limit = 100;
        }
        else {
            moved = this.state.start_posX - e.clientX;
        }
        if (moved < -100) {
            this.handleSongAdded(e)
        }
        if (moved > 100) {
            this.handleSongDissed(e)
        }
        this.setState({start_posX: 0, start_posY: 0});
    }

    handleSongAdded(e) {
        if (this.state.state === "DETAIL_VIEW") {
            this.setState({state: "REG_VIEW"})
        }
        modelInstance.addSongToPlaylist(this.state.current_song);
        if (this.state.state !== "EMPTY") {
            this.newSong();
            e.preventDefault();
        }
    }

    handleSongDissed(e) {
        if (this.state.state === "DETAIL_VIEW") {
            this.setState({state: "REG_VIEW"})
        }
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

    goToMobileDetail() {
        if (this.state.mobile) {
            this.setState({state: "DETAIL_VIEW"}, this.componentDidMount)
        }
    }

    update(model, details) {
        console.log(details);
        if (details === "no result") {
            this.setState({state: "ERROR"});
        }
        else {
            this.newSong();
            this.setState({want_sound: true, state: "REG_VIEW"});
            console.log(this.state.state);
        }
    }
}

export default Swipe;
