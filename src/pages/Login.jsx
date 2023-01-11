import { Component } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import logo from '../assets/images/logos/main_logo_black.png';
import { AuthContext } from '../AuthContextProvider';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';
import Timer from 'otp-timer';
import video from '../assets/login.mp4';

class Login extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      otp: '',
      otpButton: false,
      heading: 'Log in',
      subheading: 'Continue to WeazyDine Dashboard',
      sendotploading: false,
      verifyotploading: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  mobileVerify = () => {
    this.setState({ sendotploading: true, isLoading: true });
    var phoneNumber = this.state.phoneNumber;
    let rjx = /^[0]?[6789]\d{9}$/;
    let isValid = rjx.test(phoneNumber);
    if (!isValid) {
      toast.error('Please enter valid mobile number');
      this.setState({ sendotploading: false, isLoading: false });
    } else {
      fetch(global.api + 'staff-mobile-verification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: phoneNumber,
          verification_type: 'vendor',
          request_type: 'send',
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.msg === 'ok') {
            // this.resend();
            this.setState({
              otpButton: true,
              heading: 'Verify OTP',
              subheading: 'Please enter the OTP sent to your mobile number',
            });
            toast.success('OTP sent successfully');
          } else {
            toast.error(json.msg);
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ sendotploading: false, isLoading: false });
        });
    }
  };

  otpVerification = (otp) => {
    this.setState({ verifyotploading: true });
    if (otp === '') {
      toast.error('OTP is required');
      this.setState({ verifyotploading: false });
    } else {
      fetch(global.api + 'staff-otp-verification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: this.state.phoneNumber,
          otp: otp,
          verification_type: 'vendor',
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.msg === 'ok') {
            toast.success('OTP verified successfully');
            global.vendor = json.usr;
            // global.token = json.token;
            global.msg = 'Welcome';

            if (json.user_type == 'login') {
              const data = {
                token: json.token,
                vendor_id: json.usr,
                use_type: 'done',
              };
              localStorage.setItem('@auth_login', JSON.stringify(data));
              global.msg = 'Welcome Back';
            } else {
              const data = {
                token: json.token,
                vendor_id: json.usr,
                use_type: 'steps',
              };
              localStorage.setItem('@auth_login', JSON.stringify(data));

              global.msg = 'Welcome';
            }

            this.context.login('done', json.data, json.user, json.token);
            const path = this.props.location.state?.path || '/';

            this.props.navigate(path, { replace: true });
          } else {
            toast.error(json.error);
            this.setState({
              otp: '',
            });
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ verifyotploading: false });
        });
    }
  };

  resendOtp = () => {
    fetch(global.api + 'mobile-verification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: this.state.phoneNumber,
        verification_type: 'vendor',
        request_type: 'resend',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.msg === 'ok') {
          toast.success('OTP Resend successfully');
          this.setState({
            otp: '',
          });
        } else {
          toast.error(json.msg);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  revealOtp = () => {
    var x = document.getElementById('pass');
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };
  render() {
    return (
      <div className="main-wrapper">
        <div className="account-content">
          <div className="login-wrapper">
            <div class="login-img">
              {/* <video
                loading="lazy"
                muted="muted"
                src={video}
                type="video/mp4"
                autoplay="autoplay"
                loop="loop"
              ></video> */}
              <h1>We're holding the door for you!</h1>
              <h3>
                Login now and manage all your Weazy Dine services with ease.
              </h3>
            </div>

            <div className="login-content">
              <div className="login-userset">
                <div className="login-logo">
                  <img
                    src={logo}
                    alt="img"
                    style={{
                      maxWidth: '60%',
                      margin: '20px auto 40px',
                    }}
                  />
                </div>

                <div className="login-userheading">
                  <h2 className="mb-1">{this.state.heading}</h2>
                  <h5>{this.state.subheading}</h5>
                </div>
                {this.state.otpButton ? (
                  <>
                    <p
                      onClick={() => {
                        this.setState({
                          heading: 'Log in',
                          subheading: 'Continue to WeazyDine Dashboard',
                          otpButton: false,
                          otp: '',
                        });
                      }}
                      style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        marginTop: -20,
                      }}
                    >
                      <i className="fa fa-edit" />{' '}
                      <span>{this.state.phoneNumber}</span>
                    </p>
                    <div className="form-login">
                      <div className="pass-group d-flex justify-content-center my-3">
                        <OtpInput
                          value={this.state.otp}
                          onChange={(otp) => {
                            this.setState({ otp: otp });
                            if (otp.length === 6) {
                              this.otpVerification(otp);
                            }
                          }}
                          numInputs={6}
                          separator={<span>-</span>}
                          isInputNum={true}
                          shouldAutoFocus={true}
                          placeholder={'######'}
                          inputStyle={{
                            width: '3rem',
                            height: '3rem',
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-login">
                      {this.state.verifyotploading ? (
                        <button className="btn btn-login" disabled="">
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Verifying OTP
                        </button>
                      ) : (
                        <div
                          className="btn btn-login"
                          onClick={() => {
                            this.otpVerification(this.state.otp);
                          }}
                        >
                          Verify OTP
                        </div>
                      )}
                    </div>
                    <Timer
                      seconds={30}
                      minutes={0}
                      resend={() => this.resendOtp()}
                      text={'Resend OTP in'}
                      buttonColor={'#5BC2C1'}
                      background={'#fff'}
                      ButtonText={"Didn't get the code? Resend OTP"}
                    />
                  </>
                ) : (
                  <>
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
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              this.mobileVerify();
                            }
                          }}
                        />
                        <i
                          className="iconly-Calling icli"
                          style={{
                            fontSize: 25,
                            position: 'absolute',
                            right: 8,
                            top: 8,
                          }}
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
                          className="btn btn-sm btn-login"
                          onClick={() => {
                            this.mobileVerify();
                          }}
                        >
                          Continue
                        </div>
                      )}
                    </div>
                  </>
                )}
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
    <Login {...props} {...useParams()} navigate={abcd} location={location} />
  );
}

export default (props) => <Navigate {...props} />;
