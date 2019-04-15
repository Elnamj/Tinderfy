import React, {Component} from "react";
import {Link} from "react-router-dom";
import modelInstance from "../data/Model";
import LogoHeader from "../LogoHeader/LogoHeader";
import "./Swipe.css";
import SwipeCard from "../SwipeCard/SwipeCard";
import Sound from "react-sound";

class Swipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "LOADING",
            current_song: "",
            playlist: [],
            mobile: window.innerWidth <= 500,
            start_pos: 0,
            want_sound: false,
            active: false,
            currentX: "",
            currentY: "",
            initialX: "",
            initialY: "",
            xOffset: 0,
            yOffset: 0
        };
        this.handleSongAdded = this.handleSongAdded.bind(this);
        this.handleSongDissed = this.handleSongDissed.bind(this);
        this.goToMobileDetail = this.goToMobileDetail.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.dragging = this.dragging.bind(this);
        this.touching = this.touching.bind(this);
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
                <img className="h-75 w-75 img-fluid d-block mx-auto" src={require("../images/fave.svg")}
                     onClick={this.handleSongAdded}/>
            </div>
        );
        let xBtn = (
            <div className="col-2">
                <img className="h-75 w-75 img-fluid d-block mx-auto"
                     src={require("../images/thankunext.svg")} onClick={this.handleSongDissed}/>
            </div>
        );
        let createBtn = <Link to="/presentation">
            <button className="btn btn-success greenBtn">Done</button>
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
                songCard = (
                    <div className="col-8 justify-content-center text-center-lg" onMouseDown={this.handleDragStart}
                         onMouseUp={this.handleDrop} onMouseMove={this.dragging} onTouchMove={this.touching} onTouchStart={this.handleTouchStart}
                         onTouchEnd={this.handleTouchEnd} id="card-yo">
                        <span onClick={this.goToMobileDetail}>
                        <SwipeCard className="dragging" model={modelInstance} song={this.state.current_song}
                                   details={false}/>
                        </span>
                    </div>
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
                            <SwipeCard model={modelInstance} song={this.state.current_song} details={true}/>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <img className="h-75 w-75 img-fluid d-block mx-auto"
                                     src={require("../images/thankunext.svg")} onClick={this.handleSongDissed}/>
                            </div>
                            <div className="col-6">
                                <img className="h-75 w-75 img-fluid d-block mx-auto" src={require("../images/fave.svg")}
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
                song_audio = "a preview of the song is not available :(";
            }
            else {
                song_audio = (<Sound url={this.state.current_song.preview_url} playStatus={Sound.status.PLAYING} loop={true}/>);
            }
        }

        return (
            <div className="Swipe">
                {logo}
                {song_audio}
                <div className="row my-3 justify-content-center d-none d-md-flex">
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

    handleDragStart(e) {
        this.setState({start_pos: e.nativeEvent.clientX, initialX: e.nativeEvent.clientX - this.state.xOffset, initialY: e.nativeEvent.clientY - this.state.yOffset, active: true});
    }

    handleDrop(e) {
        let drop_pos = e.nativeEvent.clientX;
        let moved = 0 + this.state.start_pos - drop_pos;
        //this.setTranslate(e.nativeEvent.clientX - this.state.xOffset, e.nativeEvent.clientY - this.state.yOffset, e.target);
        if (moved < -150) {       // make 2 different if statements, one for mobile (less difference needed) and one for desktop (higher px value)
            this.handleSongAdded(e)
        }
        if (moved > 150) {
            this.handleSongDissed(e)
        }
        this.setState({start_pos: 0, active: false});
    }

    handleTouchStart(e) {
        let touchList = e.changedTouches;
        console.log("touch start");
        this.setState({start_pos: touchList[0].clientX, initialX: touchList[0].clientX - this.state.xOffset, initialY: touchList[0].clientY - this.state.yOffset, active: true});
    }

    handleTouchEnd(e) {
        console.log("touch end");
        let touchList = e.changedTouches;
        let drop_pos = touchList[0].clientX;
        let moved = 0 + this.state.start_pos - drop_pos;
        if (moved < -150) {       // make 2 different if statements, one for mobile (less difference needed) and one for desktop (higher px value)
            this.handleSongAdded(e)
        }
        if (moved > 150) {
            this.handleSongDissed(e)
        }
        this.setState({start_pos: 0, active: false});
    }

    touching(e) {
        e.preventDefault();
        console.log("touch drag");
        if (this.state.active) {
            console.log(e.changedTouches.touches[0].clientX - this.state.initialX);
            this.setTranslate(e.touches[0].clientX - this.state.initialX, e.touches[0].clientY - this.state.initialY, document.getElementById("card-yo"));
        }
    }

    dragging(e) {
        if (this.state.active) {

            e.preventDefault();

            if (e.type === "touchmove") {
                console.log("touchyy");
                this.setState({currentX: e.touches[0].clientX - this.state.initialX, currentY: e.touches[0].clientY - this.state.initialY});
            } else {
                this.setState({currentX: e.clientX - this.state.initialX, currentY: e.clientY - this.state.initialY});
            }
            this.setState({xOffset: this.state.currentX, yOffset: this.state.currentY});

            this.setTranslate(this.state.currentX, this.state.currentY, document.getElementById("card-yo"));
        }
    }

    setTranslate(xPos, yPos, el){
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
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
