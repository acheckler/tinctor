import React, { Component } from "react";
import ApiContext from "../ApiContext";
import "./ProjectPage.css";
import config from "../config";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

class ProjectPage extends Component {
  static contextType = ApiContext;

  //delete endpoint function
  handleDeleteClick = (e) => {
    e.preventDefault();
    const id = this.props.location.state.projectId;

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
    const p = this.props.location.state.projectObj;
    
    //for pie chart
    const COLORS = ["#344E41", "#3A5A40", "#588157", "#A3B18A", "#90a955"];
    const data = [
      { name: p.canna_name, value: parseFloat(p.canna_ppg) },
      { name: p.carrier_name, value: parseFloat(p.carrier_ppg) },
      { name: p.flavor_name, value: parseFloat(p.flavor_ppg) },
      { name: `${p.bottle_name} Bottle`, value: parseFloat(p.bottle_cpu) },
      { name: `${p.dropper_name} Dropper`, value: parseFloat(p.dropper_cpu) },
    ];

    return (
      <div className="project-page-container">
        {project.map((p) => (
          <div className="project-breakdown">
            <p className="p-display-title">{p.name}</p>
            <li key="total-cpu" className="p-display-title">
              Total cost per unit: ${p.total_cpu}
            </li>

            <p>Cost breakdown:</p>
            <li key="ingredients" className="ingredients">
              Ingredients:
            </li>
            <li key="canna-id">
              {p.canna_name}: ${p.canna_ppg}
            </li>
            <li key="carrier">
              {p.carrier_name}: ${p.carrier_ppg}
            </li>
            <li key="flavor">
              {p.flavor_name}: ${p.flavor_ppg}
            </li>
            <li key="packaging" className="packaging">
              Packaging:
            </li>
            <li key="bottle">
              {p.bottle_name} bottle: ${p.bottle_cpu}
            </li>
            <li key="dropper">
              {p.dropper_name} dropper: ${p.dropper_cpu}
            </li>

            <div className="pie-chart">
              <PieChart width={600} height={300}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Legend
                  verticalAlign="right"
                  align="center"
                  layout="vertical"
                />
                <Tooltip />
              </PieChart>
            </div>
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
