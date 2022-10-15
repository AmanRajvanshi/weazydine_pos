import React, { Component } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";

import profile from "../assets/images/profile.png";
import { AuthContext } from "../AuthContextProvider";
export class Header extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      sidebarText: true,
      dropdown: false,
    };
  }

  componentDidMount() {
    console.log(this.context.token);
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

  render() {
    return (
      <>
        <div className="header">
          <div className="header-left border-0">
            <div className="logo">
              <a>
                <h4
                  onClick={() => {
                    this.props.navigate(-1);
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
              <a
                href="return false;"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <img
                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/notification-bing.svg"
                  alt="img"
                />{" "}
                <span className="badge rounded-pill">4</span>
              </a>
              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
                  <a href="return false" className="clear-noti">
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
                              <span className="noti-title">John Doe</span> added
                              new task{" "}
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
                              changed the task name{" "}
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
                              <span className="noti-title">Misty Tison</span>
                              added{" "}
                              <span className="noti-title">
                                Domenic Houston
                              </span>{" "}
                              and{" "}
                              <span className="noti-title">Claire Mapes</span>{" "}
                              to project{" "}
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
                              <span className="noti-title">Rolland Webber</span>
                              completed task{" "}
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
                              added new task{" "}
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
                      {this.state.sidebarText ? <span>Dine In </span> : ""}
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
