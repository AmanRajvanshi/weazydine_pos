import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import 'react-responsive-modal/styles.css';
import { AuthContext } from '../AuthContextProvider';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import no_img from '../assets/images/no_offers.webp';
import { Link } from 'react-router-dom';

export class Offers extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openedit: false,
      is_loding: true,
      offers_data: [],
      edit_addon_name: '',
      edit_addon_price: '',
      edit_addon_id: '',
      newaddonLoading: false,
      editaddonLoading: false,
      is_buttonloding: false,
      addon_name: '',
      addon_price: '',
    };
  }

  componentDidMount() {
    this.fetch_offers();
  }

  fetch_offers = () => {
    fetch(global.api + 'fetch_offers', {
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
          toast.error(json.msg);
          this.setState({ offers_data: [] });
        } else {
          this.setState({ offers_data: json.data });
        }
        this.setState({ is_loding: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  edit_addon = () => {
    if (this.state.edit_addon_name == '' || this.state.edit_addon_price == '') {
      toast.error('All field is required!');
    } else {
      this.setState({ editaddonLoading: true });
      fetch(global.api + 'update_product_addon', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          addon_id: this.state.edit_addon_id,
          addon_name: this.state.edit_addon_name,
          addon_price: this.state.edit_addon_price,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            toast.error(json.msg);
          } else {
            this.fetch_addon();
            this.setState({
              openedit: false,
            });
            toast.success(json.msg);
          }

          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ editaddonLoading: false });
        });
    }
  };

  delete_addon = (id) => {
    fetch(global.api + 'delete_product_addon', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        addon_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          // Toast.show(msg);
        } else {
          toast.success('Category deleted');
          this.fetch_addon();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
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
                  <h4>Offers & Discount Coupons</h4>
                </div>
                <div className="page-btn">
                  <Link to="/createcoupon">
                    <button className="btn btn-added">
                      Create a new Coupon
                    </button>
                  </Link>
                </div>
              </div>
              {this.state.is_loding ? (
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
                <>
                  {this.state.offers_data.length > 0 ? (
                    <div className="row">
                      {this.state.offers_data.map((values, index) => {
                        return (
                          <div className="col-md-4">
                            <div class="card flex-fill bg-white">
                              <div class="card-header pb-0 d-flex align-items-center justify-content-between">
                                <Link
                                  to={'/editcoupon/' + values.id}
                                  style={{
                                    color: '#000',
                                  }}
                                >
                                  <h4
                                    className="d-flex align-items-center"
                                    style={{
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    <i
                                      className="iconly-Discount me-2"
                                      style={{
                                        fontSize: '24px',
                                        color: '#296e84',
                                      }}
                                    ></i>
                                    {values.offer_code}
                                  </h4>
                                </Link>
                                <Toggle
                                  status={values.status}
                                  id={values.id}
                                  fetch_offers={this.fetch_offers}
                                />
                              </div>

                              <Link
                                to={'/editcoupon/' + values.id}
                                style={{
                                  color: '#000',
                                }}
                              >
                                <div class="card-body pt-2">
                                  {values.offer_name != '' ? (
                                    <h5 class="card-title">
                                      {values.offer_name}
                                    </h5>
                                  ) : (
                                    <></>
                                  )}
                                  {/* {values.offer_description != '' ? (
                                    <p class="card-text">
                                      {values.offer_description}
                                    </p>
                                  ) : (
                                    <></>
                                  )} */}
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start flex-column">
                                      <p class="card-text mb-1">TIMES USED</p>
                                      <h5>{values.total_uses}</h5>
                                    </div>
                                    <div className="d-flex justify-content-end flex-column">
                                      <p class="card-text mb-1">
                                        TOTAL SALES GENERATED
                                      </p>
                                      <h5>₹ {values.total_sales_genrated}</h5>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                              <div
                                class="card-footer text-muted py-2 d-flex justify-content-center align-items-center"
                                style={{
                                  borderTop: '1px dashed #e9ecef',
                                }}
                              >
                                <a className="d-flex justify-content-center align-items-center">
                                  <h6 className="me-2">Share</h6>
                                  <i
                                    className="iconly-Send icli"
                                    style={{
                                      fontSize: '24px',
                                    }}
                                  ></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center flex-column"
                      style={{
                        height: '70vh',
                      }}
                    >
                      <img
                        src={no_img}
                        alt=""
                        style={{
                          height: '250px',
                        }}
                      />
                      <h3>Get more sales with coupons</h3>
                      <h5 className="text-center">
                        Now you can create and share coupons for your store to
                        get more and
                        <br /> more orders on your store.
                      </h5>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

class Toggle extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    var status = this.props.status;
    if (status == 'active') {
      status = true;
    } else {
      status = false;
    }
    this.state = {
      status: status,
      id: this.props.id,
    };
  }

  update_offer = (status, id) => {
    fetch(global.api + 'update_offer_status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        status: status,
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status == true) {
          toast.success('Offer status updated successfully');
          this.props.fetch_offers();
        } else {
          toast.error('Something went wrong');
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        this.setState({ is_loding: false });
      });
  };

  render() {
    return (
      <>
        <input
          type="checkbox"
          id={this.props.id}
          className="check"
          checked={this.props.status == 'active' ? true : false}
          onChange={(e) => {
            if (e.target.checked) {
              this.update_offer('active', this.props.id);
            } else {
              this.update_offer('inactive', this.props.id);
            }
          }}
        />
        <label htmlFor={this.props.id} className="checktoggle"></label>
      </>
    );
  }
}

export default Offers;
