import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Filter.css";

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          genreType: this.props.model.getGenreTypeList(),
          moodType: this.props.model.getMoodTypeList()
        };
    }

    genreTypeSelect() {
      return this.state.genreType.map(songType => (
          <option key={songType} value={songType.toLowerCase()}>{songType}</option>
      ));
    }

    moodTypeSelect() {
      return this.state.moodType.map(songType => (
          <option key={songType} value={songType.toLowerCase()}>{songType}</option>
      ));
    }

    render() {
        return (
            <div className="row-sm-12 row-lg-12 py-lg-5 my-lg-5" align="center">
                <div className="blackBorder backgroundForm col-lg-3 col-sm-12">
                    <div>
                        <h3 align="center" className="my-2">Create Playlist</h3>
                        <form>
                            <div className="form-group text-left">
                                <label>Genre</label>
                                <select className="form-control">
                                    {this.genreTypeSelect()}
                                </select>
                            </div>
                            <div className="form-group text-left">
                                <label>Mood</label>
                                <select className="form-control">
                                    {this.moodTypeSelect()}
                                </select>
                            </div>
                            <div className="form-group text-left">
                                <label>Playlist name</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Playlist name"/>
                                </div>
                            </div>
                            <div className="form-group text-left">
                                <label>Search phrase</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search phrase"/>
                                </div>
                            </div>
                            <Link to="/swipe">
                              <button id="searchBtn" type="submit" className="btn btn-success form-group">Start Matching</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
      }
}


export default Filter;