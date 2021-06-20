import React, { Component } from "react";
import ApiContext from "../ApiContext";
import "./AddProject.css";
import PropTypes from 'prop-types'

class AddProject extends Component {
  static contextType = ApiContext;
  static propTypes = {
    history: PropTypes.object
  }
    
  state = {
    totalCPU: "",
  }

  selectCannabinoid = (e) => {
    const cannaId = parseFloat(e.target.value);
    this.setState({
      cannaId,
    });
  };

  selectCarrier = (e) => {
    const carrierId = parseFloat(e.target.value);
    this.setState({
      carrierId,
    });
  };

  selectBottle = (e) => {
    const bottleId = parseFloat(e.target.value);
    this.setState({
      bottleId,
    });
  };

  selectDropper = (e) => {
    const dropperId = parseFloat(e.target.value);
    this.setState({
      dropperId,
    });
  };
  handleSubmit(event) {
    event.preventDefault();
    // const projectName = event.target.name.value;
    const tincVolume = parseFloat(event.target.tinctureVolume.value);
    const cannaConcentration = parseFloat(
      event.target.cannaConcentration.value
    );
    // const carrierConcentration = parseFloat(
    //   event.target.carrierConcentration.value
    // );
    this.calculateCost(
      tincVolume,
      cannaConcentration
    );
    
  }

  calculateCost(tincVolume, cannaConcentration) {
    const cannaCost = (this.state.cannaId * cannaConcentration) / 1000;
    const carrierCost = tincVolume * this.state.carrierId;
    const packagingCost = this.state.bottleId + this.state.dropperId;
    const totalCost = cannaCost + carrierCost + packagingCost;
    console.log(totalCost);
    this.setState({
        totalCPU: totalCost
    })
    this.props.history.push("/newProject", {state: totalCost})
  }

  render() {
    const {
      cannabinoids = [],
      carriers = [],
      bottles = [],
      droppers = [],
    //   projects = [],
    } = this.context;
    return (
      <div className="form-container">
          
        <form className="addProject" onSubmit={(e) => this.handleSubmit(e)}>

            <ol className="projectForm">
            <h2>Add A New Project</h2> 
            
              <li className="project-name">
                <label htmlFor="name">Project name:</label>
                <input type="text" className="projectName" name="name" required/>
                
              </li>
 
              <li className="tinc-vol">
                <label htmlFor="tinctureVolume">Tincture Volume:</label>
                <input type="number" name="tinctureVolume" required/> <label className="mg">mL</label>
                </li>
                <li className="canna-select">
                <select
                  name="cannabinoids"
                  className="choose-cannabinoid"
                  onChange={(e) => this.selectCannabinoid(e)}
                  required
                >
                  <option value="">Choose a cannabinoid:</option>
                  {cannabinoids.map((cannabinoids) => (
                    <option key={cannabinoids.id} value={cannabinoids.ppg}>
                      {cannabinoids.name}
                    </option>
                  ))}
                </select>
                </li>
             
              <li className="canna-concentration">
                <label htmlFor="cannaConcentration">
                  Cannabinoid Concentration:
                </label>
                <input type="number" name="cannaConcentration" required /> <label className="mg">mg per mL</label>
                </li>
                <li className="carrier-oils">
                <select
                  name="carrier_oils"
                  className="choose-carrier-oils"
                  onChange={(e) => this.selectCarrier(e)}
                  required
                >
                    
                  <option value="">Choose a carrier oil:</option>
                  {carriers.map((carriers) => (
                    <option key={carriers.id} value={carriers.ppg}>
                      {carriers.name}
                    </option>
                  ))}
                </select>
              </li>
              <li className="carrier-concentration">
                <label htmlFor="carrierConcentration">
                  Carrier Percentage:
                </label>
                <input type="number" name="carrierConcentration" required/>
                <label className="mg">%</label>
              </li>
              <li className="bottle-type">
                <select
                  name="bottleType"
                  className="choose-bottle"
                  onChange={(e) => this.selectBottle(e)}
                  required
                >
                  <option value="">Choose a bottle:</option>
                  {bottles.map((bottles) => (
                    <option key={bottles.id} value={bottles.cpu}>
                      {bottles.name}
                    </option>
                  ))}
                </select>
              </li>
              <li className="dropper-type">
                <select
                  name="dropper"
                  className="choose-dropper"
                  onChange={(e) => this.selectDropper(e)}
                  required
                >
                  <option value="">Choose a dropper:</option>
                  {droppers.map((droppers) => (
                    <option key={droppers.id} value={droppers.cpu}>
                      {droppers.name}
                    </option>
                  ))}
                </select>
              </li>
              <li className="save-button">
                <button type="submit" className="save-project-button">
                  Calculate Cost Per Unit
                </button>
              </li>
              <li className="total-cost">
                  <p>{this.state.totalCPU}</p>
            
              </li>
            </ol>
        </form>
      </div>
    );
  }
}
export default AddProject;
