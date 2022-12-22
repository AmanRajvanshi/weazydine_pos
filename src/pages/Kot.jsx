import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import { Bars } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
import no_order from '../assets/images/no_orders.webp';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify';
import Countdown from 'react-countdown';

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

  componentDidMount() {
    this.fetch_order(this.state.page, 'all');
    window.Echo.private(`KotstatusChannel.` + this.context.user.id).listen(
      '.kot.status',
      (e) => {
        this.fetch_order(1, 'all');
      }
    );
  }

  fetch_order = (page_id, status) => {
    fetch(global.api + 'fetch_kot_orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        status: status,
        page: page_id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          this.setState({ is_loading: false, data: [] });
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
        <div className="main-wrapper">
          {/* <Header sidebar={false} /> */}
          <div
            className="page-wrapper"
            style={{
              margin: '0 0 0 20px',
              padding: '0 0 0 0',
            }}
          >
            <div className="content">
              <div className="row">
                <div className="col-md-3">
                  <div className="page-header">
                    <div className="page-title">
                      <h4>Kitchen Display </h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="col-md-12">
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                          onClick={() => {
                            this.setState({ is_loading: true });
                            this.fetch_order(1, 'all');
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
                            this.fetch_order(1, 'pending');
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
                            this.fetch_order(1, 'in_process');
                          }}
                        >
                          In Process
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4 d-flex justify-content-end align-items-start">
                  <Link to="/">
                    <button className="btn btn-primary btn-block">
                      <i className="fa-solid fa-arrow-left me-2"></i>Back to
                      Home
                    </button>
                  </Link>
                </div>
              </div>
              <div className="comp-sec-wrapper">
                <section className="comp-section">
                  <div className="row pb-4"></div>
                </section>
              </div>
              {!this.state.is_loading ? (
                <>
                  {this.state.data.length > 0 ? (
                    <div className="row">
                      <Order dat={this.state.data} />
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
                </>
              ) : (
                <div className="main_loader" style={{ marginLeft: '0px' }}>
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

class Order extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      is_buttonloding: false,
      data: props.dat,
      open: false,
      openupdate: false,
      time: 0,
      id: '',
    };
  }

  change_order_status = (id, status) => {
    this.setState({ is_buttonloding: true });
    fetch(global.api + 'update_order_status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_id: id,
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
          this.setState({ open: false, openupdate: false });
          toast.success('Order Status Updated Successfully');
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ is_buttonloding: false });
      });
  };
  componentDidMount() {}
  render() {
    return (
      <>
        {this.props.dat.map((values, index) => {
          return (
            <div className="col-md-3">
              <div
                className="card flex-fill bg-white cursor_pointer"
                onClick={() =>
                  values.order_status == 'in_process'
                    ? this.setState({ openupdate: true, id: values.order_code })
                    : this.setState({ open: true, id: values.order_code })
                }
              >
                <div
                  className="card-header order_details"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: '1px solid #e5e5e5',
                    padding: '10px 15px',
                    backgroundColor:
                      values.order_status == 'in_process'
                        ? '#009000'
                        : '#eda332',
                    color: '#fff',
                  }}
                >
                  <div className="row">
                    {values.order_status === 'in_process' && (
                      <h6 className=" d-flex align-items-end justify-content-end">
                        {this.context.user.kot_time_status ? (
                          <Countdown
                            date={moment(values.estimate_prepare_time).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )}
                            zeroPadDays={0}
                            zeroPadHours={0}
                            zeroPadMinutes={2}
                            zeroPadSeconds={2}
                            overtime={true}
                            // renderer={(props) => (
                            //   <span>
                            //     {props.minutes}: {props.seconds}
                            //   </span>
                            // )}
                          />
                        ) : (
                          <></>
                        )}
                      </h6>
                    )}
                  </div>
                  <div>
                    <h6
                      style={{
                        fontSize: '15px',
                      }}
                    >
                      {values.order_code} -{' '}
                      {values.order_type != 'TakeAway' &&
                      values.order_type != 'Delivery' ? (
                        <span>
                          Dine-In{' '}
                          {values.table != null && (
                            <span>{values.table.table_name}</span>
                          )}
                        </span>
                      ) : (
                        <span>{values.order_type}</span>
                      )}
                    </h6>

                    <h6
                      className="mt-2"
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      {moment(values.updated_at).format('lll')}{' '}
                      <span
                        style={{
                          textTransform: 'capitalize',
                          fontSize: '14px',
                        }}
                      ></span>
                    </h6>
                    {values.instruction !== null && (
                      <h6
                        className="mt-2"
                        style={{
                          fontSize: '14px',
                        }}
                      >
                        Instructions: {values.instruction}
                      </h6>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <section
                    className="item-section"
                    style={{
                      padding: '20px 0 0!important',
                    }}
                  >
                    <div className="item_row">
                      <div
                        className="sno_column_heading"
                        style={{
                          width: '15%',
                        }}
                      >
                        No.
                      </div>
                      <div
                        className="item_name_column_heading"
                        style={{
                          width: '70%',
                        }}
                      >
                        Item
                      </div>
                      <div
                        className="qty_column_heading"
                        style={{
                          width: '15%',
                        }}
                      >
                        Qty.
                      </div>
                    </div>
                    {values.product.map((values, index) => {
                      return (
                        <div className="single_item_row">
                          <div
                            className="sno_column"
                            style={{
                              width: '15%',
                            }}
                          >
                            {index + 1}
                          </div>
                          <div
                            className="item_name_column"
                            style={{
                              width: '70%',
                            }}
                          >
                            <span
                              style={{
                                fontWeight: '600px',
                                marginRight: '10px',
                              }}
                            >
                              {values.product.product_name}
                            </span>

                            {values.variant != null && (
                              <span>
                                <strong>Variant</strong> -{' '}
                                {values.variant.variants_name}
                              </span>
                            )}

                            <div className="media-body-cart">
                              {values.addons.length > 0 && (
                                <>
                                  <strong>AddOns: </strong>
                                  {values.addons.map((items) => {
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
                          <div
                            className="qty_column"
                            style={{
                              width: '15%',
                            }}
                          >
                            x {values.product_quantity}
                          </div>
                        </div>
                      );
                    })}
                  </section>
                </div>
              </div>
            </div>
          );
        })}
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
                      {this.context.user.kot_time_status ? (
                        <>
                          <label>Time to prepare the order.</label>
                          <div className="d-flex align-items-center">
                            {this.state.time <= 0 ? (
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
                        </>
                      ) : (
                        <label>Start preparing the order</label>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.is_buttonloding ? (
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
                          this.change_order_status(this.state.id, 'in_process');
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Start Preparing
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
            modal: 'customModal',
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
                    <a className="btn btn-danger btn-sm me-2">Close</a>
                    {this.state.is_buttonloding ? (
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
                          this.change_order_status(this.state.id, 'processed');
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
