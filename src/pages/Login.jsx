import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/fav.png";

export class Login extends Component {
  state = {
    id: "51234",
    password: "aa",
  };
  render() {
    return (
      <div className="text-center mx-auto vh-100 d-flex align-items-center justify-content-center">
        <main className="form-signin w-50 mx-auto">
          <img src={logo} alt="" height={200} width={200} />
          <h2 className="text-center my-4 text-decoration-underline">
            Login To your account!
          </h2>
          <form>
            <div className="form-group my-2">
              <label htmlFor="id" className="text-start w-100 mb-1">
                ID
              </label>
              <input
                type="text"
                className="form-control p-3"
                id="id"
                aria-describedby="emailHelp"
                placeholder="Enter Id"
                value={this.state.id}
                onChange={(e) => this.setState({ id: e.target.value })}
              />
            </div>
            <div className="form-group my-2 position-relative">
              <label htmlFor="password" className="text-start w-100 mb-1">
                Password
              </label>
              <input
                type="password"
                className="form-control p-3"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <i
                className="fa-solid fa-eye"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "45px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  var x = document.getElementById("password");
                  if (x.type === "password") {
                    x.type = "text";
                  } else {
                    x.type = "password";
                  }
                }}
              ></i>
            </div>
            <Link to="/pos">
              <button
                type="submit"
                className="btn btn-warning text-white w-100 mt-4"
              >
                Submit
              </button>
            </Link>
          </form>
        </main>
      </div>
    );
  }
}

export default Login;
