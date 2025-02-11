import React, { Component } from "react";
import Contacts from "./contacts.json";

export default class App extends Component {
  state = {
    vcontacts: Contacts.slice(0, 5),
    icontacts: Contacts.slice(5)
  };

  addRandom = () => {
    let icon = [...this.state.icontacts];
    let rand = icon.splice(Math.floor(Math.random() * icon.length), 1)[0];
    let clone = [...this.state.vcontacts];
    if (rand) clone.unshift(rand);
    this.setState({ vcontacts: clone, icontacts: icon });
  };
  showFirstFive = () => {
    return this.state.vcontacts.map((eachOne, i) => {
      return (
        <tr key={i}>
          <th className="imgTh">
            <img
              src={eachOne.pictureUrl}
              className="imgstyle"
              alt={eachOne.name}
              title={eachOne.name}
            />
          </th>
          <th>
            <h4>{eachOne.name}</h4>
          </th>
          <th>{eachOne.popularity}</th>
          <th>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteline(i)}
            >
              x
            </button>
          </th>
        </tr>
      );
    });
  };
  sortbyp = () => {
    let clone = [...this.state.vcontacts].sort(
      (a, b) => b.popularity - a.popularity
    );
    this.setState({ vcontacts: clone });
  };
  sortbyn = () => {
    let clone = [...this.state.vcontacts].sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
    this.setState({ vcontacts: clone });
  };
  deleteline = theIndex => {
    let clone = [...this.state.vcontacts];
    clone.splice(theIndex, 1);
    this.setState({ vcontacts: clone });
  };
  render() {
    return (
      <div>
        <h1>IronContacts</h1>
        <button className="btn btn-info" onClick={this.addRandom}>
          Add Random Contact
        </button>{" "}
        <button className="btn btn-secondary" onClick={this.sortbyn}>
          Sort by Name
        </button>{" "}
        <button className="btn btn-secondary" onClick={this.sortbyp}>
          Sort by Popularity
        </button>
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
            {this.showFirstFive()}
          </thead>
        </table>
      </div>
    );
  }
}
