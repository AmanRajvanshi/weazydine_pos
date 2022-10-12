import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";
import { Bars } from "react-loader-spinner";
import { AuthContext } from "../AuthContextProvider";
import moment from "moment";
import no_order from "../assets/images/no_orders.webp";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export class Kot extends Component {
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
  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header sidebar={false} />
          <div
            className="page-wrapper"
            style={{
              margin: "0 0 0 20px",
            }}
          >
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>KOT (Kitchen Order Ticket)</h4>
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
                            Processing
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
                            Processed
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
              {this.state.is_loading ? (
                <div className="row">
                  <Order dat={this.state.data} />
                </div>
              ) : (
                // <div className="page-wrapper">
                //   <div
                //     className="content"
                //     style={{
                //       height: "60vh",
                //       display: "flex",
                //       justifyContent: "center",
                //       alignItems: "center",
                //       flexDirection: "column",
                //       margin: "40px 0",
                //     }}
                //   >
                //     <img src={no_order} alt="" />
                //     <h3>No Order Found</h3>
                //   </div>
                // </div>

                <div className="main_loader" style={{ marginLeft: "0px" }}>
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
      </>
    );
  }
}

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      open: false,
      openupdate: false,
      time: 5,
    };
  }
  render() {
    return (
      <>
        <div className="col-md-4">
          <div
            className="card flex-fill bg-white cursor_pointer"
            onClick={() => this.setState({ open: true })}
          >
            <div
              className="card-header order_details"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #e5e5e5",
                padding: "10px 15px",
                backgroundColor: "#eda332",
                color: "#fff",
              }}
            >
              <div>
                {/* <h6
                style={{
                  fontSize: "15px",
                }}
              >
                Order ID: WD-121211 -{" "}
                {this.state.data.order_type != "TakeAway" &&
                this.state.data.order_type != "delivery" ? (
                  <span>
                    Dine-In{" "}
                    {this.state.data.table != null ? (
                      ""
                    ) : (
                      // <span>{this.state.data.table.table_name}</span>
                      <span>12</span>
                    )}
                  </span>
                ) : (
                  <span>{this.state.data.order_type}</span>
                )}
              </h6>

              <h6
                className="mt-2"
                style={{
                  fontSize: "14px",
                }}
              >
                {moment(this.state.data.updated_at).format("lll")}{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                    fontSize: "14px",
                  }}
                >
                  Order Status: {this.state.data.order_status}
                </span>
              </h6> */}
              </div>
            </div>
            <div className="card-body">
              <section
                className="item-section"
                style={{
                  padding: "20px 0 0!important",
                }}
              >
                <div className="item_row">
                  <div
                    className="sno_column_heading"
                    style={{
                      width: "15%",
                    }}
                  >
                    No.
                  </div>
                  <div
                    className="item_name_column_heading"
                    style={{
                      width: "70%",
                    }}
                  >
                    Item
                  </div>
                  <div
                    className="qty_column_heading"
                    style={{
                      width: "15%",
                    }}
                  >
                    Qty.
                  </div>
                </div>
                <div className="single_item_row">
                  <div
                    className="sno_column"
                    style={{
                      width: "15%",
                    }}
                  >
                    {1}
                  </div>
                  <div
                    className="item_name_column"
                    style={{
                      width: "70%",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600px",
                        marginRight: "10px",
                      }}
                    >
                      Pizza
                    </span>

                    {/* {item.variant != null && ( */}
                    <span>
                      <strong>Variant</strong> - aaa
                    </span>
                    {/* )} */}

                    <div className="media-body-cart">
                      {/* {item.addons.length > 0 && ( */}
                      <>
                        <strong>AddOns: </strong>
                        {/* {item.addons.map((items) => { */}
                        return (<span className="addon_text_order">aa</span>
                        );
                        {/* })} */}
                      </>
                      {/* )} */}
                    </div>
                  </div>
                  <div
                    className="qty_column"
                    style={{
                      width: "15%",
                    }}
                  >
                    x {3}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Edit Order Status</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Time to prepare the order.</label>
                      <div className="d-flex align-items-center">
                        {this.state.time <= 5 ? (
                          <a className="btn btn-primary mx-2 disabled">
                            <i className="fa-solid fa-minus"></i>
                          </a>
                        ) : (
                          <a
                            className="btn btn-primary mx-2"
                            onClick={() => {
                              this.setState({ time: this.state.time - 1 });
                            }}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </a>
                        )}
                        <input
                          type="text"
                          className="text-center mx-2"
                          onChange={(e) => {
                            this.setState({
                              time: e.target.value,
                            });
                          }}
                          value={this.state.time}
                          readOnly
                        />
                        <h6>Minutes</h6>
                        <a
                          className="btn btn-primary mx-2"
                          onClick={() => {
                            this.setState({
                              time: this.state.time + 1,
                            });
                          }}
                        >
                          <i className="fa-solid fa-add"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.is_buttonloding ? (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        style={{
                          pointerEvents: "none",
                          opacity: "0.8",
                        }}
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Updating
                      </button>
                    ) : (
                      <a
                        onClick={() => {
                          this.add();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Update Status
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.openupdate}
          onClose={() => this.setState({ openupdate: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Update Order Status</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Are you sure you want to change the status of this
                        order.
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-between">
                    <a
                      onClick={() => {
                        this.add();
                      }}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Cancel
                    </a>
                    {this.state.is_buttonloding ? (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        style={{
                          pointerEvents: "none",
                          opacity: "0.8",
                        }}
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Updating
                      </button>
                    ) : (
                      <a
                        onClick={() => {
                          this.add();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Mark as prepared
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default Kot;
