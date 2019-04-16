import React, {Component} from "react";
import Slideshow from "../Slideshow/Slideshow";
import GuideButtons from "../GuideButtons/GuideButtons";
import "./Guide.css";
import LogoHeader from "../LogoHeader/LogoHeader";
import model from "../data/Model";
import {Offline,Online} from "react-detect-offline";


class Guide extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let logo = <LogoHeader model={model}/>;

        return (
            // <div id="concert">
            <div className="FirstPage container-fluid py-md-5 py-xs-2">
              <Offline>
                <div className="bg-danger text-white text-center py-2 py-md-3">
                  No internet connection!
                </div>
              </Offline>
                <div className="row mx-1 py-5">
                    <div className="col-xs-12 col-md-6 pt-md-5 px-3">
                        <div className="row mt-5 px-1">
                            <h1 className="display-1 d-none d-md-block text-white">Guide</h1>
                            <h1 className="display-4 d-md-none text-white">Guide</h1>
                        </div>
                        <div className="row py-3 py-md-4 px-1 text-white">
                            <p> 1. Log in with your Spotify account <br/>
                                2. Fill in your new playlist's name, desired genre and/or artist <br/>
                                3. Start swiping! Swipe to the right to add the track to your new playlist, <br/>
                                or swipe to the left to dismiss it <br/>
                                4. When you feel happy about your playlist, click "DONE" <br/>
                                5. Check out the final result and click "SAVE" <br/>
                            </p>
                        </div>
                        <div className="row mt-5 px-3">
                            <GuideButtons model={this.props.model}/>
                        </div>
                    </div>
                    <div className="col-6 col-xs-12 py-md-5 d-none d-md-block" id="slideshow">
                        <Slideshow model={this.props.model}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Guide;
