import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import moment from 'moment';
import { BiRupee } from 'react-icons/bi';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContextProvider';
import { Bars } from 'react-loader-spinner';
import no_order from '../assets/images/no_orders.webp';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import PrintKot from '../component/PrintKot';
import PrintReceipt from '../component/PrintReceipt';
import ReactToPrint from 'react-to-print';
export class ViewTableOrder extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      edit_user_modal: false,
      all_data: [],
      tableData: [],
      data: [],
      cart: [],
      user: [],
      table_data: [],
      isLoading: true,
      additional_note: '',
      generateBillModal: false,
      total_amount: '',
      order_code: '',
      bill: [],
      payment: 'UPI',
      generate_order_buttonLoading: false,
      mark_complete_buttonLoading: false,
      total_amount: '',
      split_bill_amount_other: '',
      split_bill_amount_cash: '',
      is_buttonloding: false,
      splitModal: false,
      modalVisible: false,
      swap_table_buttonLoading: false,
      clear_table_buttonLoading: false,
      edit_quantity_modal: false,
      update_product_quantity_buttonLoading: false,
      edit_quantity_name: '',
      edit_quantity_initial: '',
      edit_cart_id: '',
      split_payment: [
        { amount: 0, method: 'Cash' },
        { amount: 0, method: 'Card' },
        { amount: 0, method: 'UPI' },
      ],
      split_total: 0,
    };
  }

  componentDidMount() {
    this.orderDetails(this.props.id);
    this.fetch_table_vendors();
  }

  orderDetails = (id) => {
    fetch(global.api + 'fetch_ongoing_order_for_table', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        table_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          this.setState({ isLoading: false, data: [] });
          this.props.navigate('/pos/' + this.props.id, { replace: true });
        } else {
          this.setState({
            all_data: json.data,
            data: json.data[0],
            cart: json.data[0].cart,
            user: json.data[0].user,
            isLoading: false,
            table_data: json.data[0].table,
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
    fetch(global.api + 'generate_bill_by_table', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        table_id: this.props.id,
        order_id: this.state.order_code,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
        } else {
          if (json.data.length > 0) {
            this.setState({ bill: json.data });
            // this.setState({ cart: json.data.cart });
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
        order_id: this.state.bill[0].id,
        payment_method: this.state.payment,
        order_status: 'completed',
        split_payment: this.state.split_payment,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({ modalVisible: false });
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

  add_split_amount = (amount, index) => {
    if (amount == '') {
      amount = 0;
    }
    var split = this.state.split_payment;

    var tt = 0;
    split.map((item, i) => {
      if (i != index) {
        tt = parseFloat(tt) + parseFloat(item.amount);
      } else {
        tt = parseFloat(tt) + parseFloat(amount);
      }
    });

    split[index].amount = amount;
    this.setState({ split_payment: split, split_total: tt });
  };

  fetch_table_vendors = () => {
    fetch(global.api + 'fetch_table_vendors', {
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
          var msg = json.msg;
        } else {
          if (json.data.length > 0) {
            this.setState({ tableData: json.data });
          }
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  swap_table = (id) => {
    this.setState({ swap_table_buttonLoading: true });

    fetch(global.api + 'swapp_table_order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_code: this.state.data.order_code,
        current_table_id: this.props.id,
        new_table_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({ swap_table_modalVisible: false });
          this.props.navigate(-1);
          toast.success('Table Swapped');
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ swap_table_buttonLoading: false });
      });
  };

  clear_table_order = () => {
    this.setState({ clear_table_buttonLoading: true });

    fetch(global.api + 'clear_table', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_code: this.state.data.order_code,
        table_id: this.props.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.props.navigate(-1);
          toast.success('Table Cleared');
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ clear_table_buttonLoading: false });
      });
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

  update_product_quantity = (quantity) => {
    this.setState({ update_product_quantity_buttonLoading: true });
    fetch(global.api + 'update_order_items_pos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        item_id: this.state.edit_cart_id,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({ edit_quantity_modal: false });
          this.orderDetails(this.props.id);
          toast.success('Product Quantity Updated');
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ update_product_quantity_buttonLoading: false });
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
              color="#5BC2C1"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            {this.state.all_data.length > 0 ? (
              <div className="page-wrapper">
                <div className="content">
                  <div className="page-header">
                    <div className="page-title">
                      <h4>
                        Order Details-{' '}
                        <span
                          style={{
                            color: '#5BC2C1',
                          }}
                        >
                          {this.state.table_data.table_name}
                        </span>
                      </h4>
                    </div>
                    <div className="d-flex align-items-center">
                      {this.state.swap_table_buttonLoading ? (
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
                          Order Swap
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => {
                            this.setState({ modalVisible: true });
                          }}
                        >
                          <i className="fa-solid fa-arrow-right-arrow-left mr-2"></i>
                          Order Swap
                        </button>
                      )}

                      <Link
                        className="btn btn-primary btn-sm me-2"
                        to={'/pos/' + this.props.id}
                      >
                        <i className="fa-solid fa-plus mr-2"></i>Add More Item
                      </Link>
                      {this.state.clear_table_buttonLoading ? (
                        <button
                          className="btn btn-danger btn-sm me-2"
                          style={{
                            pointerEvents: 'none',
                            opacity: '0.8',
                          }}
                        >
                          <span
                            class="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Clearing Table
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => {
                            Swal.fire({
                              title: 'Are you sure',
                              text: 'You want to clear this table order',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, clear it!',
                            }).then((result) => {
                              if (result.isConfirmed) {
                                this.clear_table_order();
                              }
                            });
                          }}
                        >
                          <i class="fa-solid fa-circle-xmark mr-2"></i>
                          Clear Table Order
                        </button>
                      )}
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
                              <h5>Order ID: {this.state.data.order_code}</h5>
                              <h6 className="order_date mt-2">
                                {moment(this.state.data.created_at).format(
                                  'llll'
                                )}
                              </h6>
                            </div>
                            {this.state.generate_order_buttonLoading ? (
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
                                              fontWeight: '600px',
                                              marginRight: '10px',
                                              cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                              this.setState({
                                                edit_quantity_modal: true,
                                                edit_quantity_name:
                                                  item.product.product_name,
                                                edit_quantity_initial:
                                                  item.product_quantity,
                                                edit_cart_id: item.id,
                                              });
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
                                    {this.state.data.cgst +
                                      this.state.data.sgst}
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
                                      border: 'none',
                                      borderBottom: '1px solid black',
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
                              <h5
                                style={{
                                  textDecoration: 'underline',
                                }}
                              >
                                Notes
                              </h5>
                              {/* <a
                                className="btn btn-added"
                                style={{
                                  color: '#5BC2C1',
                                }}
                                onClick={() => this.setState({ open: true })}
                              >
                                Add
                              </a> */}
                            </div>
                            <p>{this.state.data.instruction}</p>
                          </div>
                        </div>
                        {this.state.data.order_status != 'cancelled' && (
                          <div className="d-flex align-items-center justify-content-center">
                            {global.os != 'Windows' && global.os != 'Mac OS' ? (
                              <>
                                <a
                                  className="btn btn-primary me-2 w-50 d-flex align-items-center justify-content-center"
                                  onClick={() => {
                                    if (
                                      global.os == 'Windows' ||
                                      global.os == 'Mac OS'
                                    ) {
                                      window.open(
                                        global.api +
                                          this.state.data.order_code +
                                          '/bill.pdf',
                                        'PRINT',
                                        'height=400,width=600'
                                      );
                                    } else {
                                      this.sendUrlToPrint(
                                        global.api +
                                          this.state.data.order_code +
                                          '/bill.pdf'
                                      );
                                    }
                                  }}
                                >
                                  <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                                  <p>Print Receipt</p>
                                </a>

                                {this.state.data.order_status !=
                                  'completed' && (
                                  <a
                                    className="btn btn-primary w-50 d-flex align-items-center justify-content-center"
                                    onClick={() => {
                                      if (
                                        global.os == 'Windows' ||
                                        global.os == 'Mac OS'
                                      ) {
                                        window.open(
                                          global.api +
                                            this.state.data.order_code +
                                            '/kot.pdf',
                                          'PRINT',
                                          'height=400,width=600'
                                        );
                                      } else {
                                        this.sendUrlToPrint(
                                          global.api +
                                            this.state.data.order_code +
                                            '/kot.pdf'
                                        );
                                      }
                                    }}
                                  >
                                    <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                                    <p>Print KOT</p>
                                  </a>
                                )}
                              </>
                            ) : (
                              <>
                                <ReactToPrint
                                  trigger={() => (
                                    <a className="btn btn-primary me-2 w-50 d-flex align-items-center justify-content-center">
                                      <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                                      <p>Print Receipt</p>
                                    </a>
                                  )}
                                  content={() => this.componentRef2}
                                />

                                {this.state.data.order_status !=
                                  'completed' && (
                                  <ReactToPrint
                                    trigger={() => (
                                      <a
                                        className="btn btn-primary w-50 d-flex align-items-center justify-content-center"
                                        onClick={() => {
                                          if (
                                            global.os == 'Windows' ||
                                            global.os == 'Mac OS'
                                          ) {
                                            window.open(
                                              global.api +
                                                this.state.data.order_code +
                                                '/kot.pdf',
                                              'PRINT',
                                              'height=400,width=600'
                                            );
                                          } else {
                                            this.sendUrlToPrint(
                                              global.api +
                                                this.state.data.order_code +
                                                '/kot.pdf'
                                            );
                                          }
                                        }}
                                      >
                                        <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                                        <p>Print KOT</p>
                                      </a>
                                    )}
                                    content={() => this.componentRef}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        )}
                        <div
                          style={{
                            display: 'none',
                          }}
                        >
                          <PrintKot
                            ref={(el) => (this.componentRef = el)}
                            order={this.state.data}
                          />
                          <PrintReceipt
                            ref={(el2) => (this.componentRef2 = el2)}
                            order={this.state.data}
                          />
                        </div>
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
                    height: '92vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <img src={no_order} alt="" />
                  <h3>No Order Found</h3>

                  <Link
                    className="btn btn-submit me-2"
                    to={'/pos/' + this.props.id}
                  >
                    Create a new order
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
        <Modal
          open={this.state.modalVisible}
          onClose={() => this.setState({ modalVisible: false })}
          center
          styles={{
            modal: {
              width: '100%',
              maxWidth: '70vw',
            },
          }}
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header m-0">
              <div className="page-title">
                <h4>Tables - Order Swap</h4>
              </div>
            </div>
            <div className="card border-none">
              <div className="card-body p-0 pt-4">
                <div className="row" style={{ marginTop: 10 }}>
                  <>
                    {this.state.tableData.length > 0 ? (
                      <>
                        <h4
                          style={{
                            marginBottom: '10px',
                          }}
                        >
                          Dine-In
                        </h4>
                        {this.state.tableData.map((item, index) => {
                          return (
                            <>
                              {item.table_status == 'active' ? (
                                <div
                                  key={index}
                                  className="col-lg-2 col-sm-6 col-12"
                                >
                                  <div
                                    className=" d-flex w-100"
                                    onClick={() => {
                                      Swal.fire({
                                        title: 'Are you sure',
                                        text: 'You want to swap the order',
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, swap it!',
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          this.swap_table(item.table_uu_id);
                                        }
                                      });
                                    }}
                                  >
                                    <div className="dash-count1 cursor_pointer">
                                      <h4>{item.table_name}</h4>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <> </>
                              )}
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          center
          classNames={{
            modal: 'customModal',
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
                      className="btn btn-sm btn-submit me-2"
                    >
                      Add
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
                            value="UPI"
                            pointColor="#5BC2C1"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Google Pay/Paytm/UPI
                          </RadioButton>
                          <RadioButton
                            value="Card"
                            pointColor="#5BC2C1"
                            iconSize={20}
                            rootColor="#f3c783"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Credit/Debit Card
                          </RadioButton>
                          <RadioButton
                            value="Cash"
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
                  {this.state.split_payment.map((item, index) => {
                    var tt = item.amount;
                    return (
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>{item.method} </label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              type="number"
                              onChange={(e) => {
                                this.add_split_amount(e.target.value, index);
                              }}
                              value={this.state[item.amount]}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <h5>Split Total - {this.state.split_total} </h5>

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
                      this.state.split_total == this.state.total_amount && (
                        <a
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            this.mark_complete();
                          }}
                        >
                          Complete Order
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.edit_quantity_modal}
          onClose={() => this.setState({ edit_quantity_modal: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header m-0 text-center">
              <div className="page-title text-center">
                <h5>
                  Edit Quantity of :{' '}
                  <span
                    style={{
                      textDecoration: 'underline',
                    }}
                  >
                    {this.state.edit_quantity_name}
                  </span>
                </h5>
              </div>
            </div>
            <div className="card border-none">
              <div className="card-body p-0 pt-4">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 d-flex justify-content-between align-items-center py-4">
                      <div className="row w-100">
                        <div className="col-md-4">
                          {this.state.edit_quantity_initial == 1 ? (
                            <a
                              className="btn btn-primary mx-2 w-100"
                              style={{
                                pointerEvents: 'none',
                                opacity: '0.8',
                              }}
                              onClick={() => {
                                this.setState({
                                  edit_quantity_initial:
                                    this.state.edit_quantity_initial - 1,
                                });
                              }}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </a>
                          ) : (
                            <a
                              className="btn btn-primary mx-2 w-100"
                              onClick={() => {
                                this.setState({
                                  edit_quantity_initial:
                                    this.state.edit_quantity_initial - 1,
                                });
                              }}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </a>
                          )}
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="text-center mx-2 form-control w-100"
                            onChange={(e) => {
                              this.setState({
                                edit_quantity_initial: e.target.value,
                              });
                            }}
                            value={this.state.edit_quantity_initial}
                            readOnly
                          />
                        </div>
                        <div className="col-md-4">
                          <a
                            className="btn btn-primary mx-2 w-100"
                            onClick={() => {
                              this.setState({
                                edit_quantity_initial:
                                  this.state.edit_quantity_initial + 1,
                              });
                            }}
                          >
                            <i className="fa-solid fa-add"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 d-flex justify-content-between align-items-center mt-2">
                      {this.state.update_product_quantity_buttonLoading ? (
                        <button
                          className="btn btn-danger btn-sm me-2"
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
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => {
                            Swal.fire({
                              title: 'Are you sure',
                              text: 'You want to clear this item from order',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, clear it!',
                            }).then((result) => {
                              if (result.isConfirmed) {
                                this.update_product_quantity(0);
                              }
                            });
                          }}
                        >
                          Clear {this.state.edit_quantity_name} from Order
                        </button>
                      )}
                      {this.state.update_product_quantity_buttonLoading ? (
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
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            this.update_product_quantity(
                              this.state.edit_quantity_initial
                            );
                          }}
                        >
                          Update Quantity Of {this.state.edit_quantity_name}
                        </button>
                      )}
                    </div>
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
    <ViewTableOrder
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
