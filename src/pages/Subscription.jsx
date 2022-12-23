import { Component } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import logo from '../assets/images/logos/main_logo_black.png';
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
      <p>aaa</p>
    );
  }
}

export default Subscription;
