import React, { Component } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Orders from "./pages/Orders.jsx";
import Pos from "./pages/Pos.jsx";

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    );
  }
}

export default App;
