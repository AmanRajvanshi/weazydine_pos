 import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "../AuthContextProvider";
import moment from "moment";
import no_order from "../assets/images/no_orders.webp";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

class Salesreport extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      is_loading: true,
      load_data: false,
      page: 1,
      value: [new Date(), new Date()],
      start_date:new Date(),
      end_date:new Date()
    };
  }
  handleSelect(ranges) {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  componentDidMount() {
    this.fetch_order(1, "");
    window.Echo.private(`orderstatus.(order_id)`).listen(
      ".order.status",
      (e) => {
        console.log(e);
      }
    );
  }

  fetch_order = (page_id, status) => {
    fetch(global.api + "fetch_sales_reports", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page_id,
        start_date: this.state.start_date,
        end_date:this.state.end_date
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          if (page_id == 1) {
            this.setState({ data: [], is_loading: false });
          }
        } else {
         console.log(json.data.data);
          this.setState({ data: json.data.data });
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
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Sales Report</h4>
              </div>
            </div>
            <div className="comp-sec-wrapper" style={{backgroundColor:'white',padding:10,borderRadius:10}}>
              <section className="comp-section">
                <div className="row pb-4">
                  <div className="col-md-12">
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                      <li className="nav-item">
                        <label>
                          From To
                        </label>
                        <DateRangePicker
                          onChange={(value) =>
                            this.setState({start_date:value[0].toLocaleDateString('zh-Hans-CN'),end_date:value[1].toLocaleDateString('zh-Hans-CN'),value:value})
                            // console.log(value[1].toLocaleDateString())
                          }
                          format="dd/MM/y"
                          value={this.state.value}
                          maxDate={new Date()}
                          className="date_range_picker_styling"
                        />
                      </li>
                      <li className="nav-item">
                      <label >
                         Select type
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            this.setState({
                              parent_category_id: e.target.value,
                            });
                          }}

                        style={{width:'150px'}}
                          // className="select-container"
                        >
                          <option value="all">All</option>
                          <option value="TakeAway">TakeAway</option>
                          <option value="Delivery">Delivery</option>
                          <option value="Dine-In">Dine-In</option>
                        </select>
                      </li>

                      <li className="nav-item">
                      <label>
                         Order Status
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            this.setState({
                              parent_category_id: e.target.value,
                            });
                          }}

                        style={{width:'150px'}}
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
                      <li className="nav-item" style={{paddingTop:20}}>
                        <a
                          className="nav-link active mx-4"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                          onClick={() => {
                            this.setState({ is_loading: true });
                            this.fetch_order(1, "");
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
                      <table className="table  datanew">
                        <thead>
                          <tr>
                            <th>S.no</th>
                            <th>Time</th>
                            
                           
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Payment Channel</th>
                            <th>OrderID</th>
                            <th>Txn ID</th>
                            <th>Type</th>
                            {/* <th>Status</th> */}
                            {/* <th style={{ textAlign: "end" }}>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                {moment(item.created_at).format("llll")}
                                {}
                              </td>
                              <td>
                                <BiRupee />
                                {item.txn_amount}
                              </td>
                              <td>
                                {item.txn_method}
                              </td>
                              <td>
                                {item.txn_channel}
                              </td>
                           
                              <td>{item.orders.order_code}</td>
                              <td>{item.payment_txn_id}</td>
                              <td>
                                {item.txn_status}
                              </td>
                             
                              {/* <td
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <Link to={"/orderdetails/" + item.order_code}>
                                  <button
                                    className="btn btn-primary"
                                    style={{
                                      marginRight: "10px",
                                      padding: "2px 6px",
                                    }}
                                  >
                                    <i className="fa fa-eye"></i>
                                  </button>
                                </Link>
                              </td> */}
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
                        height: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        margin: "40px 0",
                      }}
                    >
                      <img src={no_order} alt="" />
                      <h3>No Records Found</h3>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="main_loader"
                style={{
                  height: "60vh",
                }}
              >
                <Bars
                  height="80"
                  width="80"
                  color="#eda332"
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
