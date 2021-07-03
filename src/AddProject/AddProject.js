import React, { Component } from "react";
import ApiContext from "../ApiContext";
import "./AddProject.css";
import PropTypes from "prop-types";

class AddProject extends Component {
  static contextType = ApiContext;
  static propTypes = {
    history: PropTypes.object,
  };

  state = {
    totalCPU: "",
    button: 0,
    showing: false,
  };



  //functions to grab values from drop down menus & set their state
  selectCannabinoid = (e) => {
    const cann = JSON.parse(e.target.value);
    const cannId = cann.id;
    const cannPrice = cann.ppg;

    this.setState({
      cann,
      cannId,
      cannPrice,
    });
  };

  selectCarrier = (e) => {
    const carr = JSON.parse(e.target.value);
    const carrId = carr.id;
    const carrPrice = carr.ppg;
    this.setState({
      carr,
      carrId,
      carrPrice,
    });
  };

  selectFlavor = (e) => {
    const flav = JSON.parse(e.target.value);
    const flavorId = flav.id;
    this.setState({
      flavorId,
      flav,
    });
  };

  selectBottle = (e) => {
    const bottle = JSON.parse(e.target.value);
    const bottleId = bottle.id;
    const bottleCpu = bottle.cpu;
    this.setState({
      bottle,
      bottleId,
      bottleCpu,
    });
  };

  selectDropper = (e) => {
    const dropper = JSON.parse(e.target.value);
    const dropperId = dropper.id;
    const dropperCpu = dropper.cpu;
    this.setState({
      dropper,
      dropperId,
      dropperCpu,
    });
  };



  // grabbing values from inputs, send to calculate cost and/or save project button
  handleSubmit(event) {
    event.preventDefault();

    const projectName = event.target.name.value;
    const tincVolume = parseFloat(event.target.tinctureVolume.value);
    const cannaConcentration = parseFloat(
      event.target.cannaConcentration.value
    );
    const carrierP = parseFloat(event.target.carrierConcentration.value);
    const cannaCost = (this.state.cannPrice * cannaConcentration) / 1000;
    const carrierCost = tincVolume * this.state.carrPrice;
    const packagingCost = this.state.bottleCpu + this.state.dropperCpu;
    const totalCost = cannaCost + carrierCost + packagingCost;
    const fixedCost = Number.parseFloat(totalCost).toFixed(2);

    const formData = {
      name: projectName,
      tVol: tincVolume,
      canna: this.state.cannId,
      cCon: cannaConcentration,
      carr: this.state.carrId,
      carrP: carrierP,
      flav: this.state.flavorId,
      bottle: this.state.bottleId,
      dropper: this.state.dropperId,
      cpu: fixedCost,
    };

    //calculate cost button
    if (this.state.button === 1) {
      this.setState({ totalCPU: fixedCost });
    }

    //save project button
    if (this.state.button === 2) {
      this.context.addProject(formData, totalCost);
      this.props.history.push(`/`);
    }
  }

  render() {
    const DisplayCost = () => (
      <p className="total-cost">$ {this.state.totalCPU}</p>
    );
    const { ingredients = [], packaging = [] } = this.context;
    return (
      <div className="form-container">
        <form className="addProject" onSubmit={(e) => this.handleSubmit(e)}>
          <ol className="projectForm">
            {/* project name */}
            <h2>Add A New Project</h2>
            <li className="project-name">
              <label htmlFor="name">Project name:</label>
              <input type="text" className="projectName" name="name" required />
            </li>

            {/* tincture volume */}
            <li className="tinc-vol">
              <label htmlFor="tinctureVolume">Tincture Volume:</label>
              <input type="number" name="tinctureVolume" required />{" "}
              <label className="mg">mL</label>
            </li>

            {/* select a cannabinoid */}
            <li className="canna-select">
              <select
                name="cannabinoids"
                className="choose-cannabinoid"
                onChange={(e) => this.selectCannabinoid(e)}
                required
              >
                <option value="">Choose a cannabinoid:</option>
                {ingredients
                  .filter((ingredient) => ingredient.category === "cannabinoid")
                  .map((ingredient) => (
                    <option
                      key={ingredient.id}
                      value={JSON.stringify(ingredient)}
                    >
                      {ingredient.name}
                    </option>
                  ))}
              </select>
            </li>

            {/* cannabinoid concentration */}
            <li className="canna-concentration">
              <label htmlFor="cannaConcentration">
                Cannabinoid Concentration:
              </label>
              <input type="number" name="cannaConcentration" required />{" "}
              <label className="mg">mg per mL</label>
            </li>

            {/* select a carrier oil */}
            <li className="carrier-oils">
              <select
                name="carrier_oils"
                className="choose-carrier-oils"
                onChange={(e) => this.selectCarrier(e)}
                required
              >
                <option value="">Choose a carrier oil:</option>
                {ingredients
                  .filter((ingredient) => ingredient.category === "carrier")
                  .map((ingredient) => (
                    <option
                      key={ingredient.id}
                      value={JSON.stringify(ingredient)}
                    >
                      {ingredient.name}
                    </option>
                  ))}
              </select>
            </li>

            {/* carrier percentage */}
            <li className="carrier-concentration">
              <label htmlFor="carrierConcentration">Carrier Percentage:</label>
              <input type="number" name="carrierConcentration" required />
              <label className="mg">%</label>
            </li>

            {/* select a flavor */}
            <li className="flavor-type">
              <select
                name="flavors"
                className="choose-flavor"
                onChange={(e) => this.selectFlavor(e)}
                required
              >
                <option value="">Choose a flavor:</option>
                {ingredients
                  .filter((ingredient) => ingredient.category === "flavor")
                  .map((ingredient) => (
                    <option
                      key={ingredient.id}
                      value={JSON.stringify(ingredient)}
                    >
                      {ingredient.name}
                    </option>
                  ))}
              </select>
            </li>

            {/* select a bottle */}
            <li className="bottle-type">
              <select
                name="bottleType"
                className="choose-bottle"
                onChange={(e) => this.selectBottle(e)}
                required
              >
                <option value="">Choose a bottle:</option>
                {packaging
                  .filter((item) => item.category === "bottles")
                  .map((item) => (
                    <option key={item.id} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </li>

            {/* select a dropper */}
            <li className="dropper-type">
              <select
                name="dropper"
                className="choose-dropper"
                onChange={(e) => this.selectDropper(e)}
                required
              >
                <option value="">Choose a dropper:</option>
                {packaging
                  .filter((item) => item.category === "droppers")
                  .map((item) => (
                    <option key={item.id} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </li>

            {/* calculate cost button + display cost element */}
            <li className="total-cost">
              {this.state.showing ? <DisplayCost /> : null}
            </li>
            <li>
              <button
                type="submit"
                name="calculate-cost"
                className="calculate-btn"
                onClick={() => this.setState({ button: 1, showing: true })}
              >
                Calculate Cost Per Unit
              </button>
            </li>

            {/* save project button */}
            <li className="save-button">
              <button
                type="submit"
                className="save-project-btn"
                name="save-project"
                onClick={(e) => this.setState({ button: 2 })}
              >
                Save Project
              </button>
            </li>
          </ol>
        </form>
      </div>
    );
  }
}
export default AddProject;
