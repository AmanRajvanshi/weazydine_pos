import React, { Component } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
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
import { AuthContext } from "./AuthContextProvider";
import { RequireAuth } from "./RequireAuth";
import Productdetails from "./pages/Productdetails.jsx";
import Editproduct from "./pages/Editproduct.jsx";
import Editprofile from "./pages/Editprofile.jsx";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

global.api = "https://weazydine.healthyrabbit.in/api/";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      is_login: true,
      loading: true,
      user: [],
    };
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem("@auth_login"));
    if (items != null) {
      this.login(items.use_type, items.token);
      this.get_profile(items.token);
      global.vendor = items.vendor_id;
      global.step = this.state.step;
      global.msg = "Welcome Back";
    } else {
      this.logout();
    }
    toast.success(global.msg);
  }

  login = (step, token) => {
    this.setState({ is_login: true, step: step, token: token, loading: false });
    this.get_profile(token);
  };

  get_profile = (token) => {
    fetch(global.api + "get_vendor_profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if (json.message == "Unauthenticated.") {
          this.logout();
        }
        if (!json.status) {
        } else {
          // this.login("done", token);
          this.setState({ user: json.data[0] });
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
    // this.setState({ is_login: true, step: step, token: token });
  };

  logout = () => {
    localStorage.clear();
    this.setState({ is_login: false, loading: false, token: "", user: [] });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <div>
            <p>loading</p>
          </div>
        ) : (
          <>
            <AuthContext.Provider
              value={{
                login: this.login,
                logout: this.logout,
                is_login: this.state.is_login,
                token: this.state.token,
                user: this.state.user,
              }}
            >
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/pos"
                  element={
                    <RequireAuth>
                      <Pos />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/kot"
                  element={
                    <RequireAuth>
                      <Kot />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/productlist"
                  element={
                    <RequireAuth>
                      <Productlist />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/categorylist"
                  element={
                    <RequireAuth>
                      <Categorylist />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/addproduct"
                  element={
                    <RequireAuth>
                      <Addproduct />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/orderlist"
                  element={
                    <RequireAuth>
                      <Orderlist />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/orderdetails"
                  element={
                    <RequireAuth>
                      <Orderdetails />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/tableorderdetails"
                  element={
                    <RequireAuth>
                      <TableOrderDetails />
                    </RequireAuth>
                  }
                />{" "}
                <Route
                  exact
                  path="/productdetails/:id"
                  element={
                    <RequireAuth>
                      <Productdetails />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/editproduct/:id"
                  element={
                    <RequireAuth>
                      <Editproduct />
                    </RequireAuth>
                  }
                />
                <Route
                  exact
                  path="/editprofile"
                  element={
                    <RequireAuth>
                      <Editprofile />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<Pagenotfound />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </AuthContext.Provider>
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              transition={Flip}
            />
          </>
        )}
      </>
    );
  }
}

export default App;
