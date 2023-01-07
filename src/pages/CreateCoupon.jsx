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

export class CreateCoupon extends Component {
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
      discount_type: 'percentage',
      startDate: new Date(),
      endDate: new Date(),
      loading: false,
      show_to_customer: 0,
      offer_name: '',
    };
  }

  create_offer = () => {
    if (this.state.maximum_discount == '') {
      var max_discount = 0;
    } else {
      var max_discount = this.state.maximum_discount;
    }

    if (this.state.maximum_discount != '') {
      var max_discount_text = 'upto ₹' + this.state.maximum_discount;
    } else {
      var max_discount_text = '';
    }

    if (this.state.minimum_order_value != '') {
      var minimum_order_value = ' above ₹' + this.state.minimum_order_value;
    } else {
      var minimum_order_value = '';
    }

    if (this.state.discount_type == 'percentage') {
      var offer_name =
        this.state.discount +
        '% OFF on all orders' +
        ' ' +
        minimum_order_value +
        ' ' +
        max_discount_text;
    } else {
      var offer_name =
        'Flat ₹' +
        this.state.discount +
        ' OFF on all orders' +
        minimum_order_value;
    }

    this.setState({ loading: true });
    fetch(global.api + 'create_offer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        offer_code: this.state.coupon_code,
        offer_description: this.state.offer_description,
        start_from: moment(this.state.startDate).format('YYYY-MM-DD'),
        discount_type: this.state.discount_type,
        offer_discount: this.state.discount,
        start_to: moment(this.state.endDate).format('YYYY-MM-DD'),
        max_discount: max_discount,
        min_order_value: this.state.minimum_order_value,
        per_customer: this.state.uses_per_customer,
        show_customer: this.state.show_to_customer,
        max_uses: this.state.maximum_uses,
        status: 'active',
        offer_name: offer_name,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          toast.success('Coupon created successfully');
          this.props.navigate('/offers');
        } else {
          toast.error(json.errors[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ loading: false });
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
                  <h4>Create A Discount Coupons</h4>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-2"></div>
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <h5 className=" mb-4">Create Coupon</h5>
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
                                  value={this.state.show_to_customer}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      this.setState({
                                        show_to_customer: 1,
                                      });
                                    } else {
                                      this.setState({
                                        show_to_customer: 0,
                                      });
                                    }
                                  }}
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
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      {this.state.loading ? (
                        <button className="btn btn-primary btn-sm" disabled>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Creating...
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            this.create_offer();
                          }}
                        >
                          Create Coupon
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="col-md-2"></div>
                </div>
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
    <CreateCoupon
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
