import React, { Component } from "react";
import Header from "../othercomponent/Header";
import moment from "moment";
import { BiRupee } from "react-icons/bi";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider";
import { Bars } from "react-loader-spinner";
import no_order from "../assets/images/no_orders.webp";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { toast } from "react-toastify";

export class TableOrderDetails extends Component {
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
      generateBillModal: false,
      total_amount: "",
      order_code: "",
      bill: [],
      payment: "",
      generate_order_buttonLoading: false,
      mark_complete_buttonLoading: false,
    };
  }

  componentDidMount() {
    this.orderDetails(this.props.id);
  }

  orderDetails = (id) => {
    fetch(global.api + "fetch_ongoing_order_for_table", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        table_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn(json)
        if (!json.status) {
          this.setState({ isLoading: false, data: [] });
        } else {
          this.setState({
            data: json.data,
            cart: json.data[0].cart,
            user: json.data[0].user,
            isLoading: false,
            total_amount: json.data[0].total_amount,
            order_code: json.data[0].order_code,
          });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  genrate_bill = () => {
    this.setState({ generate_order_buttonLoading: true });
    fetch(global.api + "generate_bill_by_table", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        table_id: this.props.id,
        order_id: this.state.order_code,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if (!json.status) {
          var msg = json.msg;
        } else {
          if (json.data.length > 0) {
            this.setState({ bill: json.data[0] });
            this.setState({ cart: json.data[0].cart });
          }
          this.setState({ generateBillModal: true });
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ generate_order_buttonLoading: false });
      });
  };

  mark_complete = () => {
    this.setState({ mark_complete_buttonLoading: true });
    fetch(global.api + "update_order_status_by_vendor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_id: this.state.bill.id,
        payment_method: this.state.payment,
        order_status: "completed",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({ modalVisible: false });
          this.props.navigate(-1);
          toast.success("Order Completed");
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ mark_complete_buttonLoading: false });
      });
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
          <>
            {this.state.data.length > 0 ? (
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
                              <h5>Order ID: {this.state.data[0].order_code}</h5>
                              <h6 className="order_date mt-2">
                                {moment(this.state.data.updated_at).format(
                                  "llll"
                                )}
                              </h6>
                            </div>
                            {this.state.generate_order_buttonLoading ? (
                              <button
                                className="btn btn-primary btn-sm"
                                style={{
                                  pointerEvents: "none",
                                  opacity: "0.8",
                                }}
                              >
                                <span
                                  class="spinner-border spinner-border-sm me-2"
                                  role="status"
                                ></span>
                                Generating Bill
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  this.genrate_bill();
                                }}
                              >
                                <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                                Generate Bill
                              </button>
                            )}
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
                                    <div className="sno_column_heading">
                                      No.
                                    </div>
                                    <div className="item_name_column_heading">
                                      Item
                                    </div>
                                    <div className="price_column_heading">
                                      Price
                                    </div>
                                    <div className="qty_column_heading">
                                      Qty.
                                    </div>
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
                                  {this.state.data[0].order_amount}
                                </div>
                              </div>
                            </div>
                            {this.state.data[0].cgst > 0 ||
                            this.state.data[0].sgst > 0 ? (
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
                                    {this.state.data[0].cgst +
                                      this.state.data[0].sgst}
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
                                    {this.state.data[0].order_discount}
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
                                  {this.state.data[0].total_amount}
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
            ) : (
              <div className="page-wrapper">
                <div
                  className="content"
                  style={{
                    height: "92vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img src={no_order} alt="" />
                  <h3>No Order Found</h3>
                </div>
              </div>
            )}
          </>
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
                      className="btn btn-submit me-2"
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.generateBillModal}
          onClose={() => this.setState({ generateBillModal: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header m-0 text-center">
              <div className="page-title text-center">
                <h4>Generating Bill</h4>
                <p>
                  Total Bill Amount - <BiRupee /> {this.state.total_amount}
                </p>
              </div>
            </div>
            <div className="card border-none">
              <div className="card-body p-0 pt-4">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      {/* <label>VEG/NON-VEG</label> */}
                      <div>
                        <RadioGroup
                          onChange={(value) => {
                            this.setState({ payment: value });
                          }}
                          value={this.state.payment}
                        >
                          <RadioButton
                            value="upi"
                            pointColor="#eda332"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Google Pay/Paytm/UPI
                          </RadioButton>
                          <RadioButton
                            value="card"
                            pointColor="#eda332"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Credit/Debit Card
                          </RadioButton>
                          <RadioButton
                            value="cash"
                            pointColor="#eda332"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Cash
                          </RadioButton>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.mark_complete_buttonLoading ? (
                      <button
                        className="btn btn-primary btn-sm"
                        style={{
                          pointerEvents: "none",
                          opacity: "0.8",
                        }}
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Please wait
                      </button>
                    ) : (
                      <a
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          this.mark_complete();
                        }}
                      >
                        Complete Order
                      </a>
                    )}
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

function Navigate(props) {
  const abcd = useNavigate();
  const location = useLocation();
  return (
    <TableOrderDetails
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
