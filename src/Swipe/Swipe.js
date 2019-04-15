import React, {Component} from "react";
import {Link} from "react-router-dom";
import modelInstance from "../data/Model";
import LogoHeader from "../LogoHeader/LogoHeader";
import "./Swipe.css";
import SwipeCard from "../SwipeCard/SwipeCard";
import Sound from "react-sound";
import Draggable, {DraggableCore} from 'react-draggable';

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
            swiping: false
        };
        this.handleSongAdded = this.handleSongAdded.bind(this);
        this.handleSongDissed = this.handleSongDissed.bind(this);
        this.goToMobileDetail = this.goToMobileDetail.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleDragging = this.handleDragging.bind(this);
        this.handleTouching = this.handleTouching.bind(this);
        this.newSong = this.newSong.bind(this);
        this.update = this.update.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
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
                <img className="img-fluid d-block mx-auto icon" id="heart" src={require("../images/fave.png")}
                     onClick={this.handleSongAdded}/>
            </div>
        );
        let xBtn = (
            <div className="col-2">
                <img className="img-fluid d-block mx-auto icon" id="dislike"
                     src={require("../images/thankunext.png")} onClick={this.handleSongDissed}/>
            </div>
        );
        let createBtn = <Link to="/presentation">
            <button className="btn btn-success greenBtn">Done</button>
        </Link>;

        const dragHandlers = {onStart: this.onStart, onStop: this.onStop}

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
                songCard = (
                    <Draggable bounds={{top: -22, bottom: 22}} onStart={this.handleStart} onStop={this.handleStop}
                               defaultPosition={{x: 0, y: 0}} onDrag={this.handleDrag} lastX={0}>
                        <div className="col-8 justify-content-center text-center-lg"  onClick={this.goToMobileDetail} onMouseDown={this.handleDragStart}
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
                    <div>
                        <div className="col-12 justify-content-center text-center-lg">
                            <SwipeCard model={modelInstance} song={this.state.current_song} details={true} id="card-yo"/>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <img className="img-fluid d-block mx-auto icon"
                                     src={require("../images/thankunext.png")} onClick={this.handleSongDissed}/>
                            </div>
                            <div className="col-6">
                                <img className="img-fluid d-block mx-auto icon" src={require("../images/fave.png")}
                                     onClick={this.handleSongAdded}/>
                            </div>
                        </div>
                    </div>
                );
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
            <div className="Swipe" onTouchStart={e => e.preventDefault()} onTouchMove={e => e.preventDefault()}>
                {song_audio}
                {logo}
                <div className="row my-md-3 my-2 justify-content-center d-none d-md-flex">
                    {xBtn}
                    {songCard}
                    {heartBtn}
                </div>
                <div className="row my-2 d-md-none justify-content-center">
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

    handleStart(e, ui) {
        console.log(e);
        console.log(ui);
        //ui.lastX = 0;
        //ui.lastY = 0;
        console.log(ui);
        ui.node.style.transform = `translate(0px, 0px)`;
        ui.node.style.webkitTransform = `translate(0px, 0px)`;
        if (e.touches !== undefined) {
            this.setState({start_posX: e.touches[0].clientX, start_posY: e.touches[0].clientY})
        }
        else {
            this.setState({start_posX: e.clientX, start_posY: e.clientY})
        }
    }

    handleStop(e, ui) {
        console.log("GOING BACK");
        let moved = "";
        let limit = 150;
        if (e.changedTouches !== undefined) {
            moved = this.state.start_posX - e.changedTouches[0].clientX;
            limit = 100;
        }
        else {
            moved = this.state.start_posX - e.clientX;
        }
        ui.node.style.transform = `translate(0px, 0px)`;
        ui.node.style.webkitTransform = `translate(0px, 0px)`;
        ui.lastX = 0;
        ui.lastY = 0;
        if (moved < -100) {
            this.handleSongAdded(e)
        }
        if (moved > 100) {
            this.handleSongDissed(e)
        }
        this.setState({start_posX: 0, start_posY: 0});

    }

    handleDragStart(e) {
        this.setState({start_posX: e.nativeEvent.clientX, start_posY: e.nativeEvent.clientY});
    }

    handleDragging(e) {
        let move_posX = e.nativeEvent.clientX;
        let movedX = 0 + this.state.start_posX - move_posX;
        if (movedX < -50) {       // make 2 different if statements, one for mobile (less difference needed) and one for desktop (higher px value)
            this.setState({swiping: true}, this.componentDidMount());
        }
        else if (movedX > 50){
            this.setState({swiping: true}, this.componentDidMount());
        }
        else {
            this.setState({swiping: false})
        }
    }

    handleDrop(e) {
        let drop_posX = e.nativeEvent.clientX;
        let movedX = 0 + this.state.start_posX - drop_posX;
        if (movedX < -150) {       // make 2 different if statements, one for mobile (less difference needed) and one for desktop (higher px value)
            this.handleSongAdded(e)
        }
        if (movedX > 150) {
            this.handleSongDissed(e)
        }
        this.setState({start_posX: 0, start_posY: 0});
        this.setState({swiping: false});
        document.getElementById("heart").classList.remove("heart_shadowed");
        document.getElementById("dislike").classList.remove("dislike_shadowed")
    }

    handleTouchStart(e) {
        let touchList = e.changedTouches;
        this.setState({start_posX: touchList[0].clientX, start_posY: touchList[0].clientY});
    }

    handleTouching(e) {
        let move_posX = e.touches[0].clientX;
        let movedX = 0 + this.state.start_posX - move_posX;
        /*e.target.style.opacity = movedX/100;*/
        if (movedX < -50) {       // make 2 different if statements, one for mobile (less difference needed) and one for desktop (higher px value)
            this.setState({swiping: true}, this.componentDidMount);
        }
        else if (movedX > 50){
            this.setState({swiping: true}, this.componentDidMount);
        }
            this.setState({swiping: false});
        }

    handleTouchEnd(e) {
        let touchList = e.changedTouches;
        let drop_posX = touchList[0].clientX;
        let movedX = 0 + this.state.start_posX - drop_posX;
        if (movedX < -150) {       // make 2 different if statements, one for mobile (less difference needed) and one for desktop (higher px value)
            this.handleSongAdded(e)
        }
        if (movedX > 150) {
            this.handleSongDissed(e)
        }
        this.setState({start_posX: 0, start_posY: 0}, this.componentDidMount());
        this.setState({swiping: false}, this.componentDidMount());
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

    update(details) {
        this.newSong();
        this.setState({want_sound: true, state: "REG_VIEW"})
    }
}

export default Swipe;
