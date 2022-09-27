import React, { Component } from "react";
import logo from "./assets/images/main_logo.png";

export class App extends Component {
  render() {
    return (
      <>
        <div className="main-wrappers">
          <div className="header">
            <div className="header-left border-0">
            <a
            href="javascript:void(0)"
            className="add-list hamburger_header color-bg"
            onClick={() => this.openNav()}
            style={{
              width: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              float: "right",
            }}
          >
            <i className="fa fa-bars" style={{ display: "block !important" }} />
          </a>
            </div>
            <ul className="nav user-menu">
              <li className="nav-item">
                <div className="top-nav-search">
                  <a href="javascript:void(0);" className="responsive-search">
                    <i className="fa fa-search" />
                  </a>
                  <form action="#">
                    <div className="searchinputs">
                      <input type="text" placeholder="Search Here ..." />
                      <div className="search-addon">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/closes.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                    </div>
                    <a className="btn" id="searchdiv">
                      <img
                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/search.svg"
                        alt="img"
                      />
                    </a>
                  </form>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle nav-link"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/notification-bing.svg"
                    alt="img"
                  />
                  <span className="badge rounded-pill">4</span>
                </a>
                <div className="dropdown-menu notifications">
                  <div className="topnav-dropdown-header">
                    <span className="notification-title">Notifications</span>
                    <a href="javascript:void(0)" className="clear-noti">
                      {" "}
                      Clear All{" "}
                    </a>
                  </div>
                  <div className="noti-content">
                    <ul className="notification-list">
                      <li className="notification-message">
                        <a href="https://dreamspos.dreamguystech.com/html/template/activities.html">
                          <div className="media d-flex">
                            <span className="avatar flex-shrink-0">
                              <img
                                alt=""
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/profiles/avatar-02.jpg"
                              />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details">
                                <span className="noti-title">John Doe</span>{" "}
                                added new task
                                <span className="noti-title">
                                  Patient appointment booking
                                </span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">
                                  4 mins ago
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-message">
                        <a href="https://dreamspos.dreamguystech.com/html/template/activities.html">
                          <div className="media d-flex">
                            <span className="avatar flex-shrink-0">
                              <img
                                alt=""
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/profiles/avatar-03.jpg"
                              />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details">
                                <span className="noti-title">
                                  Tarah Shropshire
                                </span>
                                changed the task name
                                <span className="noti-title">
                                  Appointment booking with payment gateway
                                </span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">
                                  6 mins ago
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-message">
                        <a href="https://dreamspos.dreamguystech.com/html/template/activities.html">
                          <div className="media d-flex">
                            <span className="avatar flex-shrink-0">
                              <img
                                alt=""
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/profiles/avatar-06.jpg"
                              />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details">
                                <span className="noti-title">Misty Tison</span>{" "}
                                added
                                <span className="noti-title">
                                  Domenic Houston
                                </span>{" "}
                                and
                                <span className="noti-title">
                                  Claire Mapes
                                </span>{" "}
                                to project
                                <span className="noti-title">
                                  Doctor available module
                                </span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">
                                  8 mins ago
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-message">
                        <a href="https://dreamspos.dreamguystech.com/html/template/activities.html">
                          <div className="media d-flex">
                            <span className="avatar flex-shrink-0">
                              <img
                                alt=""
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/profiles/avatar-17.jpg"
                              />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details">
                                <span className="noti-title">
                                  Rolland Webber
                                </span>
                                completed task
                                <span className="noti-title">
                                  Patient and Doctor video conferencing
                                </span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">
                                  12 mins ago
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="notification-message">
                        <a href="https://dreamspos.dreamguystech.com/html/template/activities.html">
                          <div className="media d-flex">
                            <span className="avatar flex-shrink-0">
                              <img
                                alt=""
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/profiles/avatar-13.jpg"
                              />
                            </span>
                            <div className="media-body flex-grow-1">
                              <p className="noti-details">
                                <span className="noti-title">
                                  Bernardo Galaviz
                                </span>
                                added new task
                                <span className="noti-title">
                                  Private chat module
                                </span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">
                                  2 days ago
                                </span>
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="topnav-dropdown-footer">
                    <a href="https://dreamspos.dreamguystech.com/html/template/activities.html">
                      View all Notifications
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown has-arrow main-drop">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle nav-link userset"
                  data-bs-toggle="dropdown"
                >
                  <span className="user-img">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/profiles/avator1.jpg"
                      alt=""
                    />
                    <span className="status online" />
                  </span>
                </a>
                <div className="dropdown-menu menu-drop-user">
                  <div className="profilename">
                    <div className="profileset">
                      <span className="user-img">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/profiles/avator1.jpg"
                          alt=""
                        />
                        <span className="status online" />
                      </span>
                      <div className="profilesets">
                        <h6>John Doe</h6>
                        <h5>Admin</h5>
                      </div>
                    </div>
                    <hr className="m-0" />
                    <a
                      className="dropdown-item"
                      href="https://dreamspos.dreamguystech.com/html/template/profile.html"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user me-2"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                      My Profile
                    </a>
                    <a
                      className="dropdown-item"
                      href="https://dreamspos.dreamguystech.com/html/template/generalsettings.html"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-settings me-2"
                      >
                        <circle cx={12} cy={12} r={3} />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                      Settings
                    </a>
                    <hr className="m-0" />
                    <a
                      className="dropdown-item logout pb-0"
                      href="https://dreamspos.dreamguystech.com/html/template/signin.html"
                    >
                      <img
                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/log-out.svg"
                        className="me-2"
                        alt="img"
                      />
                      Logout
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="dropdown mobile-user-menu">
              <a
                href="javascript:void(0);"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-v" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a
                  className="dropdown-item"
                  href="https://dreamspos.dreamguystech.com/html/template/profile.html"
                >
                  My Profile
                </a>
                <a
                  className="dropdown-item"
                  href="https://dreamspos.dreamguystech.com/html/template/generalsettings.html"
                >
                  Settings
                </a>
                <a
                  className="dropdown-item"
                  href="https://dreamspos.dreamguystech.com/html/template/signin.html"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
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

export default App;
