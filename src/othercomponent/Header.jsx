import React, { Component } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Bars, Circles } from 'react-loader-spinner';
import profile from '../assets/images/profile.png';
import { AuthContext } from '../AuthContextProvider';
import blackLogo from '../assets/images/logoBlack.png';
import moment from 'moment';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export class Header extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      dropdown: false,
      is_loading: true,
      next_page: '',
      total_count: '',
    };
  }

  componentDidMount() {
    console.log(this.context.token)
    this.fetch_notifications(this.state.page);
  }

  logOut = () => {
    fetch(global.api + 'logout_vendor', {
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
        global.token = null;
        this.context.logout();
        this.props.navigate('/login', { replace: true });
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
    fetch(global.api + 'fetch_vendor_notification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
                    this.props.navigate('/');
                  }}
                >
                  <strong>{this.context.user.name}</strong>
                </h4>
              </a>
            </div>
          </div>
          <a id="mobile_btn" className="mobile_btn">
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <ul className="nav user-menu">
            <li className="nav-item dropdown">
              <a
                className="dropdown-toggle nav-link"
                onClick={() => {
                  document.documentElement.requestFullscreen()
                    ? document.exitFullscreen()
                    : document.documentElement.requestFullscreen();
                }}
              >
                <i className="fa-solid fa-expand"></i>
              </a>
            </li>
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
                    toast.error('No Notifications');
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
                              <Link to={'/' + item.notification_url}>
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
                                          .startOf('seconds')
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
                    style={{ width: '40px', height: '40px' }}
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
          <div className="sidebar1" id="sidebar">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                <Sidebar
                  width={245}
                  collapsedWidth={245}
                  backgroundColor="rgb(249, 249, 249, 0.7)"
                >
                  <Menu>
                    <MenuItem routerLink={<Link to="/" />}>
                      <span>Dashboard</span>
                    </MenuItem>
                    <MenuItem routerLink={<Link to="/pos" />}>
                      <span>POS</span>
                    </MenuItem>
                    <MenuItem routerLink={<Link to="/orderlist" />}>
                      <span>Orders</span>
                    </MenuItem>
                    <MenuItem routerLink={<a href="/kot" target="_blank"/>}>
                      <span>KOT</span>
                    </MenuItem>
                    <SubMenu label="Catalogue">
                      <MenuItem routerLink={<Link to="/productlist" />}>
                        <span>Product List</span>
                      </MenuItem>
                      <MenuItem routerLink={<Link to="/categorylist" />}>
                        <span>Category List</span>
                      </MenuItem>
                    </SubMenu>

                    <SubMenu label="Inventory">
                      <MenuItem routerLink={<Link to="/inventorycategory" />}>
                        <span>Inventory Category</span>
                      </MenuItem>
                      <MenuItem routerLink={<Link to="/inventoryproducts" />}>
                        <span>Inventory Products</span>
                      </MenuItem>
                    </SubMenu>

                    <SubMenu label="Reports">
                      <MenuItem routerLink={<Link to="/salesreport" />}>
                        <span>Sales Report</span>
                      </MenuItem>
                      <MenuItem routerLink={<Link to="/orderreport" />}>
                        <span>Order Report</span>
                      </MenuItem>
                      <MenuItem routerLink={<Link to="/productreport" />}>
                        <span>Product Report</span>
                      </MenuItem>
                    </SubMenu>

                    <MenuItem routerLink={<Link to="/crm" />}>
                      <span>CRM</span>
                    </MenuItem>

                    <SubMenu label="Setup">
                      <MenuItem routerLink={<Link to="/dineinlisting" />}>
                        <span>Dine In Management</span>
                      </MenuItem>
                      <MenuItem routerLink={<Link to="/pickuppoint" />}>
                        <span>Pickup Points Management</span>
                      </MenuItem>
                    </SubMenu>
                  </Menu>
                </Sidebar>
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
