import React, { Component } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { Bars, Circles } from "react-loader-spinner";
import profile from "../assets/images/profile.png";
import { AuthContext } from "../AuthContextProvider";
import blackLogo from "../assets/images/logoBlack.png";
import moment from "moment";

export class Header extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      sidebarText: true,
      dropdown: false,
      is_loading: true,
      next_page: "",
      total_count: "",
    };
  }

  componentDidMount() {
    // console.log(this.context.token);
    this.fetch_notifications(this.state.page);
  }

  logOut = () => {
    fetch(global.api + "logout_vendor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        global.token = null;
        this.context.logout();
        this.props.navigate("/login", { replace: true });
        // this.props.navigate("/loginpassword", { replace: true });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });

    // try{
    //     AsyncStorage.setItem('token',"");
    //     AsyncStorage.setItem('login',"");
    //     global.login_data=false
    // }
    // catch(e)
    // {
    //     Toast.show("Login Failed")
    // }
    // Toast.show("Logged out successfully!")
    // this.props.navigation.navigate("MobileLogin")
  };

  fetch_notifications = (page) => {
    this.setState({ page: page, load_more: true });
    fetch(global.api + "fetch_vendor_notification", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          toast.error(json.msg);
        } else {
          this.setState({
            total_count: json.data.total,
            next_page: json.data.next_page_url,
          });
          if (page == 1) {
            this.setState({ data: json.data.data });
          } else {
            {
              this.state.next_page
                ? this.setState({
                    data: [...this.state.data, ...json.data.data],
                    page: this.state.page + 1,
                  })
                : this.setState({
                    data: json.data.data,
                  });
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className="header">
          <div className="header-left border-0">
            <div className="logo">
              <a>
                <h4
                  onClick={() => {
                    this.props.navigate("/");
                  }}
                >
                  <strong>{this.context.user.name}</strong>
                </h4>
              </a>
            </div>
          </div>
          <a id="mobile_btn" className="mobile_btn" href="#sidebar">
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <ul className="nav user-menu">
            <li className="nav-item dropdown">
              {this.state.data.length > 0 ? (
                <a
                  href="return false;"
                  className="dropdown-toggle nav-link"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/notification-bing.svg"
                    alt="img"
                  />
                  <span className="badge rounded-pill">
                    {this.state.total_count}
                  </span>
                </a>
              ) : (
                <a
                  onClick={() => {
                    toast.error("No Notifications");
                  }}
                >
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/notification-bing.svg"
                    alt="img"
                  />
                </a>
              )}

              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
                  {/* <a href="return false" className="clear-noti">
                    {" "}
                    Clear All{" "}
                  </a> */}
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    <InfiniteScroll
                      dataLength={this.state.data.length}
                      next={() => {
                        this.fetch_notifications(this.state.page + 1);
                        this.setState({
                          loadMore: true,
                        });
                      }}
                      hasMore={
                        this.state.next_page !== null &&
                        this.state.data.length > 0
                      }
                      loader={
                        <div className="d-flex align-items-center justify-content-center w-full mt-xl">
                          <Bars
                            height="20"
                            width="20"
                            color="#ff9900"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          />
                        </div>
                      }
                    >
                      <>
                        {this.state.data.map((item, index) => {
                          return (
                            <li className="notification-message">
                              <Link to={"/" + item.notification_url}>
                                <div className="media d-flex">
                                  <span className="avatar flex-shrink-0">
                                    <img alt="" src={blackLogo} />
                                  </span>
                                  <div className="media-body flex-grow-1">
                                    <p className="noti-details">
                                      {item.notification_title}
                                    </p>
                                    <p>{item.notification_description}</p>
                                    <p className="noti-time">
                                      <span className="notification-time">
                                        {moment(item.created_at)
                                          .local()
                                          .startOf("seconds")
                                          .fromNow()}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </>
                    </InfiniteScroll>
                  </ul>
                </div>
                {/* <div className="topnav-dropdown-footer">
                  <a href="https://dreamspos.dreamguystech.com/html/template/activities.html">
                    View all Notifications
                  </a>
                </div> */}
              </div>
            </li>

            <li className="nav-item dropdown has-arrow main-drop">
              <a
                href="return false;"
                className="dropdown-toggle nav-link userset"
                data-bs-toggle="dropdown"
              >
                <span className="user-img">
                  <img
                    src={
                      this.context.user.profile_pic == null
                        ? profile
                        : this.context.user.profile_pic
                    }
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span className="status online" />
                </span>
              </a>
              <div className="dropdown-menu menu-drop-user">
                <div className="profilename">
                  <div className="profileset">
                    <span className="user-img">
                      <img
                        src={
                          this.context.user.profile_pic == null
                            ? profile
                            : this.context.user.profile_pic
                        }
                        alt=""
                      />
                      <span className="status online" />
                    </span>
                    <div className="profilesets">
                      <h6>{this.context.user.name}</h6>
                      <h5>Admin</h5>
                    </div>
                  </div>
                  <hr className="m-0" />
                  <Link to="/editprofile" className="dropdown-item">
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
                  </Link>
                  <hr className="m-0" />
                  <a
                    className="dropdown-item logout pb-0"
                    onClick={() => {
                      this.logOut();
                    }}
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
              href="return false;"
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
        {/* /sidebar */}
        {this.props.sidebar != false && (
          <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                  <li>
                    <NavLink
                      id="sidebar_text"
                      end={true}
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active"
                      }
                      to="/"
                    >
                      {/* <i className="fa-solid fa-gauge"></i> */}
                      {this.state.sidebarText ? <span>Dashboard</span> : ""}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      id="sidebar_text"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active"
                      }
                      to="/pos"
                      title="POS"
                    >
                      {/* <i className="fa-solid fa-signs-post"></i> */}
                      {this.state.sidebarText ? <span>POS</span> : ""}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      id="sidebar_text"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active"
                      }
                      to="/orderlist"
                    >
                      {/* <i className="fa-brands fa-algolia"></i> */}
                      {this.state.sidebarText ? <span>Orders</span> : ""}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      id="sidebar_text"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active"
                      }
                      to="/kot"
                    >
                      {/* <i className="fa-solid fa-kitchen-set"></i> */}
                      {this.state.sidebarText ? <span>KOT</span> : ""}
                    </NavLink>
                  </li>

                  <li>
                    <a
                      id="sidebar_text"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active"
                      }
                      onClick={() => {
                        this.setState({ dropdown: !this.state.dropdown });
                      }}
                    >
                      {/* <i className="fa-solid fa-warehouse"></i> */}
                      {this.state.sidebarText ? <span>Catalogue</span> : ""}
                      {this.state.dropdown ? (
                        <span
                          className="menu-arrow"
                          style={{
                            transform: "rotate(90deg)",
                          }}
                        />
                      ) : (
                        <span className="menu-arrow" />
                      )}
                    </a>
                    {this.state.dropdown && (
                      <ul>
                        <li>
                          <NavLink
                            id="sidebar_text"
                            className={({ isActive }) =>
                              isActive ? "active" : "not-active"
                            }
                            to="/productlist"
                          >
                            {/* <i className="fa-solid fa-clipboard-list"></i> */}
                            {this.state.sidebarText ? (
                              <span>Product List</span>
                            ) : (
                              ""
                            )}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="sidebar_text"
                            className={({ isActive }) =>
                              isActive ? "active" : "not-active"
                            }
                            to="/categorylist"
                          >
                            {/* <i className="fa-solid fa-list"></i> */}
                            {this.state.sidebarText ? (
                              <span>Category List</span>
                            ) : (
                              ""
                            )}
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <NavLink
                      id="sidebar_text"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active"
                      }
                      to="/dineinlisting"
                    >
                      {/* <i className="fa-solid fa-table"></i> */}
                      {this.state.sidebarText ? (
                        <span>Dine In Management</span>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <a
                      id="sidebar_text"
                      className={({ isActive }) =>
                        isActive ? "active" : "not-active"
                      }
                      onClick={() => {
                        this.setState({ dropdown: !this.state.dropdown });
                      }}
                    >
                      {/* <i className="fa-solid fa-warehouse"></i> */}
                      {this.state.sidebarText ? <span>Inventory</span> : ""}
                      {this.state.dropdown ? (
                        <span
                          className="menu-arrow"
                          style={{
                            transform: "rotate(90deg)",
                          }}
                        />
                      ) : (
                        <span className="menu-arrow" />
                      )}
                    </a>
                    {this.state.dropdown && (
                      <ul>
                        <li>
                          <NavLink
                            id="sidebar_text"
                            end={true}
                            className={({ isActive }) =>
                              isActive ? "active" : "not-active"
                            }
                            to="/inventorycategory"
                            title="Inventory Category"
                          >
                            {/* <i className="fa-solid fa-gauge"></i> */}
                            {this.state.sidebarText && (
                              <span>Inventory Category</span>
                            )}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            id="sidebar_text"
                            className={({ isActive }) =>
                              isActive ? "active" : "not-active"
                            }
                            to="/inventoryproducts"
                            title="Inventory Products"
                          >
                            {/* <i className="fa-solid fa-signs-post"></i> */}
                            {this.state.sidebarText && (
                              <span>Inventory Products</span>
                            )}
                          </NavLink>
                        </li>
                        {/* <li>
                          <NavLink
                            id="sidebar_text"
                            className={({ isActive }) =>
                              isActive ? "active" : "not-active"
                            }
                            to="/releaseinventory"
                            title="Release Inventory"
                          >
                            {this.state.sidebarText && (
                              <span>Release Inventory</span>
                            )}
                          </NavLink>
                        </li> */}
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  return <Header {...props} {...useParams()} navigate={abcd} />;
}

export default Navigate;
