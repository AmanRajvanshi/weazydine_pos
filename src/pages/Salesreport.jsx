import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import { Bars, Circles } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
import no_order from '../assets/images/no_orders.webp';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import InfiniteScroll from 'react-infinite-scroll-component';

class Salesreport extends Component {
  static contextType = AuthContext;
  state = {
    data: [],
    is_loading: true,
    load_data: false,
    page: 1,
    isOpen: false,
    from: new Date(),
    to: new Date(),
    range: 'today',
    last_page: 1,
    total: 0,
    online: 0,
    cash: 0,
    weazypay: 0,
  };

  handleSelect(ranges) {}

  componentDidMount() {
    this.fetch_order(1, 'today');
  }

  fetch_order = (page_id, range) => {
    fetch(global.api + 'fetch_sales_reports', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page_id,
        range: range,
        start_date: this.state.from,
        end_date: this.state.to,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          if (page_id == 1) {
            this.setState({ data: [] });
          }
        } else {
          this.setState({
            next_page: json.data.next_page_url,
            total: json.total_earnning,
            online: json.online,
            cash: json.cashsale,
            weazypay: json.weazypay,
          });
          if (page_id == 1) {
            this.setState({ data: json.data.data });
          } else {
            {
              this.state.next_page
                ? this.setState({
                    data: [...this.state.data, ...json.data.data],
                    page: this.state.page + 1,
                  })
                : this.setState({
                    data: json.data.data,
                  });
            }
          }
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ is_loading: false });
      });
  };

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Transactions Report</h4>
              </div>
            </div>
            <div
              className="comp-sec-wrapper"
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <section className="comp-section">
                <div className="row pb-4">
                  <div className="col-md-12">
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                      <li className="nav-item">
                        <label></label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            if (e.target.value == 'customrange') {
                              this.setState({
                                isOpen: !this.state.isOpen,
                                range: 'custom',
                              });
                            } else {
                              this.setState({
                                isOpen: false,
                                range: e.target.value,
                              });
                            }
                          }}
                          value={this.state.value}
                          style={{ width: '150px', marginRight: '10px' }}
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
                                from: moment(value[0]).format(
                                  'YYYY-MM-DD 00:00:00'
                                ),
                                to: moment(value[1]).format(
                                  'YYYY-MM-DD 23:59:59'
                                ),
                              });
                            }}
                            value={[this.state.from, this.state.to]}
                          />
                        )}
                      </li>
                      <li className="nav-item">
                        <label>Select type</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            this.setState({
                              parent_category_id: e.target.value,
                            });
                          }}
                          style={{ width: '150px', marginRight: '10px' }}
                          // className="select-container"
                        >
                          <option value="all">All</option>
                          <option value="TakeAway">TakeAway</option>
                          <option value="Delivery">Delivery</option>
                          <option value="Dine-In">Dine-In</option>
                        </select>
                      </li>

                      <li className="nav-item">
                        <label>Order Status</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            this.setState({
                              parent_category_id: e.target.value,
                            });
                          }}
                          style={{ width: '150px', marginRight: '10px' }}
                          // className="select-container"
                        >
                          <option value="all">All</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in_process">In process</option>
                          <option value="processed">Processed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </li>
                      <li className="nav-item" style={{ paddingTop: 20 }}>
                        <a
                          className="nav-link active mx-4"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                          onClick={() => {
                            this.setState({ is_loading: true });
                            this.fetch_order(1, this.state.range);
                          }}
                        >
                          Search
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
            {!this.state.is_loading ? (
              <>
                <div className="row mt-4">
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
                        <h5>
                          <BiRupee />
                          <span className="counters">
                            {this.state.total.toFixed(2)}
                          </span>
                        </h5>
                        <h6>Total Sales</h6>
                      </div>
                    </div>
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
                        <h5>
                          <BiRupee />
                          <span className="counters">
                            {this.state.online.toFixed(2)}
                          </span>
                        </h5>
                        <h6>Online Sales</h6>
                      </div>
                    </div>
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
                        <h5>
                          <BiRupee />
                          <span className="counters">
                            {this.state.cash.toFixed(2)}
                          </span>
                        </h5>
                        <h6>Cash Sales</h6>
                      </div>
                    </div>
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
                        <h5>
                          <BiRupee />
                          <span className="counters">
                            {this.state.weazypay.toFixed(2)}
                          </span>
                        </h5>
                        <h6>Weazy Pay</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  {this.state.data.length > 0 ? (
                    <div className="card-body">
                      <div className="table-responsive">
                        <InfiniteScroll
                          dataLength={this.state.data.length}
                          next={() => {
                            this.fetch_order(
                              this.state.page + 1,
                              this.state.range
                            );
                            this.setState({
                              // page: this.state.page + 1,
                              loadMore: true,
                            });
                          }}
                          hasMore={
                            this.state.next_page !== null &&
                            this.state.data.length > 0
                          }
                          loader={
                            <div className="d-flex align-items-center justify-content-center w-full mt-xl">
                              <Circles height="40" width="40" color="#5bc2c1" />
                            </div>
                          }
                        >
                          <table className="table  datanew">
                            <thead>
                              <tr>
                                <th>S.no</th>
                                <th>Time</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Channel</th>
                                <th>Order Code</th>
                                <th>Payment TXN Id</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.data.map((item, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      {moment(item.created_at).format('llll')}
                                    </td>
                                    <td>
                                      <BiRupee />
                                      {item.txn_amount}
                                    </td>
                                    <td>{item.txn_channel}</td>
                                    <td>{item.salesCount}</td>
                                    <td>{item.orders.order_code}</td>
                                    <td>{item.payment_txn_id}</td>
                                    <td>{item.txn_status}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </InfiniteScroll>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="content"
                      style={{
                        height: '60vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        margin: '40px 0',
                      }}
                    >
                      <img src={no_order} alt="" />
                      <h3>No Records Found</h3>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                className="main_loader"
                style={{
                  height: '60vh',
                }}
              >
                <Bars
                  height="80"
                  width="80"
                  color="#5BC2C1"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Salesreport;
