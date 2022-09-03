import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Pos from "./pages/Pos";

global.api = "https://dine-api.weazy.in/api/";

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pos" element={<Pos />} />
      </Routes>
    );
  }
}

export default App;
