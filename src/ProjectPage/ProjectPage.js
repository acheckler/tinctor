import React, { Component } from "react";
import ApiContext from "../ApiContext";
import "./ProjectPage.css";
import config from "../config";

class ProjectPage extends Component {
  static contextType = ApiContext;

  handleDeleteClick = (e) => {
    e.preventDefault();
    const id = this.props.location.state.projectId;
    console.log(id, "from delete func");

    fetch(`${config.API_ENDPOINT}/projects/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        this.context.deleteProject(id);
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .catch((error) => {
        console.error({ error });
      });
    this.props.history.push("/");
  };

  render() {
    const project = this.props.location.state.project;
    return (
      <div>
        {project.map((p) => (
          <div className="project-page-container">
            <li>{p.id}</li>
            <li>{p.name}</li>
            <li>{p.cannaId}</li>
            <li></li>
            <button
              className="delete-btn"
              type="button"
              onClick={(e) => this.handleDeleteClick(e)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default ProjectPage;

