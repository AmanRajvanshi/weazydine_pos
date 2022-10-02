import React, { Component  } from "react";
import { Route, Router, Routes,useNavigate  } from "react-router-dom";
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
import { AuthContext } from './AuthContextProvider';
import { RequireAuth } from './RequireAuth';
global.token = "s";
global.api="https://weazydine.healthyrabbit.in/api/";
global.vendor="";
export class App extends Component {
  constructor(props) {
  
    super(props);
    this.state = {
      token: "",
      is_login: true,
    };
  }

  componentDidMount() {

    const items = JSON.parse(localStorage.getItem('@auth_login'));
    if (items  != null) {
      this.login(items.use_type);
      global.token = items.token;
      global.vendor = items.vendor_id;
      global.step = this.state.step
      global.msg = "Welcome Back"

    }
    else {
      this.logout();
    }

  }

  login = (step,token) => {
     this.setState({ is_login: true, step: step,token:token });
  }

  logout = () => {
    localStorage.clear();
    this.setState({ is_login: false });
  }

  render() {
    return (
      <AuthContext.Provider value={{ login: this.login, logout: this.logout,is_login:this.state.is_login,token:this.state.token }}>
         <Routes >
            <Route exact path="/" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>} />
              
              <Route exact path="/pos" element={
                <RequireAuth>
                  <Pos />
                </RequireAuth>} />
            
              <Route exact path="/kot" element={
                <RequireAuth>
                  <Kot />
                </RequireAuth>} />

              <Route exact path="/productlist" element={
                <RequireAuth>
                  <Productlist />
                </RequireAuth>} />
              <Route exact path="/categorylist" element={
                <RequireAuth>
                  <Categorylist />
                </RequireAuth>} />
              
              <Route exact path="/addproduct" element={
                <RequireAuth>
                  <Addproduct />
                </RequireAuth> } />
              
              <Route exact path="/orderlist" element={
                <RequireAuth>
                  <Orderlist />
                </RequireAuth>} />
              
              <Route exact path="/orderdetails" element={
                <RequireAuth>
                  <Orderdetails />
                </RequireAuth>} />
              
              <Route exact path="/tableorderdetails" element={
                <RequireAuth>
                  <TableOrderDetails />
                </RequireAuth>
              } />

              <Route path="*" element={<Pagenotfound />} />

                <Route exact path="/login" element={
                  <Login />} />
            </Routes>
       
          </AuthContext.Provider>
    );
  }
}

export default App;
