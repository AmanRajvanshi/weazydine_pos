import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import { AuthContext } from '../AuthContextProvider';
import { Bars } from 'react-loader-spinner';
import { BiRupee } from 'react-icons/bi';
import { Modal } from 'react-responsive-modal';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { RadioButton, RadioGroup } from 'react-radio-buttons';
import Skeletonloader from '../othercomponent/Skeletonloader';
import no_cart from '../assets/images/cart_empty.png';
import no_product from '../assets/images/no_products_found.png';
import { toStatement } from '@babel/types';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

class Pos extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      products: [],
      active_cat: 0,
      isloading: true,
      cart: [],
      load_item: true,
      grandTotal: 0,
      subTotal: 0,
      taxes: 0,
      isModalOpen: false,
      is_buttonloding: false,
      contact: '',
      user_id: '',
      name: '',
      payment_step: 0,
      order_method: 'TakeAway',
      show_table: false,
      table_no: 0,
      type: 'product',
      split: false,
      split_payment: [
        { amount: 0, method: 'Cash' },
        { amount: 0, method: 'Card' },
        { amount: 0, method: 'UPI' },
      ],
      split_total: 0,
      product_show: false,
    };
  }

  componentDidMount() {
    if (this.props.table_id != undefined) {
      this.setState({ table_no: this.props.table_id, order_method: 'DineIn' });
      this.orderDetails(this.props.table_id);
    }
    this.fetchCategories();
    // this.fetchProducts(0, this.state.type, 1);
  }

  active_cat = (id) => {
    this.setState({ active_cat: id });
    this.fetchProducts(id, this.state.type, 1);
  };

  onCloseModal = () => {
    this.setState({ product_show: false });
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

  fetchProducts = (category_id, type, page) => {
    this.setState({ load_item: true, product_show: true });
    fetch(global.api + 'vendor_get_vendor_product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        vendor_category_id: category_id,
        product_type: type,
        page: page,
        status: 'active',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          if (page == 1) {
            this.setState({ products: [] });
          }
        } else {
          if (json.data.data.length > 0) {
            this.setState({ products: json.data.data });
          }
        }
        this.setState({ load_item: false, isloading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  fetchCategories = () => {
    fetch(global.api + 'fetch_vendor_category', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
        } else {
          this.setState({ category: json.data });
          // this.fetchProducts(0, this.state.type, 1);
        }
        // console.warn(json.data)
        this.setState({ load_item: false, isloading: false });
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // this.setState({ isloading: false });
      });
  };

  add_to_cart = (product, vv_id, addons) => {
    let final_price = 0;
    toast.success(product.product_name + ' added to cart');
    var bb = [];
    addons.map((item, index) => {
      bb.push(item);
    });

    var match = false;
    var key = 0;
    var breaknow = false;

    for (var i = 0; i < this.state.cart.length; i++) {
      var item = this.state.cart[i];
      if (item.product.id == product.id && item.variant_id == vv_id) {
        if (bb.length == 0 && item.cart_addon.length == 0) {
          key = i;
          match = true;
          break;
        } else {
          if (bb.length == item.cart_addon.length) {
            for (var j = 0; j < bb.length; j++) {
              var item1 = bb[j];
              if (item.cart_addon.includes(item1)) {
                key = i;
                match = true;
              } else {
                match = false;
                break;
              }
            }
          }
        }

        if (breaknow) {
          break;
        }
      }
    }

    var cart = this.state.cart;

    this.state.cart.map((item, index) => {
      final_price = parseFloat(final_price) + parseFloat(item.price);
    });

    if (match) {
      var quantity = cart[key].quantity + 1;
      var price = cart[key].price / cart[key].quantity;
      final_price =
        parseFloat(final_price) -
        parseFloat(cart[key].price) +
        parseFloat(price) * parseFloat(quantity);
      cart[key].quantity = quantity;

      cart[key].price = (parseFloat(price) * parseFloat(quantity)).toFixed(2);
      this.setState({ cart: cart });
    } else {
      let total = parseFloat(product.our_price);
      product.variants.map((item, index) => {
        if (item.id == vv_id) {
          total = item.variants_discounted_price;
        }
      });

      product.addon_map.map((item, index) => {
        if (addons.includes(item.id)) {
          total = total + item.addon_price;
        }
      });

      if (
        this.context.user.gstin != null &&
        this.context.user.gst_type == 'inclusive'
      ) {
        total = parseFloat(total / 1.05);
      }
      var cart2 = {
        product_id: product.id,
        product: product,
        variant_id: vv_id,
        cart_addon: bb,
        quantity: 1,
        price: total.toFixed(2),
      };

      final_price = parseFloat(final_price) + parseFloat(total);
      this.setState({ cart: [...this.state.cart, cart2] });
    }

    this.calculateTotal(final_price);
  };

  calculateTotal = (finalPrice) => {
    if (this.context.user.gstin != null) {
      let gst = parseFloat(finalPrice * 5) / 100;
      let total = parseFloat(finalPrice) + parseFloat(gst);
      this.setState({
        subTotal: finalPrice.toFixed(2),
        taxes: gst.toFixed(2),
        grandTotal: total.toFixed(2),
      });
    } else {
      this.setState({
        subTotal: finalPrice,
        taxes: 0,
        grandTotal: finalPrice,
      });
    }
  };

  update_cart = (key_id, quantity) => {
    var final_price = this.state.subTotal;

    if (quantity == 0) {
      var cart = this.state.cart;
      final_price = final_price - cart[key_id].price;

      cart.splice(key_id, 1);
      this.setState({ cart: cart });
    } else {
      var cart = this.state.cart;
      var price = cart[key_id].price / cart[key_id].quantity;
      final_price = final_price - cart[key_id].price + price * quantity;

      cart[key_id].quantity = quantity;
      cart[key_id].price = price * quantity;
      this.setState({ cart: cart });
    }

    this.calculateTotal(final_price);
  };

  clear_cart = () => {
    this.setState({ cart: [] });
  };

  search = (e) => {
    if (e.target.value.length > 3) {
      fetch(global.api + 'search_product', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          search_query: e.target.value,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          //  console.warn(json);
          // if (!json.status) {
          //   var msg = json.msg;

          // } else {

          this.setState({ products: json.data });

          // }
          // this.setState({ isloading: false, load_data: false });
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ isloading: false });
        });
    } else {
      this.fetchProducts(this.state.active_cat, this.state.type, 1);
    }
  };

  verifyCustomer = () => {
    this.setState({ is_buttonloding: true });
    var phoneNumber = this.state.contact;
    let rjx = /^[0]?[6789]\d{9}$/;
    let isValid = rjx.test(phoneNumber);
    if (!isValid) {
      toast.error('Please enter valid mobile number');
      this.setState({ is_buttonloding: false });
    } else {
      fetch(global.api + 'verify_contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          contact: this.state.contact,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          // console.warn(json);
          if (!json.status) {
            var msg = json.msg;
            toast.error(msg);
          } else {
            this.setState({ user_id: json.data.id });
            if (json.data.name == null || json.data.name == '') {
              this.setState({ payment_step: 1 });
            } else {
              this.setState({ name: json.data.name, payment_step: 2 });
            }
            toast.success('done');
          }
          this.setState({ is_buttonloding: false });
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    }
  };

  updateCustomer = () => {
    this.setState({ is_buttonloding: true });
    fetch(global.api + 'update_customer_name', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        contact: this.state.contact,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({ payment_step: 2 });

          toast.success('done');
        }
        this.setState({ is_buttonloding: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // this.setState({ isloading: false });
      });
  };

  update_order_method = (method) => {
    if (method == 'DineIn') {
      this.setState({ order_method: method, show_table: true });
    } else {
      this.setState({ order_method: method, show_table: false });
    }
  };

  next_step = () => {
    if (
      this.state.contact != null &&
      this.state.contact != '' &&
      this.state.order_method == 'DineIn'
    ) {
      this.setState({ payment_step: 2 });
    } else {
      this.setState({ user_id: '', contact: '', name: '' });
    }

    this.setState({ isModalOpen: true });
  };

  place_order = (payment_method) => {
    this.setState({ is_buttonloding: true });

    var order_method = this.state.order_method;
    if (
      this.state.order_method != 'TakeAway' &&
      this.state.order_method != 'Delivery'
    ) {
      var order_method = this.state.table_no;
    }

    fetch(global.api + 'place_pos_order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        cart: this.state.cart,
        method: order_method,
        payment_method: payment_method,
        split_payment: this.state.split_payment,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({
            payment_step: 0,
            isModalOpen: false,
            cart: [],
            subTotal: 0,
            taxes: 0,
            grandTotal: 0,
          });
          toast.success('Order Placed');
          Swal.fire({
            icon: 'success',
            title: 'Order Placed',
            text: 'Order Placed Successfully',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Print Receipt',
            denyButtonText: `View Order`,
            cancelButtonText: 'Close',
          }).then((result) => {
            if (result.isConfirmed) {
              this.sendUrlToPrint(
                // 'http://192.168.1.7:3000/print/' +
                //   this.props.id +
                //   '/1.pdf'
                global.api + json.data.order_code + '/bill.pdf'
              );
            } else if (result.isDenied) {
              this.props.navigate('/orderdetails/' + json.data.order_code);
            }
          });
        }
        this.setState({ is_buttonloding: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // this.setState({ isloading: false });
      });
  };

  update_order_type = (table_uu_id) => {
    this.orderDetails(table_uu_id);
    this.setState({
      order_method: 'DineIn',
      table_no: table_uu_id,
      show_table: false,
    });
  };

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
        // console.warn(json)
        if (!json.status) {
          this.setState({ isLoading: false, data: [] });
        } else {
          this.setState({
            name: json.data[0].user.name,
            user_id: json.data[0].user.id,
            contact: json.data[0].user.contact,
          });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  guest = () => {
    this.setState({ user_id: '1', contact: '0000000000', name: 'Guest' });
    this.setState({ payment_step: 2 });
    this.setState({ isModalOpen: true });
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

  render() {
    return (
      <div className="main-wrappers">
        <Header sidebar={false} />
        {this.state.isloading ? (
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
        ) : (
          <div
            className="page-wrapper"
            id="sidebar"
            style={{
              margin: '0 0 0 20px',
            }}
          >
            <div className="content">
              <div className="row">
                {this.state.show_table ? (
                  <div className="col-lg-8 col-sm-12 ">
                    <Tables update_order_type={this.update_order_type} />
                  </div>
                ) : (
                  <div className="col-lg-8 col-sm-12 ">
                    <div className="col-md-12 mb-20">
                      {/* <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({ is_loading: true });
                              this.fetchProducts(0, 'product', 1);
                            }}
                          >
                            Product
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({ is_loading: true });
                              this.fetchProducts(0, 'package', 1);
                            }}
                          >
                            Combos
                          </a>
                        </li>
                      </ul> */}
                    </div>
                    <div className="row">
                      {this.state.category.length > 0 ? (
                        <Category
                          active_cat={this.state.active_cat}
                          category={this.state.category}
                          fetch_product={this.active_cat}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div
                      style={{
                        position: 'fixed',
                        width: '60%',
                        height: '70vh',
                        overflowX: 'scroll',
                      }}
                    >
                      <div className="tabs_container">
                        <div className="tab_content active" data-tab="fruits">
                          <div
                            className="row m-0"
                            style={{
                              paddingTop: '20px',
                            }}
                          >
                            <Modal
                              open={this.state.product_show}
                              onClose={() => this.onCloseModal()}
                              center
                              showCloseIcon={true}
                              styles={{
                                modal: {
                                  width: '100%',
                                  maxWidth:"60vw"
                                },
                              }}
                              classNames={{
                                modal: 'new_modal_styling new_modal_styling2',
                              }}
                            >
                              <div className='w-100'>
                                <h5
                                  className="mb-2 fw-600 font-md"
                                  style={{
                                    paddingLeft: '10px',
                                    paddingBottom: '10px',
                                    borderBottom: '1px solid #e0e0e0',
                                  }}
                                >
                                  Select The Product To Add
                                </h5>

                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  onChange={(e) => this.search(e)}
                                  placeholder="Search Here...."
                                  style={{
                                    width: '100%',
                                    height: '40px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    padding: '0 10px',
                                    position: 'relative',
                                    margin: '10px 0 30px',
                                  }}
                                />
                                <div className="row">
                                  {!this.state.load_item ? (
                                    this.state.products.length > 0 ? (
                                      this.state.products.map((item, index) => {
                                        return (
                                          <Products
                                            key={index}
                                            data={item}
                                            product_show={
                                              this.state.product_show
                                            }
                                            cart={this.add_to_cart}
                                          />
                                        );
                                      })
                                    ) : (
                                      <div className="d-flex align-items-center justify-content-center flex-column">
                                        <img
                                          src={no_product}
                                          alt=""
                                          style={{
                                            height: '300px',
                                            paddingBottom: '20px',
                                          }}
                                        />
                                        <h6>No Product Found.</h6>
                                      </div>
                                    )
                                  ) : (
                                    <Skeletonloader height={210} count={2} />
                                  )}
                                </div>
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="col-lg-4 col-sm-12 sidebar_scroll">
                  <div
                    style={{
                      position: 'fixed',
                      zIndex: 99,
                      width: '30%',
                      height: '80%',
                    }}
                  >
                    <PosAdd
                      order_method={this.state.order_method}
                      next_step={this.next_step}
                      clear={this.clear_cart}
                      cart={this.state.cart}
                      update_cart={this.update_cart}
                      subTotal={this.state.subTotal}
                      grandTotal={this.state.grandTotal}
                      taxes={this.state.taxes}
                      update_order_method={this.update_order_method}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Modal
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false, split: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Place POS Order</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                {this.state.payment_step == 0 ? (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Customer Contact</label>
                        <input
                          type="text"
                          onChange={(e) => {
                            this.setState({ contact: e.target.value });
                          }}
                          value={this.state.contact}
                          maxLength="10"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-start">
                      <a
                        // href="javascript:void(0);"
                        onClick={() => {
                          this.guest();
                        }}
                        className="btn  btn-outline btn-sm me-2"
                      >
                        Skip
                      </a>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">
                      {this.state.is_buttonloding ? (
                        <button
                          className="btn btn-primary btn-sm me-2"
                          style={{
                            pointerEvents: 'none',
                            opacity: '0.8',
                          }}
                        >
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Updating
                        </button>
                      ) : (
                        <a
                          // href="javascript:void(0);"
                          onClick={() => {
                            this.verifyCustomer();
                          }}
                          className="btn btn-primary btn-sm me-2"
                        >
                          Verify Customer
                        </a>
                      )}
                    </div>
                  </div>
                ) : this.state.payment_step == 1 ? (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Customer Contact</label>
                        <input
                          type="text"
                          onChange={(e) => {
                            this.setState({ contact: e.target.value });
                          }}
                          value={this.state.contact}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label>Customer Name</label>
                        <input
                          type="text"
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                          value={this.state.name}
                        />
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
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Updating
                        </button>
                      ) : (
                        <a
                          // href="javascript:void(0);"
                          onClick={() => {
                            this.updateCustomer();
                          }}
                          className="btn btn-primary btn-sm me-2"
                        >
                          Update Customer
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <h3>Hello, {this.state.name}</h3>
                        <h5>
                          <b>Total Payable- </b> <BiRupee />
                          {this.state.grandTotal}
                        </h5>
                        {this.state.order_method != 'DineIn' ? (
                          <label style={{ marginTop: '20px' }}>
                            Select Payment Method
                          </label>
                        ) : (
                          <label style={{ marginTop: '20px' }}>
                            Confirm Order{' '}
                          </label>
                        )}

                        {this.state.is_buttonloding ? (
                          <button
                            className="btn btn-primary btn-sm me-2"
                            style={{
                              pointerEvents: 'none',
                              opacity: '0.8',
                            }}
                          >
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Updating
                          </button>
                        ) : (
                          <div className="setvaluecash">
                            {this.state.order_method != 'DineIn' ? (
                              !this.state.split ? (
                                <ul>
                                  <li>
                                    <a
                                      onClick={() => {
                                        this.place_order('Cash');
                                      }}
                                      href="javascript:void(0);"
                                      className="paymentmethod"
                                    >
                                      <img
                                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/cash.svg"
                                        alt="img"
                                        className="me-2"
                                      />
                                      Cash
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0);"
                                      onClick={() => {
                                        this.place_order('Card');
                                      }}
                                      className="paymentmethod"
                                    >
                                      <img
                                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/debitcard.svg"
                                        alt="img"
                                        className="me-2"
                                      />
                                      Card
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0);"
                                      onClick={() => {
                                        this.place_order('UPI');
                                      }}
                                      className="paymentmethod"
                                    >
                                      <img
                                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/scan.svg"
                                        alt="img"
                                        className="me-2"
                                      />
                                      Scan
                                    </a>
                                  </li>

                                  <li>
                                    <a
                                      href="javascript:void(0);"
                                      onClick={() => {
                                        this.setState({ split: true });
                                        // this.place_order("offline-UPI");
                                      }}
                                      className="paymentmethod"
                                    >
                                      <img
                                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/scan.svg"
                                        alt="img"
                                        className="me-2"
                                      />
                                      Split
                                    </a>
                                  </li>
                                </ul>
                              ) : (
                                <>
                                  {this.state.split_payment.map(
                                    (item, index) => {
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
                                                type="number"
                                                className="form-control w-100"
                                                onChange={(e) => {
                                                  this.add_split_amount(
                                                    e.target.value,
                                                    index
                                                  );
                                                }}
                                                value={this.state[item.amount]}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}

                                  <h5>Total - {this.state.split_total} </h5>
                                  {this.state.split_total ==
                                    this.state.grandTotal && (
                                    <div
                                      className="btn btn-primary"
                                      style={{ width: '100%' }}
                                      onClick={() => {
                                        this.place_order('split');
                                      }}
                                    >
                                      <h5>Place Order</h5>
                                    </div>
                                  )}
                                </>
                              )
                            ) : (
                              <ul style={{ justifyContent: 'center' }}>
                                <li>
                                  <a
                                    onClick={() => {
                                      this.place_order('offline-cash');
                                    }}
                                    href="javascript:void(0);"
                                    className="paymentmethod"
                                  >
                                    <img
                                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/cash.svg"
                                      alt="img"
                                      className="me-2"
                                    />
                                    Confirm Order
                                  </a>
                                </li>
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

class PosAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: true,
    };
  }
  render() {
    return (
      <>
        <div className="card card-order h-100">
          <div className="card-header">
            <RadioGroup
              value={this.props.order_method}
              // value={this.state.is_veg}
              // onChange={(e) => {
              // this.props.update_order_method(e.target.value);
              // }}

              // value={this.state.is_veg}
              onChange={(e) => {
                this.props.update_order_method(e);
              }}
              horizontal
            >
              <RadioButton
                value="TakeAway"
                pointColor="#f3c783"
                iconSize={20}
                rootColor="#bf370d"
                iconInnerSize={10}
                padding={8}
              >
                TakeAway
              </RadioButton>
              <RadioButton
                value="Delivery"
                pointColor="#f3c783"
                iconSize={20}
                rootColor="#065f0a"
                iconInnerSize={10}
                padding={8}
              >
                Delivery
              </RadioButton>

              <RadioButton
                value="DineIn"
                pointColor="#f3c783"
                iconSize={20}
                rootColor="#bf370d"
                iconInnerSize={10}
                padding={8}
              >
                DineIn
              </RadioButton>
            </RadioGroup>
          </div>

          {this.props.cart.length > 0 ? (
            <>
              <div className="card-body py-0">
                <div className="totalitem">
                  <h4>Total items : {this.props.cart.length}</h4>
                  <a
                    style={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      color: 'red',
                    }}
                    onClick={() => {
                      this.props.clear();
                    }}
                  >
                    Remove all
                  </a>
                </div>
                <div className="product-table w-100">
                  {this.props.cart.map((item, index) => {
                    return (
                      <ul key={index} className="product-lists pos_add_div">
                        <li>
                          <div className="productimg">
                            <div className="productcontet">
                              <h4 className="text-start">
                                {item.product.product_name}
                                {item.product.variants.map((i, index) => {
                                  if (i.id == item.variant_id) {
                                    return (
                                      <p key={index}>- {i.variants_name}</p>
                                    );
                                  }
                                })}
                              </h4>
                              <div className="productlinkset">
                                {item.product.addon_map.map((i, key) => {
                                  if (item.cart_addon.includes(i.id)) {
                                    return <h5 key={key}>{i.addon_name}</h5>;
                                  }
                                })}
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <AddDelete
                                    key_id={index}
                                    quantity={item.quantity}
                                    update_cart={this.props.update_cart}
                                  />
                                </div>
                                <div className="col-6">
                                  <p style={{ marginTop: '10px' }}>
                                    X {(item.price / item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          {' '}
                          <BiRupee />
                          {item.price}
                        </li>
                        <li className="d-flex align-items-start">
                          <a className="confirm-text" href="#!">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                              alt="img"
                              onClick={() => {
                                this.props.update_cart(index, 0);
                              }}
                            />
                          </a>
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
              <div className="card-footer pt-0 pb-2">
                <div className="setvalue">
                  <ul>
                    <li>
                      <h5>Subtotal</h5>
                      <h6>
                        {' '}
                        <BiRupee />
                        {this.props.subTotal}
                      </h6>
                    </li>
                    <li>
                      <h5>Tax</h5>
                      <h6>
                        {' '}
                        <BiRupee />
                        {this.props.taxes}
                      </h6>
                    </li>
                    <li className="total-value">
                      <h5>Total</h5>
                      <h6>
                        {' '}
                        <BiRupee />
                        {this.props.grandTotal}
                      </h6>
                    </li>
                  </ul>
                </div>
                <div
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    this.props.next_step();
                  }}
                >
                  <h5>Place Order</h5>
                </div>
              </div>
            </>
          ) : (
            <div className="card-body pt-0 d-flex align-items-center justify-content-center flex-column">
              <img src={no_cart} alt="" />
              <h5>No Product Added.</h5>
            </div>
          )}
        </div>
      </>
    );
  }
}

class AddDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      quantity: this.props.quantity,
    };
  }
  render() {
    return (
      <div className="increment-decrement">
        <div className="input-groups">
          <input
            type="button"
            defaultValue="-"
            className="button-minus dec button"
            onClick={() => {
              this.props.update_cart(
                this.props.key_id,
                this.props.quantity - 1
              );
              // this.setState({ count: this.state.count - 1 });
            }}
          />
          <div style={{ marginLeft: 5, marginRight: 5 }}>
            {this.props.quantity}
          </div>

          <input
            type="button"
            defaultValue="+"
            className="button-plus inc button"
            onClick={() => {
              this.props.update_cart(
                this.props.key_id,
                this.props.quantity + 1
              );
              // this.setState({ count: this.state.count + 1 });
            }}
          />
        </div>
      </div>
    );
  }
}

class Category extends Component {
  render() {
    return (
      <>
        <div
          className="col-pos-div d-flex"
          onClick={() => {
            this.props.fetch_product(0);
          }}
          style={{ padding: '15px' }}
        >
          <div className="productset flex-fill">
            {/* <div className="productsetimg"></div> */}
            <div className="productsetcontent">
              <div>
                <h4>Search</h4>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-pos-div d-flex"
          onClick={() => {
            this.props.fetch_product(0);
          }}
          style={{ padding: '15px' }}
        >
          <div className="productset flex-fill">
            {/* <div className="productsetimg"></div> */}
            <div className="productsetcontent">
              <div>
                <h4>All</h4>
              </div>
            </div>
          </div>
        </div>

        {this.props.category.length > 0 ? (
          this.props.category.map((item, index) => (
            <div
              className="col-pos-div d-flex"
              onClick={() => {
                this.props.fetch_product(item.id);
              }}
              style={{ padding: '15px' }}
            >
              <div className="productset flex-fill">
                {/* <div className="productsetimg"></div> */}
                <div className="productsetcontent">
                  <div>
                    <h4>
                      {' '}
                      {item.name} ({item.products_count}){' '}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </>
      // <div className='col-4'>
      // {/* <ul className="tabs ">
      //   <li
      //     onClick={() => {
      //       this.props.fetch_product(0);
      //     }}
      //   > */}
      //     <div
      //       className={
      //         'product-details' +
      //         (this.props.active_cat == 0 ? ' active' : '')
      //       }
      //     >
      //       <h6>All</h6>
      //     </div>
      //   {/* </li> */}

      //   {this.props.category.length > 0 ? (
      //     this.props.category.map((item, index) => {
      //       return (
      //         // <li
      //         //   key={index}
      //         //   onClick={() => {
      //         //     this.props.fetch_product(item.id);
      //         //   }}
      //         // >
      //           <div
      //             className={
      //               'product-details' +
      //               (this.props.active_cat == item.id ? ' active' : '')
      //             }
      //           >
      //             <h6>
      //               {item.name} ({item.products_count})
      //             </h6>
      //           </div>
      //         // </li>
      //       );
      //     })
      //   ) : (
      //     <></>
      //   )}

      // {/* </ul> */}
      // </div>
    );
  }
}

class Products extends Component {
  constructor(props) {
    super(props);
    if (this.props.data.variants.length > 0) {
      var vv = this.props.data.variants[0].id;
    } else {
      var vv = 0;
    }

    this.state = {
      openModal: false,
      variants_id: vv,
      addon: [],
    };
  }

  add_cart(product) {
    if (product.addon_map.length > 0 || product.variants.length > 0) {
      this.setState({ openModal: true });
    } else {
      this.props.cart(product, this.state.variants_id, this.state.addon);
    }
  }

  select_addon = (id) => {
    if (this.state.addon.includes(id)) {
      var index = this.state.addon.indexOf(id);
      if (index > -1) {
        this.state.addon.splice(index, 1);
      }
    } else {
      this.state.addon.push(id);
    }
    this.setState({ addon: this.state.addon });
  };

  onCloseModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    return (
      <div className="col-md-3">
        <div
          className=" d-flex"
          onClick={() => {
            this.add_cart(this.props.data);
          }}
        >
          {/* <div className='col-4'>
          <img
                src={this.props.data.product_img}
                alt="img"
                style={{ width: 40,objectFit:'contain',height:40 }}
                // className="product_image"
              />
            </div>
          <div className='col-8'>
       
            </div> */}

          <div
            className="productset flex-fill"
            style={{ paddingBottom: '10px', marginBottom: '15px' }}
          >
            <div className="productsetcontent">
              <div className="row">
                {/* <div className="col-3">
                  <img
                    src={this.props.data.product_img}
                    alt="img"
                    style={{
                      width: '60px',
                      objectFit: 'contain',
                      height: '60px',
                    }}
                    // className="product_image"
                  />
                </div> */}

                <div className="col-12">
                  <h4>{this.props.data.product_name}</h4>
                  <h6>
                    {' '}
                    <BiRupee />
                    {this.props.data.our_price}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={this.state.openModal}
          onClose={() => this.onCloseModal()}
          center
          showCloseIcon={true}
          classNames={{
            modal: 'customModal',
          }}
        >
          <h5
            className="mb-2 fw-600 font-md"
            style={{
              paddingLeft: '10px',
              paddingBottom: '10px',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            Customise as per your taste
          </h5>
          <div className="mx-2">
            {this.props.data.variants.length > 0 ? (
              <>
                <h5 className="title-color font-sm fw-600 text-align-center mt-3 mb-3">
                  Variant
                </h5>
                <RadioGroup
                  value={this.state.variants_id.toString()}
                  onChange={(value) => {
                    this.setState({ variants_id: value, count: 0 });
                    //this.setState({ variants_id: value });
                  }}
                >
                  {this.props.data.variants.map((values, key) => {
                    return (
                      <RadioButton
                        value={values.id.toString()}
                        pointColor="#f3c783"
                        iconSize={20}
                        rootColor="#37474f"
                        iconInnerSize={10}
                        padding={10}
                        props={{
                          className: 'radio-button',
                        }}
                        key={key}
                      >
                        <div className="d-flex justify-content-between align-items-center radio_button_text">
                          <p className="m-0">{values.variants_name}</p>
                          <div className="d-flex">
                            <p className="deleted-text p-0 m-0">
                              <BiRupee />
                              {values.variants_price}
                            </p>
                            <p className="m-0 mx-3">
                              <BiRupee /> {values.variants_discounted_price}
                            </p>
                          </div>
                        </div>
                      </RadioButton>
                    );
                  })}
                </RadioGroup>
              </>
            ) : (
              <></>
            )}
            {this.props.data.addon_map.length > 0 ? (
              <>
                <h5 className="title-color font-sm fw-600 text-align-center mt-3 mb-3">
                  Addon
                </h5>
                {this.props.data.addon_map.map((values, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex align-items-center single_checkbox new_checkbox w-100 my-3"
                    >
                      <input
                        type="checkbox"
                        id={values.id}
                        name={values.id}
                        value={values.id}
                        className="checkbox"
                        checked={this.state.addon.includes(values.id)}
                        onChange={() => {
                          this.select_addon(values.id);
                        }}
                      />
                      <label
                        htmlFor={values.id}
                        className="checkbox_text d-flex justify-content-between align-items-center"
                      >
                        <p className="m-0 mx-3">{values.addon_name}</p>
                        <p className="m-0 mx-3">
                          <BiRupee /> {values.addon_price}
                        </p>
                      </label>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}

            <div className="d-flex align-items-center justify-content-end">
              <a
                onClick={() => {
                  this.setState({ openModal: false });
                  this.props.cart(
                    this.props.data,
                    this.state.variants_id,
                    this.state.addon
                  );
                }}
                className="btn btn-primary"
              >
                Add Item
              </a>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

class Tables extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      is_loading: true,
    };
  }

  componentDidMount() {
    this.fetch_table_vendors();
  }

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
            this.setState({ data: json.data });
          }
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
        <h4>Dine-In</h4>
        <div className="row" style={{ marginTop: 10 }}>
          {this.state.is_loading ? (
            <Skeletonloader count={1} height={100} />
          ) : (
            <>
              {this.state.data.length > 0 ? (
                this.state.data.map((item, index) => {
                  return (
                    <div key={index} className="col-lg-4">
                      <a
                        onClick={() => {
                          this.props.update_order_type(item.table_uu_id);
                        }}
                        // to={"/tableorderdetails/" + item.table_uu_id}
                        className=" d-flex w-100"
                      >
                        <div
                          className={
                            item.table_status == 'active'
                              ? 'dash-count1'
                              : 'dash-count'
                          }
                        >
                          <div className="dash-counts">
                            <h4>{item.table_name}</h4>
                            <h6
                              style={{
                                textTransform: 'capitalize',
                              }}
                            >
                              {item.table_status}
                            </h6>

                            {/* <a href={item.qr_link}>Download QR</a> */}
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  const location = useLocation();
  return (
    <Pos {...props} {...useParams()} navigate={abcd} location={location} />
  );
}

export default (props) => <Navigate {...props} />;
