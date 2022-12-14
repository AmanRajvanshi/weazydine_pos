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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export class CustomerInsights extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      customer_data: [],
      is_loading: true,
      load_data: false,
      page: 1,
      value: [new Date(), new Date()],
      start_date: new Date(),
      end_date: new Date(),
      // data: [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 }],
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
    fetch(global.api + 'fetch_customer_vendor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page_id,
        status: 'all',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          if (page_id == 1) {
            this.setState({ customer_data: [], is_loading: false });
          }
        } else {
          this.setState({ customer_data: json.data.data });
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
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Customer Insights</h4>
              </div>
            </div>
            <Tabs className="my-tabs">
              <TabList>
                <Tab>
                  <p>Customer Snapshot</p>
                </Tab>
                <Tab>
                  <p>Customer List</p>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="card">
                  <div className="card-body">
                    <h3>
                      <strong>Customer Snapshot</strong>
                    </h3>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="customer_snapshot_main_div">
                          <h3>Total Unique Customers</h3>
                          <h4>0</h4>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="customer_snapshot_main_div">
                          <h3>First time customers</h3>
                          <h4>0</h4>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="customer_snapshot_main_div">
                          <h3>Customers with more than 1 order</h3>
                          <h4>0</h4>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="customer_snapshot_main_div">
                          <h3>Customers won back</h3>
                          <h4>0</h4>
                        </div>
                      </div>
                    </div>
                    {/* <LineChart width={600} height={300} data={data}>
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="name" />
                      <YAxis />
                    </LineChart> */}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                {!this.state.is_loading ? (
                  <div className="card">
                    {this.state.customer_data.length > 0 ? (
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table  datanew">
                            <thead>
                              <tr>
                                <th>S.no</th>
                                <th>Customer Name</th>
                                <th>Contact </th>
                                <th>Email</th>
                                <th>Total Orders</th>
                                <th>Date of Joining</th>
                                <th>Date of Birth</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.customer_data.map((item, index) => (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>
                                    {item.name == null ? 'N/A' : item.name}
                                  </td>
                                  <td>{item.contact}</td>
                                  <td>
                                    {item.email == null ? 'N/A' : item.email}
                                  </td>
                                  <td>
                                    {item.orders == null || item.orders == 0
                                      ? 'N/A'
                                      : item.orders}
                                  </td>
                                  <td>{moment(item.created_at).format('L')}</td>
                                  <td>
                                    {item.dob == null ||
                                    item.dob == '02/02/1996'
                                      ? 'N/A'
                                      : moment(item.dob).format('L')}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="page-wrapper">
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
                          <h3>No Customer Found</h3>
                        </div>
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
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerInsights;
