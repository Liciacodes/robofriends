import React, { Component } from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox.js";
import "./App.css";
import Scroll from "./Scroll.js";
import ErrorBoundry from "./ErrorBoundry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const {robots, searchField} = this.state;
    const filterRobots = robots.filter(robot => {
      return robot.name
        .toLowerCase()
        .includes(searchField.toLowerCase());
    });

    return !robots.length ? 
    <h1>Loading</h1> :
     (
        <div className="tc">
          <h1 className="f1"> Robofriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
               <CardList robots={filterRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }

export default App;
