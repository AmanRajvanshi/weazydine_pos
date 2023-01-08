import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import { Bars } from 'react-loader-spinner';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider.js';
import Skeletonloader from '../othercomponent/Skeletonloader';
import moment from 'moment';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

export class Invoicedashboard extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    const today = moment();
    this.state = {
      data: [],
      isloading: true,
      item: {
        total_earnning: 0,
        orders: 0,
        shop_visit: 0,
        customer: 0,
        cashsale: 0,
        online: 0,
        weazypay: 0,
      },
      orders: [],
      isOpen: false,
      from: new Date(),
      to: new Date(),
      shop_status: 1,
    };
  }

  componentDidMount() {
    this.get_vendor_data('today');
    this.setState({ shop_status: this.context.user.shop_open });
  }
  loader = (value) => {
    this.setState({ isloading: value });
  };

  onSelect = (value, states) => {
    this.setState({ value, states });
  };

  get_vendor_data = (range) => {
    fetch(global.api + 'get_vendor_data', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        range: range,
        from: this.state.from,
        to: this.state.to,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          this.setState({ item: json.data });
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
  };

  update_shop_status = (e) => {
    this.setState({ shop_status: e.target.checked ? 1 : 0 });
    fetch(global.api + 'update_shop_status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        shop_status: e.target.checked ? 1 : 0,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          this.context.get_vendor_profile(this.context.token);
          toast.success('Shop Status Updated Successfully');
        } else {
          toast.error(json.msg);
          this.setState({ shop_status: this.context.user.shop_open });
        }
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    };
    let { item } = this.state;
    return (
      <>
        <Helmet>
          <title>Dashboard | Weazy Dine</title>
        </Helmet>
        <div className="main-wrappers">
          <Header />
          <div className="page-wrapper">
            <div className="content">
              <div className="row">
                <div className="col-sm-2 col-2">
                  <h4>Overview</h4>
                </div>
                <div className="col-sm-10 col-10 d-flex justify-content-end mb-4 align-items-center">
                  <div className="d-flex align-items-center">
                    <h6>Shop Status</h6>
                    <div className="status-toggle ml-3">
                      <input
                        type="checkbox"
                        id="live_inventory"
                        className="check"
                        checked={this.state.shop_status == 1 ? true : false}
                        onChange={(e) => {
                          this.update_shop_status(e);
                        }}
                      />
                      <label
                        htmlFor="live_inventory"
                        className="checktoggle"
                      ></label>
                    </div>
                  </div>
                  <select
                    className="form-control ml-3"
                    onChange={(e) => {
                      if (e.target.value == 'customrange') {
                        this.setState({ isOpen: !this.state.isOpen });
                      } else {
                        this.setState({ isOpen: false });
                        this.get_vendor_data(e.target.value);
                      }
                    }}
                    value={this.state.value}
                    style={{ width: '150px' }}
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="thisweek">This Week</option>
                    <option value="lastweek">Last Week</option>
                    <option value="thismonth">This Month</option>
                    <option value="lastmonth">Last Month</option>
                    <option value="lifetime">LifeTime</option>
                    <option value="customrange">Custom Range</option>
                  </select>
                  {this.state.isOpen && (
                    <DateRangePicker
                      isOpen={this.state.isOpen}
                      maxDate={new Date()}
                      onChange={(value) => {
                        this.setState({
                          from: moment(value[0]).format('YYYY-MM-DD 00:00:00'),
                          to: moment(value[1]).format('YYYY-MM-DD 23:59:59'),
                        });

                        this.get_vendor_data('custom');
                      }}
                      value={[this.state.from, this.state.to]}
                    />
                  )}
                </div>

                <div className="col-lg-3 col-sm-3 col-12">
                  <Link to="/orderreport">
                    <div className="dash-widget">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash1.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h6>Total Orders</h6>
                        <h5>
                          {this.state.isloading ? (
                            <Skeletonloader height={23} count={1} />
                          ) : (
                            <span className="counters">{item.orders}</span>
                          )}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-3 col-sm-3 col-12">
                  <Link to="/salesreport">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h6>Total Sales</h6>
                        <h5>
                          {this.state.isloading ? (
                            <Skeletonloader height={23} count={1} />
                          ) : (
                            <>
                              <BiRupee />
                              <span className="counters">
                                {item.total_earnning.toFixed(2)}
                              </span>
                            </>
                          )}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-3 col-sm-3 col-12">
                  <Link to="/salesreport">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h6>Cash Sales</h6>
                        <h5>
                          {this.state.isloading ? (
                            <Skeletonloader height={23} count={1} />
                          ) : (
                            <>
                              <BiRupee />
                              <span className="counters">
                                {item.cashsale.toFixed(2)}
                              </span>
                            </>
                          )}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-3 col-sm-3 col-12">
                  <Link to="/salesreport">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h6>Online Sales</h6>
                        <h5>
                          {this.state.isloading ? (
                            <Skeletonloader height={23} count={1} />
                          ) : (
                            <>
                              <BiRupee />
                              <span className="counters">
                                {item.online.toFixed(2)}
                              </span>
                            </>
                          )}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-lg-3 col-sm-3 col-12">
                  <div className="dash-widget dash1">
                    <div className="dash-widgetimg">
                      <span>
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                          alt="img"
                        />
                      </span>
                    </div>
                    <div className="dash-widgetcontent">
                      <h6>Weazy Pay</h6>
                      <h5>
                        {this.state.isloading ? (
                          <Skeletonloader height={23} count={1} />
                        ) : (
                          <>
                            <BiRupee />
                            <span className="counters">
                              {item.weazypay.toFixed(2)}
                            </span>
                          </>
                        )}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-3 col-12">
                  <div className="dash-widget">
                    <div className="dash-widgetimg">
                      <span>
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/scan.svg"
                          alt="img"
                        />
                      </span>
                    </div>
                    <div className="dash-widgetcontent">
                      <h6>Total QR Scans</h6>
                      <h5>
                        {this.state.isloading ? (
                          <Skeletonloader height={23} count={1} />
                        ) : (
                          <span className="counters">{item.shop_visit}</span>
                        )}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-sm-3 col-12">
                  <Link to={'/customers'}>
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/user.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h6>Total Customers</h6>
                        <h5>
                          {this.state.isloading ? (
                            <Skeletonloader height={23} count={1} />
                          ) : (
                            <span className="counters">{item.customer}</span>
                          )}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Invoicedashboard;
