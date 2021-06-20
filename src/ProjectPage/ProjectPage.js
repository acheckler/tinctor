import React, { Component } from "react";
import ApiContext from "../ApiContext";
import './ProjectPage.css'

class ProjectPage extends Component {
    static contextType = ApiContext;
    render() {
        const {projects=[]} = this.context
        console.log(this.context.projects)
        return(
            <div className="project-page-container">
        <ol className="project-breakdown">
        <h2>{projects.map(project =>
                <li key={project.name} className="project-name">{project.name}</li>
                )}</h2>
                {projects.map(project =>
                <li key={project.totalCPU}>Price per unit: ${project.totalCPU}</li>
                )}
        </ol>
        </div>
        )
    }
}

export default ProjectPage