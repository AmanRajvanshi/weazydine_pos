import React, { Component } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" component={<Dashboard />} />
      </Routes>
    );
  }
}

export default App;
