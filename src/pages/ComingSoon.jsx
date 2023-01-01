import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import { Bars } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
import no_order from '../assets/images/no_orders.webp';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Countdown from 'react-countdown';
import coming_soon from '../assets/images/coming_soon.png';

class ComingSoon extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      date: '2023/01/09',
    };
  }

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title w-100 text-center">
                <h1>We're Cooking Some Brand New Dishes For You!</h1>
                <h5>
                  We're working on it. We'll be back soon with some new and
                  exciting updates.
                </h5>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <img src={coming_soon} alt="" />
            </div>
            <h3 className="text-center mt-4">
              To have a taste of our new updates, please wait for
            </h3>
            <Countdown
              date={this.state.date}
              renderer={(props) => (
                <div className="d-flex align-items-end justify-content-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="coming_soon_timings">{props.days}</span> -
                    <span className="coming_soon_timings">{props.hours}</span> -
                    <span className="coming_soon_timings">{props.minutes}</span>{' '}
                    -
                    <span className="coming_soon_timings">{props.seconds}</span>
                  </div>
                  <h4 className="mb-3">Days</h4>
                </div>
              )}
            />
            <h4 className="text-center">Thank you for your patience.</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ComingSoon;
