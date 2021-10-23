import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Marks from "./components/marks";
import NotFound from "./components/notFound";
import "./App.css";
import About from "./components/about";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container-fluid">
          <Switch>
            <Route path="/marks" component={Marks} />
            <Route path="/about" component={About} />
            <Route path="/notFound" component={NotFound} />
            <Redirect path="/" exact to="marks" />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
