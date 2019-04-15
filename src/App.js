import React, { Component } from "react";
import { Route } from "react-router-dom";
import model from "./data/Model";
import "./App.css";
import Filter from "./Filter/Filter";
import Presentation from "./Presentation/Presentation";
import Swipe from "./Swipe/Swipe";
import LogoHeader from "./LogoHeader/LogoHeader";
import FirstPage from "./FirstPage/FirstPage";
import Testing from "./testing/testing";
import Guide from "./Guide/Guide";

class App extends Component {
  constructor() {
    super();

    this.state = {
      title: "Tinderfy",
    }
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">

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
          <Route
            path="/testing"
            render={() => <Testing model={model} />}
          />
          <Route
              path="/guide"
              render={() => <Guide model={model} />}
          />
        </header>
      </div>
    );
  }
}

export default App;
