import React, { Component } from "react";
import { Route } from "react-router-dom";
import model from "./data/Model";
import "./App.css";
import Filter from "./Filter/Filter";
import Presentation from "./Presentation/Presentation";
import Swipe from "./Swipe/Swipe";
import LogoHeader from "./LogoHeader/LogoHeader";
import FirstPage from "./FirstPage/FirstPage";

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    /*if (token) {
      spotifyApi.setAccessToken(token);
    }
    */
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      title: "Tinderfy",
      httpOptions: {
        headers: { 'Authorization': 'Bearer ' + token}
      }
    }
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

  search(q) {
      const url = "https://api.spotify.com/v1/search?q=Beyonce&type=track";
      return fetch(url, this.state.httpOptions).then(response => response.json())
      .catch(this.handleError);
  }

  render() {
    this.search().then(track => {
      console.log(track);
    });

    return (
      <div className="App">
        <header className="App-header">
          {/*<a href='http://localhost:8888' >
            <button>Login to Spotify </button>
          </a>*/}
          <div>
          </div>
          { this.state.loggedIn &&
          <button onClick={() => this.search()}>
            Check genre
          </button>
          }


          {/* We rended diffrent component based on the path */}
          {/* <Route exact path="/" component={Welcome} /> */}
          <Route
            path="/filter"
            render={() => <Filter model={model} />}
          />
          <Route
            path="/presentation"
            render={() => <Presentation model={model} />}
          />
          <Route
              path="/swipe"
              render={() => <Swipe model={model} />}
          />
          <Route exact path="/" component={FirstPage} />
          <Route
            path="/FirstPage"
            render={() => <FirstPage model={model} />}
          />
        </header>
      </div>
    );
  }
}

export default App;
