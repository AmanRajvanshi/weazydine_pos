import { Component } from "react";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import logo from "../assets/images/main_logo.png";
import login from "../assets/images/login.jpg";
import Swal from "sweetalert2";
import { AuthContext } from '../AuthContextProvider';


class Login extends Component {
  static contextType = AuthContext;
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
    this.setState({ isLoading: true });
    var phoneNumber = this.state.phoneNumber;
    let rjx = /^[0]?[6789]\d{9}$/;
    let isValid = rjx.test(phoneNumber);
    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid mobile number",
      });
      this.setState({ isLoading: false });
    } else {
      fetch(global.api + "mobile-verification", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: phoneNumber,
          verification_type: "user",
          request_type: "send",
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.msg === "ok") {
            // this.resend();
            this.setState({ otpButton: true });
            Swal.fire({
              title: "OTP Sent",
              text: "OTP has been sent to your mobile number",
              icon: "success",
              confirmButtonText: "Ok",
            });
            
          } else {
            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };



  otpVerification = () => {
    this.setState({ isLoadingOtp: true });
    fetch(global.api + "otp-verification", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contact: this.state.phoneNumber,
        otp: this.state.otp,
        verification_type: "user",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.msg === "ok") {
          Swal.fire({
            title: "Success",
            text: "Login Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });

          global.vendor = json.usr;
          global.token = json.token;
          global.msg = "Welcome"

          if (json.user_type == 'login') {
            const data = { 'token': json.token, 'vendor_id': json.usr, "use_type": "done" }
            localStorage.setItem("@auth_login", JSON.stringify(data));
            global.msg = "Welcome Back"
          }
          else {
            const data = { 'token': json.token, 'vendor_id': json.usr, "use_type": "steps" }
            localStorage.setItem("@auth_login", JSON.stringify(data));

            global.msg = "Welcome"
          }

          this.context.login("done",json.token);
          const path=this.props.location.state?.path || "/";

          this.props.navigate(path, { replace: true });

         
        } else {
          Swal.fire({
            title: "Error!",
            text: json.msg,
            icon: "error",
            confirmButtonText: "Ok",
          });
          this.setState({
            otp: "",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoadingOtp: false });
      });
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
              
                {this.state.otpButton ? (
                  <>
                  <div className="login-userheading">
                  <h3>Verify Contact Number</h3>
                  <h4>Please login to your account</h4>
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
                          this.otpVerification();
                        }}
                      >
                        Login
                      </div>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
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
  const location = useLocation();
  return <Login {...props} {...useParams()} navigate={abcd} location={location} />;
}

export default (props) => <Navigate {...props} />;
