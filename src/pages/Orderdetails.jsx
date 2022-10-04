import React, { Component } from "react";
import Header from "../othercomponent/Header";
import moment from "moment";
import { BiRupee } from "react-icons/bi";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";
import { Bars } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export class Orderdetails extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      edit_user_modal: false,
      data: [],
      cart: [],
      user: [],
      isLoading: true,
      additional_note: "",
    };
  }

  componentDidMount() {
    this.orderDetails(this.props.id);
  }

  orderDetails = (id) => {
    fetch(global.api + "get_orders_details_vendor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_code: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn(json)
        if (!json.status) {
        } else {
          this.setState({
            data: json.data[0],
            cart: json.data[0].cart,
            user: json.data[0].user,
            isLoading: false,
          });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        {this.state.isLoading ? (
          <div className="main_loader">
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
        ) : (
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Order Details</h4>
                </div>
              </div>
              <section className="comp-section comp-cards">
                <div className="row">
                  <div className="col-8">
                    {/* order details */}
                    <div className="card flex-fill bg-white">
                      <div
                        className="card-header order_details"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <h5>Order ID: {this.props.id}</h5>
                          <h6 className="order_date mt-2">
                            {moment(this.state.data.updated_at).format("llll")}
                          </h6>
                        </div>

                        {/* <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            this.setState({ generateBillModal: true });
                          }}
                        >
                          <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                          Generate Bill
                        </button> */}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          {this.state.cart.length}{" "}
                          {this.state.cart.length > 1 ? "Items" : "Item"}
                        </h5>
                        <div className="row">
                          <div className="col-md-12">
                            {/* {this.state.cart.map((values) => {
                              return (
                                <div>
                                  <div className="single_order_product_text my-2">
                                    <p className="single_order_product_text">
                                      {values.product.product_name}
                                    </p>
                                    {values.variant != "null" && (
                                      <p className="single_order_product_text">
                                        <strong>Variant: </strong>
                                        {values.variant.variants_name}
                                      </p>
                                    )}
                                    {values.addons.length > 0 && (
                                      <>
                                        {values.addons.map((value) => {
                                          return (
                                            <p className="single_order_product_text">
                                              <strong>Addon:</strong>{" "}
                                              {value.addon_name}
                                            </p>
                                          );
                                        })}
                                      </>
                                    )}
                                    <p className="single_order_product_text">
                                      <span className="single_product_qty">
                                        {values.product_quantity}
                                      </span>{" "}
                                      x <BiRupee />
                                      {values.product_price} =
                                      <span className="single_product_total">
                                        <BiRupee />
                                        {values.product_price *
                                          values.product_quantity}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              );
                            })} */}

                            <section
                              className="item-section"
                              style={{
                                padding: "20px 0 0!important",
                              }}
                            >
                              <div className="item_row">
                                <div className="sno_column_heading">No.</div>
                                <div className="item_name_column_heading">
                                  Item
                                </div>
                                <div className="price_column_heading">
                                  Price
                                </div>
                                <div className="qty_column_heading">Qty.</div>
                                <div className="amount_column_heading">
                                  Amt.
                                </div>
                              </div>
                              {this.state.cart.map((item, index) => {
                                return (
                                  <div className="single_item_row">
                                    <div className="sno_column">
                                      {index + 1}
                                    </div>
                                    <div className="item_name_column">
                                      <span
                                        style={{
                                          fontWeight: "600px",
                                          marginRight: "10px",
                                        }}
                                      >
                                        {item.product.product_name}
                                      </span>

                                      {item.variant != null && (
                                        <span>
                                          <strong>Variant</strong> -{" "}
                                          {item.variant.variants_name}
                                        </span>
                                      )}

                                      <div className="media-body-cart">
                                        {item.addons.length > 0 && (
                                          <>
                                            <strong>AddOns: </strong>
                                            {item.addons.map((items) => {
                                              return (
                                                <span className="addon_text_order">
                                                  {items.addon_name}
                                                </span>
                                              );
                                            })}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="price_column">
                                      {item.product_price /
                                        item.product_quantity}
                                    </div>
                                    <div className="qty_column">
                                      x {item.product_quantity}
                                    </div>
                                    <div className="amount_column">
                                      {item.product_price}
                                    </div>
                                  </div>
                                );
                              })}
                            </section>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer text-muted">
                        <div className="row">
                          <div className="col-md-6">Item Total</div>
                          <div className="col-md-6 d-flex align-items-start justify-content-end item_total">
                            <div className="d-flex align-items-center">
                              <BiRupee />
                              {this.state.data.order_amount}
                            </div>
                          </div>
                        </div>
                        {this.state.data.cgst > 0 ||
                        this.state.data.sgst > 0 ? (
                          <div className="row">
                            <div
                              className="col-md-6"
                              style={{
                                color: "#28c76f",
                                margin: "10px 0px 0px",
                              }}
                            >
                              Taxes and other Charges
                            </div>
                            <div className="col-md-6 d-flex align-items-start justify-content-end item_total">
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  color: "#28c76f",
                                  margin: "10px 0px 0px",
                                }}
                              >
                                <BiRupee />
                                {this.state.data.cgst + this.state.data.sgst}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {this.state.data.order_discount > 0 && (
                          <div className="row">
                            <div
                              className="col-md-6"
                              style={{
                                color: "#ff0000",
                                margin: "10px 0px 0px",
                              }}
                            >
                              Discount
                            </div>
                            <div className="col-md-6 d-flex align-items-start justify-content-end item_total">
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  color: "#ff0000",
                                  margin: "10px 0px 0px",
                                }}
                              >
                                <BiRupee />
                                {this.state.data.order_discount}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="row">
                          <div className="col-md-6 grand_total">
                            Grand Total
                          </div>
                          <div className="col-md-6 d-flex align-items-start justify-content-end">
                            <div className="d-flex align-items-center grand_total">
                              <BiRupee />
                              {this.state.data.total_amount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* user details */}
                  </div>
                  <div className="col-4">
                    <div className="card flex-fill bg-white">
                      <div className="card-header order_details">
                        <div className=" d-flex align-items-center justify-content-between">
                          <h5>Customer details</h5>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-6 col-12">
                            <div className="form-group">
                              <label>Customer Name</label>
                              <input
                                type="text"
                                readOnly
                                value={this.state.user.name}
                                style={{
                                  border: "none",
                                  borderBottom: "1px solid black",
                                  borderRadius: 0,
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-12">
                            <div className="form-group">
                              <label>Mobile</label>
                              <input
                                type="text"
                                readOnly
                                value={this.state.user.contact}
                                style={{
                                  border: "none",
                                  borderBottom: "1px solid black",
                                  borderRadius: 0,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card flex-fill bg-white"
                      style={{
                        height: "200px",
                      }}
                    >
                      <div className="card-body">
                        <div className=" d-flex align-items-start justify-content-between pb-4">
                          <h5>Notes</h5>
                          <a
                            className="btn btn-added"
                            style={{
                              color: "#eda332",
                            }}
                            onClick={() => this.setState({ open: true })}
                          >
                            Add
                          </a>
                        </div>
                        <p>{this.state.additional_note}</p>
                      </div>
                    </div>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-submit me-2 w-100 d-flex align-items-center justify-content-center"
                    >
                      <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                      <p>Print Receipt</p>
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="btn btn-submit me-2 my-2 w-100 d-flex align-items-center justify-content-center"
                    >
                      <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                      <p>Print KOT</p>
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header m-0">
              <div className="page-title">
                <h4>Add Notes</h4>
                <p className="text-danger text-muted m-0">
                  Max characters 100*
                </p>
              </div>
            </div>
            <div className="card border-none">
              <div className="card-body p-0 pt-4">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        rows={5}
                        className="form-control"
                        placeholder="Enter Notes"
                        onChange={(e) =>
                          this.setState({ additional_note: e.target.value })
                        }
                        value={this.state.additional_note}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-submit btn-sm"
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default (props) => <Orderdetails {...useParams()} {...props} />;
