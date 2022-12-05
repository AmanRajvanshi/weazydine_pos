import { Component } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import logo from '../assets/images/main_logo.png';
import login from '../assets/images/login.jpg';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthContextProvider';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';
import Timer from 'otp-timer';

export class Subscription extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      otp: '',
      otpButton: false,
      heading: 'Basic Plan',
      subheading: 'Continue to WeazyDine Dashboard',
      sendotploading: false,
      verifyotploading: false,
      password: '',
    };
  }
  render() {
    return (
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper">
            <div className="container">
              <div
                className="row"
                style={{
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div className="d-flex justify-content-center">
                    <img
                      src={logo}
                      alt="img"
                      style={{
                        maxWidth: '20%',
                        marginBottom: '20px',
                      }}
                    />
                  </div>
                  <h3 className="h2 mb-3 text-center sub_text_heading">
                    <i className="fas fa-exclamation-circle"></i> Oops! Your
                    subscription has expired! Renew your subscription to
                    continue using WeazyDine.
                  </h3>
                </div>
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <div className="login-content p-0">
                          <div className="login-userset">
                            <div className="login-userheading text-center">
                              <h2>
                                <strong>Rs. 123479</strong>
                              </h2>
                              <h3>{this.state.heading}</h3>
                              <h5 className="my-2">{this.state.subheading}</h5>
                              <h5 className="my-2">{this.state.subheading}</h5>
                              <h5 className="my-2">{this.state.subheading}</h5>
                              <h5 className="my-2">{this.state.subheading}</h5>
                              <h5 className="my-2">{this.state.subheading}</h5>
                              <h5 className="my-2">{this.state.subheading}</h5>
                              <h5 className="my-2">{this.state.subheading}</h5>
                            </div>
                            <div className="form-login">
                              {this.state.sendotploading ? (
                                <button className="btn btn-login" disabled="">
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                  ></span>
                                  Please Wait
                                </button>
                              ) : (
                                <div
                                  className="btn btn-login"
                                  onClick={() => {
                                    this.login();
                                  }}
                                >
                                  Pay now
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
      </div>
    );
  }
}

export default Subscription;
