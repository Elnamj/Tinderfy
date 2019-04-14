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
            song_list: [],
            playlist: [],
            mobile: window.innerWidth <= 500,
            start_pos: 0,
        };
        this.handleSongAdded = this.handleSongAdded.bind(this);
        this.handleSongDissed = this.handleSongDissed.bind(this);
        this.goToMobileDetail = this.goToMobileDetail.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
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
                song_audio = (<Sound url={this.state.song_list[0].preview_url} playStatus={Sound.status.PLAYING}/>);
                songCard = (
                    <div className="col-8 justify-content-center text-center-lg" onMouseDown={this.handleDragStart}
                         onMouseUp={this.handleDrop} onTouchStart={this.handleTouchStart}
                         onTouchEnd={this.handleTouchEnd}>
                        <span onClick={this.goToMobileDetail}>
                        <SwipeCard className="dragging" model={modelInstance} song={this.state.song_list[0]}
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
                song_audio = (<Sound url={this.state.song_list[0].preview_url} playStatus={Sound.status.PLAYING}/>);

                songCard = (
                    <div>
                        <div className="col-12 justify-content-center text-center-lg" onMouseDown={this.handleDragStart}
                             onMouseUp={this.handleDrop} onTouchStart={this.handleTouchStart}
                             onTouchEnd={this.handleTouchEnd}>
                            <SwipeCard model={modelInstance} song={this.state.song_list[0]} details={true} id="card-yo"/>
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

        return (
            <div className="Swipe">
                {logo}
                {song_audio}
                <div className="row">
                    {xBtn}
                    {songCard}
                    {heartBtn}
                </div>
                <div className="justify-content-center text-center mt-sm-5 mt-lg-3">
                    {createBtn}
                </div>
            </div>
        );
    };

    handleDragStart(e) {
        this.setState({start_pos: e.nativeEvent.clientX});
        console.log("you're being dragged");
        //e.dataTransfer.setData("text", e.target.id);
    }

    handleDrop(e) {
        let drop_pos = e.nativeEvent.clientX;
        let moved = 0 + this.state.start_pos - drop_pos;
        console.log(moved);
        if (moved < -150) {       // make 2 different if statements, one for mobile (less difference needed) and one for desktop (higher px value)
            this.handleSongAdded(e)
        }
        if (moved > 150) {
            this.handleSongDissed(e)
        }
        this.setState({start_pos: 0});
    }

    handleTouchStart(e) {
        let touchList = e.changedTouches;
        this.setState({start_pos: touchList[0].clientX});
        console.log("you're being dragged");
        //e.dataTransfer.setData("text", e.target.id);
    }

    handleTouchEnd(e) {
        let touchList = e.changedTouches;
        let drop_pos = touchList[0].clientX;
        let moved = 0 + this.state.start_pos - drop_pos;
        console.log(moved);
        if (moved < -150) {       // make 2 different if statements, one for mobile (less difference needed) and one for desktop (higher px value)
            this.handleSongAdded(e)
        }
        if (moved > 150) {
            this.handleSongDissed(e)
        }
        this.setState({start_pos: 0});
    }

    handleSongAdded(e) {
        //document.getElementById(this.state.song_list[0].id).setAttribute('muted', 'true');
        if (this.state.state === "DETAIL_VIEW") {
            this.setState({state: "REG_VIEW"})
        }
        this.setState({state: "LOADING"});
        this.setState({state: "REG_VIEW"});
        modelInstance.addSongToPlaylist(this.state.song_list.shift());
        if (this.state.state !== "EMPTY") {
            this.newSong();
            e.preventDefault();
        }
    }

    handleSongDissed(e) {
        //document.getElementById(this.state.song_list[0].id).setAttribute('muted', 'true');
        if (this.state.state === "DETAIL_VIEW") {
            this.setState({state: "REG_VIEW"})
        }
        this.state.song_list.shift();
        this.newSong();
        e.preventDefault();
    }

    newSong() {
        if (this.state.song_list.length === 0) {
            this.setState({state: "EMPTY"});
        } else {
            this.setState({switch_song: true});
            this.setState({current_song: this.state.song_list[0]}, this.componentDidMount);
        }
    }

    goToMobileDetail() {
        if (this.state.mobile) {
            this.setState({state: "DETAIL_VIEW"}, this.componentDidMount)
        }
    }

    update(details) {
        console.log("update called");
        if (details === 'search_done') {
            console.log("yeah eayh");
            this.setState({song_list: modelInstance.getSearchResults(), state: "REG_VIEW"})
        }
        console.log("yeah eayh");
        this.setState({song_list: modelInstance.getSearchResults(), state: "REG_VIEW"})
    }
}


export default Swipe;
