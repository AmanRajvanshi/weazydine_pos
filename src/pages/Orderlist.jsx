import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import { Bars, Circles } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
import no_order from '../assets/images/no_orders.webp';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet';
import OrdersTable from '../othercomponent/OrdersTable';

class Orderlist extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      is_loading: true,
      load_data: false,
      page: 1,
      next_page: '',
      status: '',
      search: '',
    };
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

  fetch_order = (page_id, status) => {
    fetch(global.api + 'get_orders_vendor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page_id,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          if (page_id == 1) {
            this.setState({ data: [], is_loading: false });
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
        this.setState({ is_loading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  search_order = (e, page_id) => {
    if (!e.target.value.length < 1) {
      this.setState({ data: [], is_loading: true, page_id: 1 });
      fetch(global.api + 'search_order', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          order_code: e.target.value,
          page: page_id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            if (page_id == 1) {
              this.setState({ data: [], is_loading: false });
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
          this.setState({ is_loading: false });
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    } else {
      this.setState({ is_loading: true, page_id: 1 });
      this.fetch_order(1, '');
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Orders | Weazy Dine</title>
        </Helmet>
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Orders</h4>
                </div>
              </div>
              <div className="comp-sec-wrapper">
                <section className="comp-section">
                  <div className="row pb-4">
                    <div className="col-md-12">
                      <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({ is_loading: true, status: '' });
                              this.fetch_order(1, '');
                            }}
                          >
                            All
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({
                                is_loading: true,
                                status: 'placed',
                              });
                              this.fetch_order(1, 'placed');
                            }}
                          >
                            Pending
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({
                                is_loading: true,
                                status: 'confirmed',
                              });
                              this.fetch_order(1, 'confirmed');
                            }}
                          >
                            Confirmed
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({
                                is_loading: true,
                                status: 'in_process',
                              });
                              this.fetch_order(1, 'in_process');
                            }}
                          >
                            In Process
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({
                                is_loading: true,
                                status: 'processed',
                              });
                              this.fetch_order(1, 'processed');
                            }}
                          >
                            Processed
                          </a>
                        </li>

                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({
                                is_loading: true,
                                status: 'completed',
                              });
                              this.fetch_order(1, 'completed');
                            }}
                          >
                            Completed
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({
                                is_loading: true,
                                status: 'cancelled',
                              });
                              this.fetch_order(1, 'cancelled');
                            }}
                          >
                            Cancelled
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
              <div className="row">
                <div className="col-md-8"></div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search using order id"
                      onChange={(e) => {
                        this.search_order(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              {!this.state.is_loading ? (
                <div className="card">
                  {this.state.data.length > 0 ? (
                    <div className="card-body">
                      <div className="table-responsive">
                        <OrdersTable
                          fetch_order={this.fetch_order}
                          next_page={this.state.next_page}
                          page={this.state.page}
                          status={this.state.status}
                          data={this.state.data}
                        />
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
      </>
    );
  }
}

export default Orderlist;
