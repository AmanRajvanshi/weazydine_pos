import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "../AuthContextProvider";
import moment from "moment";
import no_order from "../assets/images/no_orders.webp";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

export class Orderreport extends Component {
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
    fetch(global.api + "fetch_order_reports", {
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
          console.log(json.data);
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
                <h4>Order Report</h4>
              </div>
            </div>
            <div className="comp-sec-wrapper">
              <section className="comp-section">
                <div className="row pb-4">
                  <div className="col-md-12">
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                      <li className="nav-item">
                        <DateRangePicker
                          onChange={(value) =>
                            this.setState({start_date:value[0].toLocaleDateString('zh-Hans-CN'),end_date:value[1].toLocaleDateString('zh-Hans-CN'),value:value})
                           
                          }
                          value={this.state.value}
                          maxDate={new Date()}
                          className="date_range_picker_styling"
                        />
                      </li>
                      <li className="nav-item">
                        <select
                          onChange={(e) => {
                            this.setState({
                              parent_category_id: e.target.value,
                            });
                          }}
                          className="select-container"
                        >
                          <option>All</option>
                          <option value={0}>None</option>
                        </select>
                      </li>
                      <li className="nav-item">
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
                            <th>Order Id</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Discount</th>
                            <th>Tax</th>
                            <th>Total Amount</th>
                          
                            <th>Order Channel</th>
                            <th>Date Time</th>
                            <th>Order Type</th>
                            <th style={{ textAlign: "end" }}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.order_code}</td>
                              <td>{item.user.name}</td>
                              <td>
                                <BiRupee />
                                {item.order_amount}
                              </td>
                              <td>
                              <BiRupee />
                                {item.order_discount}
                              </td>
                            <td>
                            <BiRupee />
                                {item.cgst}
                            </td>
                              <td>
                              <BiRupee />
                                {item.total_amount}
                              </td>
                              <td>
                                {item.channel}
                              </td>
                              <td>
                                {moment(item.created_at).format("llll")}
                                {}
                              </td>
                              <td>
                                {item.order_type != "TakeAway" &&
                                item.order_type != "Delivery" ? (
                                  <>Dine-In</>
                                ) : (
                                  <>{item.order_type}</>
                                )}
                              </td>
                              <td>
                                {item.order_status == "placed" ? (
                                  <span
                                    style={{
                                      // color: {item.order_status == "Pending"?"red":{item.order_status == "Pending"?}"green"},
                                      color: "#eda332",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.order_status}
                                  </span>
                                ) : item.order_status == "ongoing" ? (
                                  <span
                                    style={{
                                      color: "#eda332",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.order_status}
                                  </span>
                                ) : item.order_status == "processed" ? (
                                  <span
                                    style={{
                                      color: "#eda332",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.order_status}
                                  </span>
                                ) : item.order_status == "completed" ? (
                                  <span
                                    style={{
                                      color: "green",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.order_status}
                                  </span>
                                ) : (
                                  <span
                                    style={{
                                      color: "red",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {item.order_status}
                                  </span>
                                )}
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
                        height: "60vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        margin: "40px 0",
                      }}
                    >
                      <img src={no_order} alt="" />
                      <h3>No Order Found</h3>
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

export default Orderreport;
