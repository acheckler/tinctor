import React, { Component } from "react";
import ApiContext from "../ApiContext";
import "./ProjectPage.css";
import config from "../config";
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";

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
    console.log(this.props)
    
    //for pie chart
    const COLORS = ["#34A0A4", "#168AAD", "#52B69A", "#76C893", "#1A759F"];
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
            <li key="total-cpu" className="p-cost-display">
              Total cost per unit: ${p.total_cpu}
            </li>

            <p className="cb-header">Cost breakdown:</p>
            <div className="breakdown-lists">
            <ul className="ingredients-list">
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
            </ul>
            <ul className="packaging-list">
            <li key="packaging" className="packaging">
              Packaging:
            </li>
            <li key="bottle">
              {p.bottle_name} bottle: ${p.bottle_cpu}
            </li>
            <li key="dropper">
              {p.dropper_name} dropper: ${p.dropper_cpu}
            </li>
            </ul>
            </div>

            {/* <div style={{display: 'grid'}}> */}
                <ResponsiveContainer width="90%" height="30%" className="pie-container">
                <PieChart width={this.props.width} height={this.props.height}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx={this.props.width / 2}
      cy={this.props.height / 2}
                //   cx={125}
                //   cy={160}
                //   outerRadius={80}
                outerRadius="100%"
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
                // wrapperStyle={{ position: 'relative' }}
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                />
                <Tooltip />
              </PieChart>
              </ResponsiveContainer>
            {/* </div> */}
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
