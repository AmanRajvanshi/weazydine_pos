import { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/main_logo.png";

class Login extends Component {
  revealOtp = () => {
    var x = document.getElementById("pass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  render() {
    return (
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset">
                <div className="login-logo">
                  <img src={logo} alt="img" />
                </div>
                <div className="login-userheading">
                  <h3>Sign In</h3>
                  <h4>Please login to your account</h4>
                </div>
                <div className="form-login">
                  <label>Mobile Number</label>
                  <div className="form-addons">
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      maxLength={10}
                    />
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/mail.svg"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="form-login">
                  <label>OTP</label>
                  <div className="pass-group">
                    <input
                      type="password"
                      className="pass-input"
                      placeholder="Enter your OTP"
                      id="pass"
                      maxLength={4}
                    />
                    <span
                      className="fas toggle-password fa-eye-slash"
                      onClick={() => this.revealOtp()}
                    />
                  </div>
                </div>
                <div className="form-login">
                  <Link className="btn btn-login" to="/">
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="login-img">
              <img
                src="https://dreamspos.dreamguystech.com/html/template/assets/img/login.jpg"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
