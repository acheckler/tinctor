import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import "./LandingPage.css";

class LandingPage extends Component {
  static contextType = ApiContext;

  render() {
    const { projectsDisplay = [] } = this.context;
    return (
      <div className="lp-container">
        <div className="app-intro">
          <h2 className="lp-h2">Welcome to Tinctor!</h2>
          <p className="p-intro">
            Originally built for 'BATCH by Wisconsin Hemp Scientific', Tinctor
            was made to streamline the quotation process with clients. Many
            factors go into the pricing of tincture formulas, and Tinctor allows
            the business to give their clients immediate answers to their
            queries, instead of searching for pieces of data throughout
            countless spreadsheets and doing the calculations themselves.{" "}
          </p>
        </div>
        <div className="lp-container2">
          <h2 className="lp-h2">Projects:</h2>
          <ol className="project_list">
            {projectsDisplay.map((project) => (
              <li key={project.id} className="project-li">
                <Link
                  to={{
                    pathname: `/projects/${project.name}`,
                    state: { project: [project], projectObj: project, projectId: project.id },
                  }}
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ol>
          <Link to="/newProject">
            <button className="new-p-button">New Project</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;

