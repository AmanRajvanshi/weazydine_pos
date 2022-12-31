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

export class Orderinvoices extends Component {
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
    fetch(global.api + 'fetch_credit_orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          if (page_id == 1) {
            this.setState({ data: [] });
          }
        } else {
          this.setState({ data: json.data });
        }
        this.setState({ is_loading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
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
                  <h4>Order Invoices</h4>
                </div>
              </div>
              {!this.state.is_loading ? (
                <div className="card">
                  {this.state.data.length > 0 ? (
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table  datanew">
                          <thead>
                            <tr>
                              <th>S.no</th>
                              <th>Transaction ID</th>
                              <th>Transaction Amount</th>
                              <th>Transaction Status</th>
                              <th>Transaction Method</th>
                              <th>Transaction Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.data.map((item, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.txn_id}</td>
                                <td>
                                  <BiRupee />
                                  {item.txn_amount}
                                </td>
                                <td
                                  style={{
                                    textTransform: 'capitalize',
                                    color:
                                      item.txn_status == 'success'
                                        ? 'green'
                                        : 'red',
                                  }}
                                >
                                  {item.txn_status}
                                </td>
                                <td>{item.txn_method}</td>
                                <td>
                                  {moment(item.created_at).format('llll')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default Orderinvoices;
