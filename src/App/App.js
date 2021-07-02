import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProject from "../AddProject/AddProject";
import ApiContext from "../ApiContext";
import LandingPage from "../Home/LandingPage";
import ProjectPage from "../ProjectPage/ProjectPage";
import "./App.css";
import config from "../config";
import PropTypes from 'prop-types'


class App extends Component {
  state = {
    projects: [],
    projectsDisplay: [],
    ingredients: [],
    packaging: [],
  };
  static propTypes = {
    history: PropTypes.object,
  };

  //function for componentDidMount
  fetchData = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/projects`),
      fetch(`${config.API_ENDPOINT}/projects/display`),
      fetch(`${config.API_ENDPOINT}/ingredients`),
      fetch(`${config.API_ENDPOINT}/packaging`),
    ])
      .then(
        ([projectsRes, projectsDisplayRes, ingredientsRes, packagingRes]) => {
          if (!projectsRes.ok)
            return projectsRes.json().then((e) => Promise.reject(e));
          if (!projectsDisplayRes.ok)
            return projectsDisplayRes.json().then((e) => Promise.reject(e));
          if (!ingredientsRes.ok)
            return ingredientsRes.json().then((e) => Promise.reject(e));
          if (!packagingRes.ok)
            return packagingRes.json().then((e) => Promise.reject(e));

          return Promise.all([
            projectsRes.json(),
            projectsDisplayRes.json(),
            ingredientsRes.json(),
            packagingRes.json(),
          ]);
        }
      )
      .then(([projects, projectsDisplay, ingredients, packaging]) => {
        this.setState({ projects, projectsDisplay, ingredients, packaging });
      })
      .catch((error) => {
        console.error({ error });
      });
  };
  componentDidMount() {
    this.fetchData();
  }


  //POST function for adding projects
  handleAddProject = (formData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        t_volume: formData.tVol,
        canna_id: formData.canna,
        canna_concentration: formData.cCon,
        carrier_id: formData.carr,
        carrier_percentage: formData.carrP,
        flavor_id: formData.flav,
        bottle_id: formData.bottle,
        dropper_id: formData.dropper,
        total_cpu: formData.cpu
      }),
    };
    fetch(`${config.API_ENDPOINT}/projects`, options)
         .then((projectsRes) => {
        if (!projectsRes.ok) {
          throw new Error("error");
        }
        return projectsRes.json();
      })
      .then(() => {this.fetchData()})
      .catch((error) => console.log(error));
  };


  //set state & fetchData after delete function runs in ProjectPage component
  handleDeleteProject = (id) => {
    this.setState({
      projects: this.state.projects.filter((project) => project.id !== id),
    })
    this.fetchData()
  }


  render() {
    const value = {
      projects: this.state.projects,
      projectsDisplay: this.state.projectsDisplay,
      ingredients: this.state.ingredients,
      packaging: this.state.packaging,
      addProject: this.handleAddProject,
      deleteProject: this.handleDeleteProject
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <header className="App_header">
            <h1 className="App_header_box">
              <Link to="/" className="header_link">
                Tinctor
              </Link>{" "}
              <FontAwesomeIcon icon="calculator" />
            </h1>
          </header>
          <div className="nav-buttons">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/newProject" component={AddProject} />
              <Route path="/projects/:projectName" component={ProjectPage} />
            </Switch>
          </div>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
