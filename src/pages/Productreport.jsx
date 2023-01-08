import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import { Bars, Circles } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
import no_order from '../assets/images/no_orders.webp';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import InfiniteScroll from 'react-infinite-scroll-component';

export class Productreport extends Component {
  static contextType = AuthContext;
  state = {
    data: [],
    is_loading: true,
    load_data: false,
    page: 1,
    value: [new Date(), new Date()],
    start_date: new Date(),
    end_date: new Date(),
    range: 'today',
    is_veg: 'all',
  };
  handleSelect(ranges) {
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  componentDidMount() {
    this.fetch_order(1, '');
    window.Echo.private(`orderstatus.(order_id)`).listen(
      '.order.status',
      (e) => {
        console.log(e);
      }
    );
  }

  fetch_order = (page_id) => {
    fetch(global.api + 'fetch_product_reports', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page_id,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        range: this.state.range,
        is_veg: this.state.is_veg,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          if (page_id == 1) {
            this.setState({ data: [] });
          }
        } else {
          this.setState({
            next_page: json.data.next_page_url,
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
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    };
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Product Report</h4>
              </div>
            </div>
            <div className="comp-sec-wrapper">
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
                          value={this.state.range}
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
                              is_veg: e.target.value,
                            });
                          }}
                          style={{ width: '150px', marginRight: '10px' }}
                          // className="select-container"
                        >
                          <option value={'all'}>All</option>
                          <option value={1}>Veg</option>
                          <option value={0}>Non-Veg</option>
                        </select>
                      </li>
                      <li className="nav-item" style={{ paddingTop: 20 }}>
                        <a
                          className="nav-link active mx-4"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                          onClick={() => {
                            this.setState({ is_loading: true });
                            this.fetch_order(1, '');
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
              <div className="card">
                {this.state.data.length > 0 ? (
                  <div className="card-body">
                    <div className="table-responsive">
                      <InfiniteScroll
                        dataLength={this.state.data.length}
                        next={() => {
                          this.fetch_order(this.state.page + 1);
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
                              <th>Product Name</th>
                              <th>Price</th>
                              <th>Type</th>
                              <th>Sales Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.data.map((item, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{item.product_name}</td>
                                  <td>
                                    <BiRupee />
                                    {item.our_price}
                                  </td>
                                  <td>
                                    {item.is_veg ? <>Veg</> : <> Non-Veg</>}
                                  </td>
                                  <td>{item.salesCount}</td>
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
                    <h3>No Order Found</h3>
                  </div>
                )}
              </div>
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

export default Productreport;
