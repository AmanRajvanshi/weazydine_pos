import React, { Component } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Addproduct from "./pages/Addproduct.jsx";
import Categorylist from "./pages/Categorylist.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Kot from "./pages/Kot.jsx";
import Login from "./pages/Login.jsx";
import Orders from "./pages/Orders.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import Pos from "./pages/Pos.jsx";
import Productlist from "./pages/Productlist.jsx";
import Orderlist from "./pages/Orderlist.jsx";
import Orderdetails from "./pages/Orderdetails.jsx";
import TableOrderDetails from "./pages/TableOrderDetails.jsx";

global.token = "s";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      is_login: true,
    };
  }

  componentDidMount() {
    //get the token
  }

  login (token)
  {
    this.setState({is_login: true, token: token})
  }
  render() {
    return (
      <>
        {this.state.is_login ? (
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/pos" element={<Pos />} />
            <Route exact path="/kot" element={<Kot />} />
            <Route exact path="/productlist" element={<Productlist />} />
            <Route exact path="/categorylist" element={<Categorylist />} />
            <Route exact path="/addproduct" element={<Addproduct />} />
            <Route exact path="/orderlist" element={<Orderlist />} />
            <Route exact path="/orderdetails" element={<Orderdetails />} />
            <Route exact path="/tableorderdetails" element={<TableOrderDetails />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        )}
      </>
    );
  }
}

export default App;
