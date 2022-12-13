import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import moment from 'moment';
import { BiRupee } from 'react-icons/bi';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider';
import { Bars } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import ReactToPrint from 'react-to-print';
import PrintKot from '../component/PrintKot';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

let EscPosEncoder = require('esc-pos-encoder');

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
      additional_note: '',
      generateBillModal: false,
      generate_order_buttonLoading: false,
      bill: [],
      cart_new: [],
      payment: '',
      time: 5,
      total_amount: '',
      split_bill_amount_other: '',
      split_bill_amount_cash: '',
      is_buttonloding: false,
      splitModal: false,
      vendor_details: [],
      user_details: [],
      cart_details: [],
      transaction_details: [],
    };
  }

  componentDidMount() {
    this.getOrderDetails(this.props.id);
    this.orderDetails(this.props.id);
    window.Echo.private(`orderstatus.` + this.props.id).listen(
      '.order.status',
      (e) => {
        console.log(e);
      }
    );
  }

  orderDetails = (id) => {
    fetch(global.api + 'get_orders_details_vendor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_code: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
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

  change_order_status = (status) => {
    this.setState({ mark_complete_buttonLoading: true });
    fetch(global.api + 'update_order_status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_id: this.state.data.order_code,
        status: status,
        prepare_time: this.state.time,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({
            open: false,
          });
          this.orderDetails(this.props.id);
          toast.success('Order Status Updated Successfully');
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

  genrate_bill = (id) => {
    this.setState({ generate_order_buttonLoading: true });
    fetch(global.api + 'generate_bill_by_table', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        table_id: this.state.data.table.table_uu_id,
        order_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
        } else {
          if (json.data.length > 0) {
            this.setState({
              total_amount: json.data[0].total_amount,
              bill: json.data[0],
            });
            this.setState({ cart_new: json.data[0].cart });
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
    fetch(global.api + 'update_order_status_by_vendor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_id: this.state.bill.id,
        payment_method: this.state.payment,
        order_status: 'completed',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({ generateBillModal: false });
          this.props.navigate(-1);
          toast.success('Order Completed');
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

  getOrderDetails = (id) => {
    fetch(global.api + 'get_orders_details_vendor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_code: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
        } else {
          this.setState({
            data: json.data[0],
            vendor_details: json.data[0].vendor,
            user_details: json.data[0].user,
            cart_details: json.data[0].cart,
            transaction_details: json.data[0].transactions,
            isLoading: false,
          });
          // var content = document.getElementById("divcontents");
          // var pri = document.getElementById("invoice-POS").contentWindow;
          // pri.document.open();
          // pri.document.write(content.innerHTML);
          // pri.document.close();
          // pri.focus();
          // pri.print();
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  sendUrlToPrint = (url) => {
    var beforeUrl = 'intent:';
    var afterUrl = '#Intent;';
    // Intent call with component
    afterUrl +=
      'component=ru.a402d.rawbtprinter.activity.PrintDownloadActivity;';
    afterUrl += 'package=ru.a402d.rawbtprinter;end;';
    document.location = beforeUrl + encodeURI(url) + afterUrl;
    return false;
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
              color="#5BC2C1"
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
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <h5>
                            Order ID: {this.props.id} -{' '}
                            {this.state.data.order_type != 'TakeAway' &&
                            this.state.data.order_type != 'Delivery' ? (
                              <span
                                style={{
                                  color: '#5BC2C1',
                                }}
                              >
                                Dine-In{' '}
                                {this.state.data.table == null ? (
                                  ''
                                ) : (
                                  <span>
                                    {this.state.data.table.table_name}
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: '#5BC2C1',
                                }}
                              >
                                {this.state.data.order_type}
                              </span>
                            )}
                          </h5>

                          <h6 className="order_date mt-2">
                            {moment(this.state.data.created_at).format('llll')}{' '}
                            <span
                              style={{
                                color:
                                  this.state.data.order_status == 'pending'
                                    ? 'red'
                                    : this.state.data.order_status ==
                                      'confirmed'
                                    ? '#5BC2C1'
                                    : this.state.data.order_status ==
                                      'cancelled'
                                    ? 'red'
                                    : this.state.data.order_status ==
                                      'in_process'
                                    ? '#5BC2C1'
                                    : this.state.data.order_status ==
                                      'processed'
                                    ? '#5BC2C1'
                                    : this.state.data.order_status ==
                                      'completed'
                                    ? 'green'
                                    : '',
                                textTransform: 'capitalize',
                                fontSize: '17px',
                              }}
                            >
                              Order Status: {this.state.data.order_status}
                            </span>
                          </h6>
                        </div>
                        <div>
                          {this.state.data.order_type != 'TakeAway' &&
                            this.state.data.order_type != 'Delivery' &&
                            this.state.data.order_status != 'completed' &&
                            this.state.data.order_status != 'cancelled' &&
                            (this.state.generate_order_buttonLoading ? (
                              <button
                                className="btn btn-primary btn-sm"
                                style={{
                                  pointerEvents: 'none',
                                  opacity: '0.8',
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
                                  this.genrate_bill(this.props.id);
                                }}
                              >
                                <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                                Generate Bill
                              </button>
                            ))}
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          {this.state.cart.length}{' '}
                          {this.state.cart.length > 1 ? 'Items' : 'Item'}
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
                                padding: '20px 0 0!important',
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
                                          fontWeight: '600px',
                                          marginRight: '10px',
                                        }}
                                      >
                                        {item.product.product_name}
                                      </span>

                                      {item.variant != null && (
                                        <span>
                                          <strong>Variant</strong> -{' '}
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
                                color: '#28c76f',
                                margin: '10px 0px 0px',
                              }}
                            >
                              Taxes and other Charges
                            </div>
                            <div className="col-md-6 d-flex align-items-start justify-content-end item_total">
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  color: '#28c76f',
                                  margin: '10px 0px 0px',
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
                                color: '#ff0000',
                                margin: '10px 0px 0px',
                              }}
                            >
                              Discount
                            </div>
                            <div className="col-md-6 d-flex align-items-start justify-content-end item_total">
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  color: '#ff0000',
                                  margin: '10px 0px 0px',
                                }}
                              >
                                <BiRupee />
                                {this.state.data.order_discount}
                              </div>
                            </div>
                          </div>
                        )}
                        {this.state.data.convenience_fee > 0 && (
                          <div className="row">
                            <div
                              className="col-md-6"
                              style={{
                                color: '#28c76f',
                                margin: '10px 0px 0px',
                              }}
                            >
                              Convenience Fee
                            </div>
                            <div className="col-md-6 d-flex align-items-start justify-content-end item_total">
                              <div
                                className="d-flex align-items-center"
                                style={{
                                  color: '#28c76f',
                                  margin: '10px 0px 0px',
                                }}
                              >
                                <BiRupee />
                                {this.state.data.convenience_fee}
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
                    {this.state.mark_complete_buttonLoading ? (
                      <p>Please Wait...</p>
                    ) : this.state.data.order_status == 'placed' ? (
                      <div className="d-flex align-items-center justify-content-around my-2">
                        <h6
                          className="text-danger"
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => this.change_order_status('cancelled')}
                        >
                          Cancel Order
                        </h6>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-primary mx-2"
                          onClick={() => {
                            this.change_order_status('confirmed');
                          }}
                        >
                          <p>Accept Order</p>
                        </a>
                      </div>
                    ) : this.state.data.order_status == 'confirmed' ? (
                      <div className="d-flex align-items-center justify-content-around my-2">
                        <h6
                          className="text-danger"
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => this.change_order_status('cancelled')}
                        >
                          Cancel Order
                        </h6>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-primary mx-2"
                          onClick={() => this.setState({ open: true })}
                          // onClick={() => {

                          //   this.change_order_status("in_process");
                          // }}
                        >
                          <p>Order In-Process</p>
                        </a>
                      </div>
                    ) : this.state.data.order_status == 'in_process' ? (
                      <div className="d-flex align-items-center justify-content-around my-2">
                        <h6
                          className="text-danger"
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => this.change_order_status('cancelled')}
                        >
                          Cancel Order
                        </h6>
                        <a
                          href="javascript:void(0);"
                          className="btn btn-primary mx-2"
                          onClick={() => {
                            this.change_order_status('processed');
                          }}
                        >
                          <p>Order Processed</p>
                        </a>
                      </div>
                    ) : this.state.data.order_status == 'processed' ? (
                      this.state.data.order_type == 'Delivery' ? (
                        <div className="d-flex align-items-center justify-content-around my-2">
                          <h6
                            className="text-danger"
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              this.change_order_status('cancelled')
                            }
                          >
                            Cancel Order
                          </h6>
                          <a
                            href="javascript:void(0);"
                            className="btn btn-primary mx-2"
                            onClick={() => {
                              this.change_order_status('out for delivery');
                            }}
                          >
                            <p>Out for Delivery</p>
                          </a>
                        </div>
                      ) : (
                        this.state.data.order_type == 'TakeAway' && (
                          <div className="d-flex align-items-center justify-content-around my-2">
                            <a
                              href="javascript:void(0);"
                              className="btn btn-primary mx-2"
                              onClick={() => {
                                this.change_order_status('completed');
                              }}
                            >
                              <p>Completed</p>
                            </a>
                          </div>
                        )
                      )
                    ) : this.state.data.order_status == 'out for delivery' ? (
                      <div className="d-flex align-items-center justify-content-around my-2">
                        <a
                          href="javascript:void(0);"
                          className="btn btn-primary mx-2"
                          onClick={() => {
                            this.change_order_status('completed');
                          }}
                        >
                          <p>Completed</p>
                        </a>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="card flex-fill bg-white">
                      <div className="card-header order_details">
                        <div className=" d-flex align-items-center justify-content-between">
                          <h5>Customer details</h5>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12 col-12">
                            <div className="form-group">
                              <label>Customer Name</label>
                              <input
                                type="text"
                                readOnly
                                value={this.state.user.name}
                                style={{
                                  border: 'none',
                                  borderBottom: '1px solid black',
                                  borderRadius: 0,
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-12">
                            <div className="form-group">
                              <label>Mobile</label>
                              <input
                                type="text"
                                readOnly
                                value={this.state.user.contact}
                                style={{
                                  border: 'none',
                                  borderBottom: '1px solid black',
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
                        height: '200px',
                      }}
                    >
                      <div className="card-body">
                        <div className=" d-flex align-items-start justify-content-between pb-4">
                          <h5>Notes</h5>
                        </div>
                        <p>{this.state.data.instruction}</p>
                      </div>
                    </div>
                    {this.state.data.order_status != 'cancelled' && (
                      <div className="d-flex align-items-center justify-content-center">
                        <a
                          className="btn btn-primary me-2 w-50 d-flex align-items-center justify-content-center"
                          onClick={() => {
                            if (
                              global.os == 'Windows' ||
                              global.os == 'Mac OS'
                            ) {
                              window.open(
                                global.api + this.props.id + '/bill.pdf',
                                'PRINT',
                                'height=400,width=600'
                              );
                            } else {
                              this.sendUrlToPrint(
                                global.api + this.props.id + '/bill.pdf'
                              );
                            }
                          }}
                        >
                          <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                          <p>Print Receipt</p>
                        </a>
                        <>
                          {this.state.data.order_status != 'completed' && (
                            <a
                              className="btn btn-primary w-50 d-flex align-items-center justify-content-center"
                              onClick={() => {
                                if (
                                  global.os == 'Windows' ||
                                  global.os == 'Mac OS'
                                ) {
                                  window.open(
                                    global.api + this.props.id + '/kot.pdf',
                                    'PRINT',
                                    'height=400,width=600'
                                  );
                                } else {
                                  this.sendUrlToPrint(
                                    global.api + this.props.id + '/kot.pdf'
                                  );
                                }
                              }}
                            >
                              <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                              <p>Print KOT</p>
                            </a>
                          )}
                        </>
                      </div>
                    )}
                  </div>
                  <>
                    <ReactToPrint
                      trigger={() => <a href="#">Print this out!</a>}
                      content={() => this.componentRef}
                    />
                    <PrintKot
                      ref={(el) => (this.componentRef = el)}
                      id={this.props.id}
                    />
                  </>
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
            modal: 'customModal',
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
                    {this.state.mark_complete_buttonLoading ? (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        style={{
                          pointerEvents: 'none',
                          opacity: '0.8',
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
                          this.change_order_status('in_process');
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
          open={this.state.generateBillModal}
          onClose={() => this.setState({ generateBillModal: false })}
          center
          classNames={{
            modal: 'customModal',
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
                            pointColor="#5BC2C1"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Google Pay/Paytm/UPI
                          </RadioButton>
                          <RadioButton
                            value="card"
                            pointColor="#5BC2C1"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Credit/Debit Card
                          </RadioButton>
                          <RadioButton
                            value="cash"
                            pointColor="#5BC2C1"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Cash
                          </RadioButton>
                          <RadioButton
                            value="split"
                            pointColor="#5BC2C1"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Split Payment
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
                          pointerEvents: 'none',
                          opacity: '0.8',
                        }}
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Please wait
                      </button>
                    ) : this.state.payment == 'split' ? (
                      <a
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          this.setState({
                            splitModal: true,
                            generateBillModal: false,
                          });
                        }}
                      >
                        Complete Order
                      </a>
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

        <Modal
          open={this.state.splitModal}
          onClose={() => this.setState({ splitModal: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header m-0 text-center">
              <div className="page-title text-center">
                <h4>Split Bill Amount</h4>
                <p>
                  Total Bill Amount - <BiRupee /> {this.state.total_amount}
                </p>
              </div>
            </div>
            <div className="card border-none">
              <div className="card-body p-0 pt-4">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Amount Paid by Cash</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            split_bill_amount_cash: e.target.value,
                          });
                        }}
                        value={this.state.split_bill_amount_cash}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        Amount Paid by Google Pay/Paytm/UPI/Debit Card/Credit
                        Card
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            split_bill_amount_other: e.target.value,
                          });
                        }}
                        value={this.state.split_bill_amount_other}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.mark_complete_buttonLoading ? (
                      <button
                        className="btn btn-primary btn-sm"
                        style={{
                          pointerEvents: 'none',
                          opacity: '0.8',
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

        <div style={{ display: 'none' }}>
          <div id="print">
            <center id="top">
              <div className="info">
                <h2>{this.state.vendor_details.name}</h2>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="info">
                <p>
                  {this.state.vendor_details.address != null && (
                    <>
                      <>{this.state.vendor_details.address}</>
                      <br />
                    </>
                  )}
                  {this.state.vendor_details.gstin != null && (
                    <>
                      <br />
                      <span>GST No. {this.state.vendor_details.gstin}</span>
                    </>
                  )}
                  {/* {this.state.vendor_details.gstin != null && (
                <>
                  <br />
                  <span>GST No. {this.state.vendor_details.gstin}</span>
                </>
              )} */}
                </p>
                <h3 className="new_h3">{this.state.data.order_type}</h3>
              </div>
            </div>
            {/* customer-details */}
            <div id="customer_details">
              <h3 className="customer_details_h3">---Customer Details---</h3>
              <div className="name_phone_main">
                <div id="name_phone">
                  <div className="phone_email_head">Name</div>
                  <div className="phone_email_content">
                    {this.state.user_details.id != 1
                      ? this.state.user_details.name
                      : 'N/A'}
                  </div>
                </div>

                <div id="name_phone">
                  <div className="phone_email_head">Phone</div>
                  <div className="phone_email_content">
                    {this.state.user_details.id != 1
                      ? this.state.user_details.contact
                      : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
            {/* end-customer-details */}
            {/* customer_order_details */}
            <div id="customer_details">
              <div className="customer_order_details_main">
                <div id="customer_order_details">
                  <div className="customer_order_details_head">Order Time</div>
                  <div className="customer_order_details_content">
                    {moment(this.state.data.created_at).format('llll')}
                  </div>
                </div>
                <div id="customer_order_details">
                  <div className="customer_order_details_head">Order Code</div>
                  <div className="customer_order_details_content">
                    {this.state.data.order_code}
                  </div>
                </div>
                {this.state.data.order_type == 'Dinein' && (
                  <div id="customer_order_details">
                    <div className="customer_order_details_head">
                      Table Number
                    </div>
                    <div className="customer_order_details_content">221</div>
                  </div>
                )}

                {this.state.transaction_details.length > 0 && (
                  <div>
                    <div id="customer_order_details">
                      <div className="customer_order_details_head">
                        Payment Method
                      </div>
                      <div className="customer_order_details_content">
                        {this.state.transaction_details.length == 1 ? (
                          <span>
                            {' '}
                            {this.state.transaction_details[0].txn_method}
                          </span>
                        ) : (
                          this.state.transaction_details.map((item, i) => {
                            return (
                              <span key={i}>
                                {' '}
                                {item.txn_method} - ₹ {item.txn_amount},
                              </span>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* end_customer_order_details */}
            {/*End Invoice Mid*/}
            <div id="bot">
              {this.state.vendor_details.gstin != null ? (
                <h3>---GST Invoice---</h3>
              ) : (
                <h3>---Invoice---</h3>
              )}
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="count">
                        <h2 className="table_data">#</h2>
                      </td>
                      <td className="item">
                        <h2 className="table_data">Item</h2>
                      </td>
                      <td className="Hours">
                        <h2 className="table_data">Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2 className="table_data">Rate</h2>
                      </td>
                      <td className="Amount">
                        <h2 className="table_data">Amount</h2>
                      </td>
                    </tr>
                    {this.state.cart_details.map((values, index) => {
                      return (
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{index + 1}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {values.product.product_name}
                            </p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {values.product_quantity}
                            </p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              ₹ {values.product_price / values.product_quantity}
                            </p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">₹ {values.product_price}</p>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="tabletitle">
                      <td />
                      <td className="Rate">
                        <h2>Sub Total</h2>
                      </td>
                      <td />
                      <td />
                      <td className="payment">
                        <h2>₹ {this.state.data.order_amount}/-</h2>
                      </td>
                    </tr>
                    {this.state.data.cgst != '0' && (
                      <tr className="tabletitle">
                        <td />
                        <td className="Rate">
                          <h2>Tax(C.G.S.T)</h2>
                        </td>
                        <td />
                        <td />
                        <td className="payment">
                          <h2>₹ {this.state.data.cgst}/-</h2>
                        </td>
                      </tr>
                    )}
                    {this.state.data.sgst != '0' && (
                      <tr className="tabletitle">
                        <td />
                        <td className="Rate">
                          <h2>Tax(S.G.S.T)</h2>
                        </td>
                        <td />
                        <td />
                        <td className="payment">
                          <h2>₹ {this.state.data.sgst}/-</h2>
                        </td>
                      </tr>
                    )}
                    {this.state.data.order_discount != '0' && (
                      <tr className="tabletitle">
                        <td />
                        <td className="Rate">
                          <h2>Discount</h2>
                        </td>
                        <td />
                        <td />
                        <td className="payment">
                          <h2>₹ {this.state.data.order_discount}/-</h2>
                        </td>
                      </tr>
                    )}
                    <tr className="tabletitle">
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td />
                      <td />
                      <td className="payment">
                        <h2>₹ {this.state.data.total_amount}/-</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your business!</strong>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
            {/*KOT start*/}
            <div id="legalcopy">
              <p className="kot_dT kot_heading">
                Token For: {this.state.data.order_code}
                {'    '}Date:{' '}
                {moment(this.state.data.created_at).format('llll')}
              </p>
            </div>
            <div id="bot" className="mt-10">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="count text-center">
                        <h2>#</h2>
                      </td>
                      <td className="item text-center">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours text-center">
                        <h2>Qty</h2>
                      </td>
                    </tr>
                    {this.state.cart_details.map((values, index) => {
                      return (
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext text-center">{index + 1}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext text-center">
                              {values.product.product_name}
                            </p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext text-center">
                              {values.product_quantity}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {/*KOT End*/}
          </div>
        </div>
      </div>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  const location = useLocation();
  return (
    <Orderdetails
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
