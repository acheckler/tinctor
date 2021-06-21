import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dummyStore from "../dummy-store";
import AddProject from "../AddProject/AddProject";
import ApiContext from "../ApiContext";
import LandingPage from "../Home/LandingPage";
import ProjectPage from "../ProjectPage/ProjectPage";
import "./App.css"


class App extends Component {
  state = {
    cannabinoids: [],
    carriers: [],
    flavors: [],
    bottles: [],
    droppers: [],
  };
  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummyStore), 600);
  }

 calculateCost(tincVolume, cannaConcentration) {
    const cannaCost = (this.state.cannaId * cannaConcentration) / 1000;
    const carrierCost = tincVolume * this.state.carrierId;
    const packagingCost = this.state.bottleId + this.state.dropperId;
    const totalCost = cannaCost + carrierCost + packagingCost;
    console.log(totalCost, "hiiiii");
  }

  render() {
    const value = {
      cannabinoids: this.state.cannabinoids,
      carriers: this.state.carriers,
      flavors: this.state.flavors,
      bottles: this.state.bottles,
      droppers: this.state.droppers,
      projects: this.state.projects,
      calculateCost: this.calculateCost
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App" >
          <header className="App_header">
            
            <h1 className="App_header_box">
              <Link to="/" className="header_link">Tinctor</Link> <FontAwesomeIcon icon="calculator" />
            </h1>
          </header>
          <div className="nav-buttons">
            <Switch>
            <Route exact path ="/" component={LandingPage} />
            <Route path="/newProject" component={AddProject} />
            <Route path="/projects/:projectName" component={ProjectPage} />
            </Switch>
            {/* {this.renderMainRoutes()} */}
            {/* <Link to="/newProject">
              <button className="new-p-button">New Project</button>
            </Link> */}
            {/* <AddProject /> */}
          </div>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
