import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/main_logo.png";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarText: false,
    };
  }
  render() {
    return (
      <>
        <div className="header">
          <div className="header-left border-0">
            <div className="logo">
              <img src={logo} alt="" />
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
        <div
          className="sidebar"
          id="sidebar"
          onMouseEnter={() => {
            document.getElementById("sidebar").style.width = "250px";
            this.setState({ sidebarText: true });
          }}
          onMouseLeave={() => {
            document.getElementById("sidebar").style.width = "90px";
            this.setState({ sidebarText: false });
          }}
        >
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
                    <i className="fa-solid fa-gauge"></i>
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
                    <i className="fa-solid fa-signs-post"></i>
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
                    <i class="fa-brands fa-algolia"></i>
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
                    <i className="fa-solid fa-kitchen-set"></i>
                    {this.state.sidebarText ? <span>KOT</span> : ""}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    id="sidebar_text"
                    className={({ isActive }) =>
                      isActive ? "active" : "not-active"
                    }
                    to="/productlist"
                  >
                    <i className="fa-solid fa-clipboard-list"></i>
                    {this.state.sidebarText ? <span>Product List</span> : ""}
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
                    <i className="fa-solid fa-list"></i>
                    {this.state.sidebarText ? <span>Category List</span> : ""}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
