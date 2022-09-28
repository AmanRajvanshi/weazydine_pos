import { Component } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/images/main_logo.png";
import login from "../assets/images/login.jpg";
import Swal from "sweetalert2";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      otp: "",
      otpButton: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  mobileVerify = () => {
    const { phoneNumber } = this.state;
    if (phoneNumber.length === 10) {
      this.setState({ otp: "1234", otpButton: true });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid mobile number",
      });
    }
  };

  otpVerify = () => {
    const { otp } = this.state;
    if (otp === "1234") {
      this.props.navigate("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid OTP",
      });
      this.setState({ otp: "" });
    }
  };

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
                      value={this.state.phoneNumber}
                      onChange={(e) =>
                        this.setState({ phoneNumber: e.target.value })
                      }
                    />
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/mail.svg"
                      alt="img"
                    />
                  </div>
                </div>
                {this.state.otpButton ? (
                  <>
                    <div className="form-login">
                      <label>OTP</label>
                      <div className="pass-group">
                        <input
                          type="password"
                          className="pass-input"
                          placeholder="Enter your OTP"
                          id="pass"
                          maxLength={4}
                          value={this.state.otp}
                          onChange={(e) =>
                            this.setState({ otp: e.target.value })
                          }
                        />
                        <span
                          className="fas toggle-password fa-eye-slash"
                          onClick={() => this.revealOtp()}
                        />
                      </div>
                    </div>
                    <div className="form-login">
                      <div
                        className="btn btn-login"
                        onClick={() => {
                          this.otpVerify();
                        }}
                      >
                        Login
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="form-login">
                    <div
                      className="btn btn-login"
                      onClick={() => {
                        this.mobileVerify();
                      }}
                    >
                      Send Otp
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="login-img">
              <img src={login} alt="img" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  return <Login {...props} {...useParams()} navigate={abcd} />;
}

export default (props) => <Navigate {...props} />;