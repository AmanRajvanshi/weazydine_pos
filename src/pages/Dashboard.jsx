import React, { Component } from "react";
import logo from "../assets/images/main_logo.png";
import Header from "../othercomponent/Header";

export class Dashboard extends Component {
  render() {
    return (
      <>
        <div className="main-wrappers">
          <Header />
          <div className="page-wrapper ms-0">
            <div className="content">
              <div className="row">
                <div className="col-lg-2 sidebar_scroll">
                  <ul className="tabs owl-carousel owl-theme owl-product border-0">
                    <li className="active" id="fruits">
                      <div className="product-details active">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product62.png"
                          alt="img"
                        />
                        <h6>Fruits</h6>
                      </div>
                    </li>
                    <li id="headphone">
                      <div className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product63.png"
                          alt="img"
                        />
                        <h6>Headphones</h6>
                      </div>
                    </li>
                    <li id="Accessories">
                      <div className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product64.png"
                          alt="img"
                        />
                        <h6>Accessories</h6>
                      </div>
                    </li>
                    <li id="Shoes">
                      <a className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product65.png"
                          alt="img"
                        />
                        <h6>Shoes</h6>
                      </a>
                    </li>
                    <li id="computer">
                      <a className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product66.png"
                          alt="img"
                        />
                        <h6>Computer</h6>
                      </a>
                    </li>
                    <li id="Snacks">
                      <a className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product67.png"
                          alt="img"
                        />
                        <h6>Snacks</h6>
                      </a>
                    </li>
                    <li id="watch">
                      <a className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product68.png"
                          alt="img"
                        />
                        <h6>Watches</h6>
                      </a>
                    </li>
                    <li id="cycle">
                      <a className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product61.png"
                          alt="img"
                        />
                        <h6>Cycles</h6>
                      </a>
                    </li>
                    <li id="fruits1">
                      <div className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product62.png"
                          alt="img"
                        />
                        <h6>Fruits</h6>
                      </div>
                    </li>
                    <li id="headphone1">
                      <div className="product-details">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product63.png"
                          alt="img"
                        />
                        <h6>Headphones</h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-7 col-sm-12 tabs_wrapper">
                  <div className="tabs_container">
                    <div className="tab_content active" data-tab="fruits">
                      <div className="row">
                        <div className="col-lg-3 col-sm-6 d-flex">
                          <div className="productset flex-fill active">
                            <div className="productsetimg">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product29.jpg"
                                alt="img"
                              />
                              <h6>Qty: 5.00</h6>
                              <div className="check-product">
                                <i className="fa fa-check" />
                              </div>
                            </div>
                            <div className="productsetcontent">
                              <h5>Fruits</h5>
                              <h4>Orange</h4>
                              <h6>150.00</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 d-flex">
                          <div className="productset flex-fill">
                            <div className="productsetimg">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product31.jpg"
                                alt="img"
                              />
                              <h6>Qty: 1.00</h6>
                              <div className="check-product">
                                <i className="fa fa-check" />
                              </div>
                            </div>
                            <div className="productsetcontent">
                              <h5>Fruits</h5>
                              <h4>Strawberry</h4>
                              <h6>15.00</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 d-flex">
                          <div className="productset flex-fill">
                            <div className="productsetimg">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product35.jpg"
                                alt="img"
                              />
                              <h6>Qty: 5.00</h6>
                              <div className="check-product">
                                <i className="fa fa-check" />
                              </div>
                            </div>
                            <div className="productsetcontent">
                              <h5>Fruits</h5>
                              <h4>Banana</h4>
                              <h6>150.00</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 d-flex">
                          <div className="productset flex-fill">
                            <div className="productsetimg">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product37.jpg"
                                alt="img"
                              />
                              <h6>Qty: 5.00</h6>
                              <div className="check-product">
                                <i className="fa fa-check" />
                              </div>
                            </div>
                            <div className="productsetcontent">
                              <h5>Fruits</h5>
                              <h4>Limon</h4>
                              <h6>1500.00</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 d-flex">
                          <div className="productset flex-fill">
                            <div className="productsetimg">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product54.jpg"
                                alt="img"
                              />
                              <h6>Qty: 5.00</h6>
                              <div className="check-product">
                                <i className="fa fa-check" />
                              </div>
                            </div>
                            <div className="productsetcontent">
                              <h5>Fruits</h5>
                              <h4>Apple</h4>
                              <h6>1500.00</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-12 sidebar_scroll">
                  <div className="order-list">
                    <div className="orderid">
                      <h4>Order List</h4>
                      <h5>Transaction id : #65565</h5>
                    </div>
                    <div className="actionproducts">
                      <ul>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="deletebg confirm-text"
                          >
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                              alt="img"
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="dropset"
                          >
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/ellipise1.svg"
                              alt="img"
                            />
                          </a>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                            data-popper-placement="bottom-end"
                          >
                            <li>
                              <a href="#" className="dropdown-item">
                                Action
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item">
                                Another Action
                              </a>
                            </li>
                            <li>
                              <a href="#" className="dropdown-item">
                                Something Elses
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card card-order">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-adds"
                            data-bs-toggle="modal"
                            data-bs-target="#create"
                          >
                            <i className="fa fa-plus me-2" />
                            Add Customer
                          </a>
                        </div>
                        <div className="col-lg-12">
                          <div className="select-split">
                            <div className="select-group w-100">
                              <select className="select">
                                <option>Walk-in Customer</option>
                                <option>Chris Moris</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="select-split">
                            <div className="select-group w-100">
                              <select className="select">
                                <option>Product</option>
                                <option>Barcode</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="split-card" />
                    <div className="card-body pt-0">
                      <div className="totalitem">
                        <h4>Total items : 4</h4>
                        <a href="javascript:void(0);">Clear all</a>
                      </div>
                      <div className="product-table">
                        <ul className="product-lists">
                          <li>
                            <div className="productimg">
                              <div className="productimgs">
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product30.jpg"
                                  alt="img"
                                />
                              </div>
                              <div className="productcontet">
                                <h4>
                                  Pineapple
                                  <a
                                    href="javascript:void(0);"
                                    className="ms-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit"
                                  >
                                    <img
                                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-5.svg"
                                      alt="img"
                                    />
                                  </a>
                                </h4>
                                <div className="productlinkset">
                                  <h5>PT001</h5>
                                </div>
                                <AddDelete />
                              </div>
                            </div>
                          </li>
                          <li>3000.00</li>
                          <li>
                            <a
                              className="confirm-text"
                              href="javascript:void(0);"
                            >
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                                alt="img"
                              />
                            </a>
                          </li>
                        </ul>
                        <ul className="product-lists">
                          <li>
                            <div className="productimg">
                              <div className="productimgs">
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product34.jpg"
                                  alt="img"
                                />
                              </div>
                              <div className="productcontet">
                                <h4>
                                  Green Nike
                                  <a
                                    href="javascript:void(0);"
                                    className="ms-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit"
                                  >
                                    <img
                                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-5.svg"
                                      alt="img"
                                    />
                                  </a>
                                </h4>
                                <div className="productlinkset">
                                  <h5>PT001</h5>
                                </div>
                                <div className="increment-decrement">
                                  <div className="input-groups">
                                    <input
                                      type="button"
                                      defaultValue="-"
                                      className="button-minus dec button"
                                    />
                                    <input
                                      type="text"
                                      name="child"
                                      defaultValue={0}
                                      className="quantity-field"
                                    />
                                    <input
                                      type="button"
                                      defaultValue="+"
                                      className="button-plus inc button"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>3000.00</li>
                          <li>
                            <a
                              className="confirm-text"
                              href="javascript:void(0);"
                            >
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                                alt="img"
                              />
                            </a>
                          </li>
                        </ul>
                        <ul className="product-lists">
                          <li>
                            <div className="productimg">
                              <div className="productimgs">
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product35.jpg"
                                  alt="img"
                                />
                              </div>
                              <div className="productcontet">
                                <h4>
                                  Banana
                                  <a
                                    href="javascript:void(0);"
                                    className="ms-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit"
                                  >
                                    <img
                                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-5.svg"
                                      alt="img"
                                    />
                                  </a>
                                </h4>
                                <div className="productlinkset">
                                  <h5>PT001</h5>
                                </div>
                                <div className="increment-decrement">
                                  <div className="input-groups">
                                    <input
                                      type="button"
                                      defaultValue="-"
                                      className="button-minus dec button"
                                    />
                                    <input
                                      type="text"
                                      name="child"
                                      defaultValue={0}
                                      className="quantity-field"
                                    />
                                    <input
                                      type="button"
                                      defaultValue="+"
                                      className="button-plus inc button"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>3000.00</li>
                          <li>
                            <a
                              className="confirm-text"
                              href="javascript:void(0);"
                            >
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                                alt="img"
                              />
                            </a>
                          </li>
                        </ul>
                        <ul className="product-lists">
                          <li>
                            <div className="productimg">
                              <div className="productimgs">
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product31.jpg"
                                  alt="img"
                                />
                              </div>
                              <div className="productcontet">
                                <h4>
                                  Strawberry
                                  <a
                                    href="javascript:void(0);"
                                    className="ms-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit"
                                  >
                                    <img
                                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-5.svg"
                                      alt="img"
                                    />
                                  </a>
                                </h4>
                                <div className="productlinkset">
                                  <h5>PT001</h5>
                                </div>
                                <div className="increment-decrement">
                                  <div className="input-groups">
                                    <input
                                      type="button"
                                      defaultValue="-"
                                      className="button-minus dec button"
                                    />
                                    <input
                                      type="text"
                                      name="child"
                                      defaultValue={0}
                                      className="quantity-field"
                                    />
                                    <input
                                      type="button"
                                      defaultValue="+"
                                      className="button-plus inc button"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>3000.00</li>
                          <li>
                            <a
                              className="confirm-text"
                              href="javascript:void(0);"
                            >
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                                alt="img"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="split-card" />
                    <div className="card-body pt-0 pb-2">
                      <div className="setvalue">
                        <ul>
                          <li>
                            <h5>Subtotal</h5>
                            <h6>55.00$</h6>
                          </li>
                          <li>
                            <h5>Tax</h5>
                            <h6>5.00$</h6>
                          </li>
                          <li className="total-value">
                            <h5>Total</h5>
                            <h6>60.00$</h6>
                          </li>
                        </ul>
                      </div>
                      <div className="setvaluecash">
                        <ul>
                          <li>
                            <a
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
                              className="paymentmethod"
                            >
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/debitcard.svg"
                                alt="img"
                                className="me-2"
                              />
                              Debit
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0);"
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
                        </ul>
                      </div>
                      <div className="btn-totallabel">
                        <h5>Checkout</h5>
                        <h6>60.00$</h6>
                      </div>
                      <div className="btn-pos">
                        <ul>
                          <li>
                            <a className="btn">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/pause1.svg"
                                alt="img"
                                className="me-1"
                              />
                              Hold
                            </a>
                          </li>
                          <li>
                            <a className="btn">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-6.svg"
                                alt="img"
                                className="me-1"
                              />
                              Quotation
                            </a>
                          </li>
                          <li>
                            <a className="btn">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/trash12.svg"
                                alt="img"
                                className="me-1"
                              />
                              Void
                            </a>
                          </li>
                          <li>
                            <a className="btn">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/wallet1.svg"
                                alt="img"
                                className="me-1"
                              />
                              Payment
                            </a>
                          </li>
                          <li>
                            <a
                              className="btn"
                              data-bs-toggle="modal"
                              data-bs-target="#recents"
                            >
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/transcation.svg"
                                alt="img"
                                className="me-1"
                              />
                              Transaction
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="calculator"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Define Quantity</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="calculator-set">
                  <div className="calculatortotal">
                    <h4>0</h4>
                  </div>
                  <ul>
                    <li>
                      <a href="javascript:void(0);">1</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">2</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">3</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">4</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">5</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">6</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">7</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">8</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">9</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="btn btn-closes">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/close-circle.svg"
                          alt="img"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">0</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);" className="btn btn-reverse">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/reverse.svg"
                          alt="img"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="holdsales"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Hold order</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="hold-order">
                  <h2>4500.00</h2>
                </div>
                <div className="form-group">
                  <label>Order Reference</label>
                  <input type="text" />
                </div>
                <div className="para-set">
                  <p>
                    The current order will be set on hold. You can retreive this
                    order from the pending order button. Providing a reference
                    to it might help you to identify the order more quickly.
                  </p>
                </div>
                <div className="col-lg-12">
                  <a className="btn btn-submit me-2">Submit</a>
                  <a className="btn btn-cancel" data-bs-dismiss="modal">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="edit" tabIndex={-1} aria-hidden="true">
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Order</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Product Price</label>
                      <input type="text" defaultValue={20} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Product Price</label>
                      <select className="select">
                        <option>Exclusive</option>
                        <option>Inclusive</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label> Tax</label>
                      <div className="input-group">
                        <input type="text" />
                        <a className="scanner-set input-group-text"> % </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Discount Type</label>
                      <select className="select">
                        <option>Fixed</option>
                        <option>Percentage</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Discount</label>
                      <input type="text" defaultValue={20} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Sales Unit</label>
                      <select className="select">
                        <option>Kilogram</option>
                        <option>Grams</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <a className="btn btn-submit me-2">Submit</a>
                  <a className="btn btn-cancel" data-bs-dismiss="modal">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="create"
          tabIndex={-1}
          aria-labelledby="create"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Customer Name</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Country</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <a className="btn btn-submit me-2">Submit</a>
                  <a className="btn btn-cancel" data-bs-dismiss="modal">
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="delete"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Deletion</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="delete-order">
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/close-circle1.svg"
                    alt="img"
                  />
                </div>
                <div className="para-set text-center">
                  <p>
                    The current order will be deleted as no payment has been{" "}
                    <br />
                    made so far.
                  </p>
                </div>
                <div className="col-lg-12 text-center">
                  <a className="btn btn-danger me-2">Yes</a>
                  <a className="btn btn-cancel" data-bs-dismiss="modal">
                    No
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="recents"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Recent Transactions</h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="tabs-sets">
                  <ul className="nav nav-tabs" id="myTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="purchase-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#purchase"
                        type="button"
                        aria-controls="purchase"
                        aria-selected="true"
                        role="tab"
                      >
                        Purchase
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="payment-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#payment"
                        type="button"
                        aria-controls="payment"
                        aria-selected="false"
                        role="tab"
                      >
                        Payment
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="return-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#return"
                        type="button"
                        aria-controls="return"
                        aria-selected="false"
                        role="tab"
                      >
                        Return
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="purchase"
                      role="tabpanel"
                      aria-labelledby="purchase-tab"
                    >
                      <div className="table-top">
                        <div className="search-set">
                          <div className="search-input">
                            <a className="btn btn-searchset">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/search-white.svg"
                                alt="img"
                              />
                            </a>
                          </div>
                        </div>
                        <div className="wordset">
                          <ul>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="pdf"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/pdf.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="excel"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/excel.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="print"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/printer.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table datanew">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Reference</th>
                              <th>Customer</th>
                              <th>Amount</th>
                              <th className="text-end">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>2022-03-07</td>
                              <td>INV/SL0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>INV/SL0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>INV/SL0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>INV/SL0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>INV/SL0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>INV/SL0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>INV/SL0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="payment" role="tabpanel">
                      <div className="table-top">
                        <div className="search-set">
                          <div className="search-input">
                            <a className="btn btn-searchset">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/search-white.svg"
                                alt="img"
                              />
                            </a>
                          </div>
                        </div>
                        <div className="wordset">
                          <ul>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="pdf"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/pdf.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="excel"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/excel.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="print"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/printer.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table datanew">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Reference</th>
                              <th>Customer</th>
                              <th>Amount</th>
                              <th className="text-end">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0102</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0103</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0104</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0105</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0106</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0107</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="return" role="tabpanel">
                      <div className="table-top">
                        <div className="search-set">
                          <div className="search-input">
                            <a className="btn btn-searchset">
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/search-white.svg"
                                alt="img"
                              />
                            </a>
                          </div>
                        </div>
                        <div className="wordset">
                          <ul>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="pdf"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/pdf.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="excel"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/excel.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="print"
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/printer.svg"
                                  alt="img"
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table datanew">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Reference</th>
                              <th>Customer</th>
                              <th>Amount</th>
                              <th className="text-end">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0101</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0102</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0103</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0104</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0105</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0106</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>2022-03-07</td>
                              <td>0107</td>
                              <td>Walk-in Customer</td>
                              <td>$ 1500.00</td>
                              <td>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/eye.svg"
                                    alt="img"
                                  />
                                </a>
                                <a className="me-3" href="javascript:void(0);">
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                                    alt="img"
                                  />
                                </a>
                                <a
                                  className="me-3 confirm-text"
                                  href="javascript:void(0);"
                                >
                                  <img
                                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete.svg"
                                    alt="img"
                                  />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class AddDelete extends React.Component {
  render() {
    return (
      <div className="increment-decrement">
        <div className="input-groups">
          <input
            type="button"
            defaultValue="-"
            className="button-minus dec button"
          />
          <input
            type="text"
            name="child"
            defaultValue={0}
            className="quantity-field"
          />
          <input
            type="button"
            defaultValue="+"
            className="button-plus inc button"
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
