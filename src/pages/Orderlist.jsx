import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "../AuthContextProvider";
import moment from "moment";
import no_order from "../assets/images/no_orders.webp";

class Orderlist extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      is_loading: true,
      load_data: false,
      page: 1,
    };
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
    fetch(global.api + "get_orders_vendor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

  // columns = [
  //   {
  //     dataField: "index",
  //     text: "S.No",
  //   },
  //   {
  //     dataField: "order_id",
  //     text: "Order Id",
  //   },
  //   {
  //     dataField: "customer",
  //     text: "Customer",
  //   },
  //   {
  //     dataField: "order_price",
  //     text: "Order Price",
  //   },
  //   {
  //     dataField: "date",
  //     text: "Date",
  //   },
  //   {
  //     dataField: "order_type",
  //     text: "Order Type",
  //   },
  //   {
  //     dataField: "status",
  //     text: "Status",
  //   },
  //   {
  //     dataField: "action",
  //     text: "Action",
  //   },
  // ];
  // sortableColumn = [
  //   {
  //     dataField: "index",
  //     text: "S.No",
  //     sort: true,
  //   },
  //   {
  //     dataField: "order_id",
  //     text: "Order Id",
  //     sort: true,
  //   },
  //   {
  //     dataField: "customer",
  //     text: "Customer",
  //     sort: true,
  //   },
  //   {
  //     dataField: "order_price",
  //     text: "Order Price",
  //     sort: true,
  //   },
  //   {
  //     dataField: "date",
  //     text: "Date",
  //     sort: true,
  //   },
  //   {
  //     dataField: "order_type",
  //     text: "Order Type",
  //     sort: true,
  //   },
  //   {
  //     dataField: "status",
  //     text: "Status",
  //     sort: true,
  //   },
  //   {
  //     dataField: "action",
  //     text: "Action",
  //     sort: true,
  //   },
  // ];

  // paginationOptions = {
  //   // custom: true,
  //   paginationSize: 5,
  //   pageStartIndex: 1,
  //   firstPageText: "First",
  //   prePageText: "Back",
  //   nextPageText: "Next",
  //   lastPageText: "Last",
  //   nextPageTitle: "First page",
  //   prePageTitle: "Pre page",
  //   firstPageTitle: "Next page",
  //   lastPageTitle: "Last page",
  //   showTotal: true,
  //   totalSize: this.state.data.length,
  // };

  render() {
    return (
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
                            this.setState({ is_loading: true });
                            this.fetch_order(1, "");
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
                            this.setState({ is_loading: true });
                            this.fetch_order(1, "placed");
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
                            this.setState({ is_loading: true });
                            this.fetch_order(1, "confirmed");
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
                            this.setState({ is_loading: true });
                            this.fetch_order(1, "processed");
                          }}
                        >
                          OnGoing
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                          onClick={() => {
                            this.setState({ is_loading: true });
                            this.fetch_order(1, "completed");
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
                            this.setState({ is_loading: true });
                            this.fetch_order(1, "cancelled");
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
            {!this.state.is_loading ? (
              <div className="card">
                {this.state.data.length > 0 ? (
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table  datanew">
                        <thead>
                          <tr>
                            <th>S.no</th>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Order Price</th>
                            <th>Date</th>
                            <th>Order Type</th>
                            <th>Status</th>
                            <th style={{ textAlign: "end" }}>Action</th>
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
                                {item.total_amount}
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
                                      color: "yellow",
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
                              <td
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

export default Orderlist;
