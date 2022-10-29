import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
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
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DineinList from "./pages/DineinList.jsx";
import Inventorycategory from "./pages/Inventorycategory.jsx";
import Inventoryproducts from "./pages/Inventoryproducts.jsx";
import Releaseinventory from "./pages/Releaseinventory.jsx";
import LoginPassword from "./pages/LoginPassword.jsx";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

import OneSignal from "react-onesignal";
import { Bars } from "react-loader-spinner";
import Pickuppoint from "./pages/Pickuppoint.jsx";
import Subscription from "./pages/Subscription.jsx";

OneSignal.init({ appId: "49e49fa7-d31e-42d9-b1d5-536c4d3758cc" });

//for Release point
// global.api = "https://dine-api.weazy.in/api/";

//for Testing point
global.api = "https://beta-dine-api.weazy.in/api/";

//for local
// global.api = "https://beta-dine-api.weazy.in/api/";

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
      this.get_profile(items.token);
      global.vendor = items.vendor_id;
      global.step = this.state.step;
      // global.msg = "Welcome Back";
    } else {
      this.logout();
    }
    // toast.success(global.msg);
  }

  login = (step, user, token) => {
    this.setState({
      is_login: true,
      step: step,
      user: user,
      token: token,
      loading: false,
    });

    OneSignal.sendTag("id", "" + user.id);
    OneSignal.sendTag("account_type", "vendor-bmguj1sfd77232927ns");

    window.Pusher = Pusher;
    // console.log(Pusher);
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "b8ba8023ac2fc3612e90",
      cluster: "mt",
      wsHost: "websockets.webixun.com",
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      authEndpoint: global.api + "broadcasting/auth",
      auth: {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      },
    });
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
        if (json.message === "Unauthenticated.") {
          this.logout();
        }
        if (!json.status) {
        } else {
          this.login(json.step, json.data[0], token);
          //this.setState({ user: json.data[0] });
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
    return this.state.loading ? (
      <div className="main_loader">
        <Bars
          height="80"
          width="80"
          color="#eda332"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
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
              path="/pos/:table_id"
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
              path="/orderdetails/:id"
              element={
                <RequireAuth>
                  <Orderdetails />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/tableorderdetails/:id"
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
            <Route
              exact
              path="/dineinlisting"
              element={
                <RequireAuth>
                  <DineinList />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/inventorycategory"
              element={
                <RequireAuth>
                  <Inventorycategory />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/inventoryproducts"
              element={
                <RequireAuth>
                  <Inventoryproducts />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/releaseinventory"
              element={
                <RequireAuth>
                  <Releaseinventory />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/pickuppoint"
              element={
                <RequireAuth>
                  <Pickuppoint />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/subscription"
              element={
                <RequireAuth>
                  <Subscription />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Pagenotfound />} />
            <Route exact path="/login" element={<Login />} />
            {/* <Route exact path="/loginpassword" element={<LoginPassword />} /> */}
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
    );
  }
}

export default App;
