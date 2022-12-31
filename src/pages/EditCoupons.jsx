import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import delete_icon from '../assets/images/icons/delete.svg';
import edit_icon from '../assets/images/icons/edit.svg';
import { AuthContext } from '../AuthContextProvider';
import Swal from 'sweetalert2';
import { BiRupee } from 'react-icons/bi';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';

export class EditCoupons extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      coupon_code: '',
      uses_per_customer: '',
      discount: '',
      minimum_order_value: '',
      maximum_discount: '',
      offer_description: '',
      maximum_uses: '',
      discount_type: '',
      startDate: '',
      endDate: '',
      loading: true,
      show_to_customer: 0,
      offer_name: '',
      button_loading: false,
    };
  }

  componentDidMount() {
    this.fetch_single_offer();
  }

  fetch_single_offer = () => {
    fetch(global.api + 'get_offer_single', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Application: 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        offer_id: this.props.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          this.setState({
            coupon_code: json.data.offer_code,
            offer_description: json.data.offer_description,
            startDate: moment(json.data.start_from).format('YYYY-MM-DD'),
            discount_type: json.data.discount_type,
            discount: json.data.offer_discount,
            endDate: moment(json.data.start_to).format('YYYY-MM-DD'),
            maximum_discount: json.data.max_discount,
            minimum_order_value: json.data.min_order_value,
            maximum_uses: json.data.max_uses,
            show_to_customer: json.data.show_customer,
            uses_per_customer: json.data.per_customer_limit,
          });
        } else {
          toast.error(json.message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  delete_offer = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this coupon!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({ button_loading: true });
        fetch(global.api + 'delete_offer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Application: 'application/json',
            Authorization: this.context.token,
          },
          body: JSON.stringify({
            offer_id: this.props.id,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status) {
              this.props.navigate('/offers');
              toast.success(json.message);
            } else {
              toast.error(json.message);
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.setState({ button_loading: false });
          });
      }
    });
  };

  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Edit A Discount Coupons</h4>
                  <p className="text-danger">
                    Coupons are not editable, they can only be deleted.
                  </p>
                </div>
                <div className="d-flex justify-content-end">
                  {this.state.button_loading ? (
                    <button className="btn btn-danger btn-sm" disabled>
                      Deleting...
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        this.delete_offer();
                      }}
                    >
                      Delete Coupon
                    </button>
                  )}
                </div>
              </div>
              <div className="container mt-4">
                {this.state.loading ? (
                  <div
                    className="main_loader"
                    style={{
                      height: '80vh',
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
                ) : (
                  <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <h5 className=" mb-4">Edit Coupon</h5>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Coupon Code{' '}
                                  <span className="text-muted">
                                    ({this.state.coupon_code.length}/10)
                                  </span>
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Coupon Code"
                                  value={this.state.coupon_code}
                                  onChange={(e) => {
                                    this.setState({
                                      coupon_code: e.target.value,
                                    });
                                  }}
                                  style={{
                                    textTransform: 'uppercase',
                                  }}
                                  disabled
                                  maxLength={10}
                                  minLength={5}
                                  onBlur={() => {
                                    if (this.state.coupon_code.length < 5) {
                                      toast.error(
                                        'Coupon code must be 5 characters long'
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Uses per customer
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Uses per customer"
                                  value={this.state.uses_per_customer}
                                  onChange={(e) => {
                                    this.setState({
                                      uses_per_customer: e.target.value,
                                    });
                                  }}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Maximum Uses
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Maximum Uses"
                                  value={this.state.maximum_uses}
                                  onChange={(e) => {
                                    this.setState({
                                      maximum_uses: e.target.value,
                                    });
                                  }}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center">
                              <div className="form-group d-flex align-items-center justify-content-between m-0 w-100">
                                <label className="m-0">
                                  Show Coupon to Customer
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="status-toggle">
                                  <input
                                    type="checkbox"
                                    id="customer_status"
                                    className="check"
                                    checked={
                                      this.state.show_to_customer === 1
                                        ? true
                                        : false
                                    }
                                    disabled
                                  />
                                  <label
                                    htmlFor="customer_status"
                                    className="checktoggle"
                                  ></label>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Offer Description</label>
                                <textarea
                                  className="form-control"
                                  placeholder="Enter Offer Description"
                                  value={this.state.offer_description}
                                  onChange={(e) => {
                                    this.setState({
                                      offer_description: e.target.value,
                                    });
                                  }}
                                  rows={2}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <h5 className=" mb-4">Coupon details</h5>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Discount Type
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  className="form-control"
                                  onChange={(e) => {
                                    this.setState({
                                      discount_type: e.target.value,
                                    });
                                  }}
                                  value={this.state.discount_type}
                                  disabled
                                >
                                  <option value="percentage">Percentage</option>
                                  <option value="fixed">Fixed</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Discount
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Discount"
                                  value={this.state.discount}
                                  onChange={(e) => {
                                    this.setState({
                                      discount: e.target.value,
                                    });
                                  }}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  Minimum Order Value
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Minimum Order Value"
                                  value={this.state.minimum_order_value}
                                  onChange={(e) => {
                                    this.setState({
                                      minimum_order_value: e.target.value,
                                    });
                                  }}
                                  disabled
                                />
                              </div>
                            </div>
                            {this.state.discount_type === 'fixed' ? (
                              <></>
                            ) : (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label>Maximum Discount</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Max Discount"
                                    value={this.state.maximum_discount}
                                    onChange={(e) => {
                                      this.setState({
                                        maximum_discount: e.target.value,
                                      });
                                    }}
                                    disabled
                                  />
                                </div>
                              </div>
                            )}
                            {this.state.discount_type === 'fixed' ? (
                              this.state.discount === '' ? (
                                <></>
                              ) : (
                                <p>
                                  Flat ₹{this.state.discount} off on all orders
                                  {this.state.minimum_order_value === '' ? (
                                    <></>
                                  ) : (
                                    <span>
                                      {' '}
                                      above ₹{this.state.minimum_order_value}
                                    </span>
                                  )}
                                </p>
                              )
                            ) : this.state.discount === '' ? (
                              <></>
                            ) : (
                              <p>
                                {this.state.discount}% off on all orders
                                {this.state.minimum_order_value === '' ? (
                                  <></>
                                ) : (
                                  <span>
                                    {' '}
                                    above ₹{this.state.minimum_order_value}
                                  </span>
                                )}
                                {this.state.maximum_discount === '' ? (
                                  <></>
                                ) : (
                                  <span>
                                    {' '}
                                    upto ₹{this.state.maximum_discount}
                                  </span>
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <h5 className=" mb-4">Coupon Validity</h5>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  From
                                  <span className="text-danger">*</span>
                                </label>
                                <DatePicker
                                  onChange={(value) => {
                                    this.setState({ startDate: value });
                                  }}
                                  value={this.state.startDate}
                                  minDate={new Date()}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>
                                  To
                                  <span className="text-danger">*</span>
                                </label>
                                <DatePicker
                                  onChange={(value) => {
                                    this.setState({ endDate: value });
                                  }}
                                  value={this.state.endDate}
                                  minDate={new Date()}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        {this.state.button_loading ? (
                          <button className="btn btn-danger btn-sm" disabled>
                            Deleting...
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              this.delete_offer();
                            }}
                          >
                            Delete Coupon
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  const location = useLocation();
  return (
    <EditCoupons
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
