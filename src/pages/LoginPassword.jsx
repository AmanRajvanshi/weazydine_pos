import { Component } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "../assets/images/main_logo.png";
import login from "../assets/images/login.jpg";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContextProvider";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import Timer from "otp-timer";

class LoginPassword extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      otp: "",
      otpButton: false,
      heading: "Log in",
      subheading: "Continue to WeazyDine Dashboard",
      sendotploading: false,
      verifyotploading: false,
      password: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  login = () => {
    var phoneNumber = this.state.phoneNumber;
    let rjx = /^[0]?[6789]\d{9}$/;
    let isValid = rjx.test(phoneNumber);
    if (!isValid) {
      toast.error("Enter Valid mobile number!");
    } else if (this.state.password == "") {
      toast.error("Enter Password!");
    } else {
      this.setState({ sendotploading: true });
      fetch(global.api + "login_by_localpart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: this.state.phoneNumber,
          passcode: this.state.password,
          secret: "ggMjF4waGewcI*7#3F06",
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.msg === "ok") {
            toast.success("OTP verified successfully");
            global.vendor = json.usr;
            // global.token = json.token;
            global.msg = "Welcome";

            if (json.user_type == "login") {
              const data = {
                token: json.token,
                vendor_id: json.usr,
                use_type: "done",
              };
              localStorage.setItem("@auth_login", JSON.stringify(data));
              global.msg = "Welcome Back";
            } else {
              const data = {
                token: json.token,
                vendor_id: json.usr,
                use_type: "steps",
              };
              localStorage.setItem("@auth_login", JSON.stringify(data));

              global.msg = "Welcome";
            }

            this.context.login("done", json.token);
            const path = this.props.location.state?.path || "/";

            this.props.navigate(path, { replace: true });
          } else {
            toast.error(json.error);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.setState({ sendotploading: false });
        });
    }
  };

  render() {
    return (
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper">
            <div className="container">
              <div
                className="row"
                style={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="login-content">
                        <div className="login-userset">
                          <div className="login-logo">
                            <img
                              src={logo}
                              alt="img"
                              style={{
                                maxWidth: "50%",
                                margin: "20px auto 40px",
                              }}
                            />
                          </div>

                          <div className="login-userheading">
                            <h3>{this.state.heading}</h3>
                            <h4>{this.state.subheading}</h4>
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
                                  this.setState({
                                    phoneNumber: e.target.value,
                                  })
                                }
                              />
                              <img
                                src="https://img.icons8.com/ios/50/000000/phone.png"
                                alt="img"
                                style={{
                                  width: 25,
                                  height: 25,
                                  marginTop: -8,
                                }}
                              />
                            </div>
                          </div>
                          <div className="form-login">
                            <label>Password</label>
                            <div className="pass-group d-flex justify-content-center my-3">
                              <input
                                type="text"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={(e) =>
                                  this.setState({
                                    password: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="form-login">
                            {this.state.sendotploading ? (
                              <button className="btn btn-login" disabled="">
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                ></span>
                                Continue
                              </button>
                            ) : (
                              <div
                                className="btn btn-login"
                                onClick={() => {
                                  this.login();
                                }}
                              >
                                Continue
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
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
  return (
    <LoginPassword
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
