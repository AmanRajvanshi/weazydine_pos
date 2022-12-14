import React, { Component } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Bars } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import logo from '../assets/images/logos/main_logo_white.png';
import logo_black from '../assets/images/logos/main_logo_black.png';
import moment from 'moment';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  MenuItemStyles,
} from 'react-pro-sidebar';
import { dark } from '@material-ui/core/styles/createPalette';

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
      remove_last_slash_and_word: '',
      shop_status: 1,
      role: '',
    };
  }

  componentDidMount() {
    this.fetch_notifications(this.state.page);
    var remove_last_slash_and_word = global.api
      .split('/')
      .slice(0, -2)
      .join('/')
      .concat('/');
    this.setState({
      remove_last_slash_and_word: remove_last_slash_and_word,
      shop_status: this.context.user.shop_open,
      role: this.context.role.role,
    });
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
          if (page === 1) {
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

  update_shop_status = (e) => {
    this.setState({ shop_status: e.target.checked ? 1 : 0 });
    fetch(global.api + 'update_shop_status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        shop_status: e.target.checked ? 1 : 0,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          this.context.get_vendor_profile(this.context.token);
          toast.success('Shop Status Updated Successfully');
        } else {
          toast.error(json.msg);
          this.setState({ shop_status: this.context.user.shop_open });
        }
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  render() {
    const themes = {
      sidebar: {
        backgroundColor: '#0b2948',
        color: '#8ba1b7',
      },
      menu: {
        menuContent: '#082440',
        icon: '#59d0ff',
        hover: {
          backgroundColor: '#0e3052',
          color: '#b6c8d9',
        },
        active: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
        disabled: {
          color: '#3e5e7e',
        },
      },
    };

    const menuItemStyles = {
      root: {
        fontSize: '12px',
        fontWeight: 400,
      },
      icon: {
        color: themes.menu.icon,
        fontSize: '13px',
        marginRight: '0px',
      },
      SubMenuExpandIcon: {
        color: '#b6b7b9',
      },
      subMenuContent: {
        backgroundColor: themes.menu.menuContent,
      },
      label: ({ open }) => ({
        fontWeight: open ? 600 : undefined,
      }),
    };

    return (
      <>
        <div className="header w-100">
          <div className="header-left border-0 w-33 d-flex justify-content-start">
            <div className="logo">
              <Link to="/">
                <img src={logo_black} alt="" />
              </Link>
            </div>
          </div>
          <div className="header-left border-0 w-33 d-flex justify-content-center">
            <div className="logo">
              <a>
                <h4
                  onClick={() => {
                    this.props.navigate('/');
                  }}
                >
                  {this.context.user.name}
                </h4>
              </a>
            </div>
          </div>
          <a
            id="mobile_btn"
            className="mobile_btn"
            onClick={() => {
              document
                .getElementById('sidebar1')
                .classList.toggle('mobile_sidebar_opened');
            }}
          >
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <ul className="nav user-menu w-33 d-flex justify-content-end">
            {this.context.role.role !== 'staff' ? (
              <li className="nav-item dropdown d-flex align-items-center">
                <div className="status-toggle ml-3">
                  <input
                    type="checkbox"
                    id="live_inventory"
                    className="dropdown-toggle nav-link align-items-center d-flex check"
                    checked={this.state.shop_status === 1 ? true : false}
                    onChange={(e) => {
                      this.update_shop_status(e);
                    }}
                  />
                  <label
                    htmlFor="live_inventory"
                    className="checktoggle"
                  ></label>
                </div>
              </li>
            ) : (
              <></>
            )}

            <li className="nav-item dropdown">
              <a
                href={
                  this.state.remove_last_slash_and_word +
                  'qr-shop/' +
                  this.context.user.id
                }
                className="dropdown-toggle nav-link align-items-center d-flex"
                target="_blank"
              >
                Shop QR
                <i
                  className="fa-solid fa-qrcode ms-2"
                  style={{
                    lineHeight: '0',
                  }}
                ></i>
              </a>
            </li>
            <li className="nav-item dropdown has-arrow main-drop">
              <a
                href="return false;"
                className="dropdown-toggle nav-link userset"
                data-bs-toggle="dropdown"
              >
                <i className="fa-solid fa-headset"></i>
              </a>
              <div className="dropdown-menu menu-drop-user">
                <div className="profilename">
                  <p className="p-2">
                    +91 7060-222-517 (Mon - Sat)
                    <br /> (9am to 8pm)
                  </p>
                </div>
              </div>
            </li>
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
                  <i
                    className="fa-solid fa-bell"
                    style={{ color: '#2a6e84' }}
                  ></i>
                </a>
              ) : (
                <a
                  onClick={() => {
                    toast.error('No Notifications');
                  }}
                >
                  <i
                    className="fa-solid fa-bell"
                    style={{ color: '#2a6e84' }}
                  ></i>
                </a>
              )}

              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
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
                        <div className="d-flex align-items-center justify-content-center w-full my-2">
                          <Bars
                            height="20"
                            width="20"
                            color="#5bc2c1"
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
                              <a href={item.notification_url}>
                                <div className="media d-flex">
                                  <div className="media-body flex-grow-1">
                                    <p className="noti-details">
                                      {item.notification_title}
                                    </p>
                                    {item.notification_description == null && (
                                      <p>{item.notification_description}</p>
                                    )}
                                    <p className="noti-time d-flex justify-content-end">
                                      <span className="notification-time">
                                        {moment(item.created_at).fromNow()}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </a>
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
                  <i className="fa-solid fa-shop"></i>
                  <span className="status online" />
                </span>
              </a>
              <div className="dropdown-menu menu-drop-user">
                <div className="profilename">
                  <a className="dropdown-item">
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
                    Hi,{' '}
                    {this.context.role.length !== 0
                      ? this.context.role.name
                      : this.context.user.name}
                  </a>
                  <hr className="m-0" />
                  <Link to="/editprofile" className="dropdown-item">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit.svg"
                      className="me-2"
                      alt="img"
                    />
                    Edit Profile
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
        </div>
        {/* /sidebar */}
        {this.props.sidebar !== false && (
          <div className="sidebar1" id="sidebar1">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                <div className="sidebar_logo_main_div">
                  <img src={logo} className="logo sidebar_logo" alt="img" />
                </div>
                <Sidebar
                  id="sidebar12"
                  width={200}
                  collapsedWidth={200}
                  overflow="scroll"
                  backgroundColor={themes.sidebar.backgroundColor}
                  rootStyles={{
                    color: themes.sidebar.color,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <Menu menuItemStyles={menuItemStyles}>
                      {/* dashboard */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      this.context.role.role === 'staff' ? (
                        <MenuItem
                          routerLink={<Link to="/" />}
                          icon={
                            <i className="iconly-Home icli sidebar_icons"></i>
                          }
                        >
                          <span>Dashboard</span>
                        </MenuItem>
                      ) : (
                        <></>
                      )}
                      {/* pos */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      this.context.role.role === 'staff' ? (
                        <MenuItem
                          routerLink={<Link to="/pos" />}
                          icon={
                            <i className="iconly-Info-Square icli sidebar_icons"></i>
                          }
                        >
                          <span>POS</span>
                        </MenuItem>
                      ) : (
                        <></>
                      )}
                      {/* orders */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      this.context.role.role === 'staff' ? (
                        <MenuItem
                          routerLink={<Link to="/orderlist" />}
                          icon={
                            <i className="iconly-Bag icli sidebar_icons"></i>
                          }
                        >
                          <span>Orders</span>
                        </MenuItem>
                      ) : (
                        <></>
                      )}
                      {/* kot */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      this.context.role.role === 'staff' ? (
                        <MenuItem
                          routerLink={<a href="/kot" target="_blank" />}
                          icon={
                            <i className="iconly-More-Circle icli sidebar_icons"></i>
                          }
                        >
                          <span>
                            Kitchen Display
                            <br /> System
                          </span>
                        </MenuItem>
                      ) : (
                        <></>
                      )}
                      {/* catalogue */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      !this.context.role.role === 'staff' ? (
                        <SubMenu
                          label="Catalogue"
                          icon={
                            <i className="iconly-Folder icli sidebar_icons"></i>
                          }
                        >
                          <MenuItem
                            routerLink={<Link to="/productlist" />}
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>Product List</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/categorylist" />}
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>Category List</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/productaddons" />}
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>Addons List</span>
                          </MenuItem>
                        </SubMenu>
                      ) : (
                        <></>
                      )}
                      {/* inventory */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      this.context.role.role === 'staff' ? (
                        <SubMenu
                          label="Inventory"
                          icon={
                            <i className="iconly-Folder icli sidebar_icons"></i>
                          }
                        >
                          <MenuItem
                            routerLink={<Link to="/inventoryproducts" />}
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>Raw Materials</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/inventorycategory" />}
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>
                              Raw Materials
                              <br /> Category
                            </span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/stock_purchase" />}
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>Stock Purchase</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/releaseStock" />}
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>Stock Release</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/productrecipe" />}
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>Product Recipe</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={
                              <Link to="/semifinishedrawmaterialproducts" />
                            }
                            icon={
                              <i className="iconly-Folder icli sidebar_icons"></i>
                            }
                          >
                            <span>
                              Semi-Finished <br /> Raw Material Recipe
                            </span>
                          </MenuItem>

                          <MenuItem
                            routerLink={<Link to="/supliers" />}
                            icon={
                              <i className="iconly-User2 icli sidebar_icons"></i>
                            }
                          >
                            <span>Suppliers</span>
                          </MenuItem>
                        </SubMenu>
                      ) : (
                        <></>
                      )}
                      {/* reports */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      !this.context.role.role === 'staff' ? (
                        <SubMenu
                          label="Reports"
                          icon={
                            <i className="iconly-Graph icli sidebar_icons"></i>
                          }
                        >
                          <MenuItem
                            routerLink={<Link to="/salesreport" />}
                            icon={
                              <i className="iconly-Graph icli sidebar_icons"></i>
                            }
                          >
                            <span>Transactions</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/orderreport" />}
                            icon={
                              <i className="iconly-Graph icli sidebar_icons"></i>
                            }
                          >
                            <span>Sales Report</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/productreport" />}
                            icon={
                              <i className="iconly-Graph icli sidebar_icons"></i>
                            }
                          >
                            <span>Product Report</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/orderinvoices" />}
                            icon={
                              <i className="iconly-Graph icli sidebar_icons"></i>
                            }
                          >
                            <span>Weazy Invoices</span>
                          </MenuItem>
                        </SubMenu>
                      ) : (
                        <></>
                      )}
                      {/* marketing */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      !this.context.role.role === 'staff' ? (
                        <SubMenu
                          label="Marketing"
                          icon={
                            <i className="iconly-Ticket icli sidebar_icons"></i>
                          }
                        >
                          <MenuItem
                            routerLink={<Link to="/crmcampaigns" />}
                            icon={
                              <i className="iconly-Category icli sidebar_icons"></i>
                            }
                          >
                            <span>Campaigns</span>
                          </MenuItem>
                        </SubMenu>
                      ) : (
                        <></>
                      )}
                      {/* customers */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      !this.context.role.role === 'staff' ? (
                        <SubMenu
                          label="Customers"
                          icon={
                            <i className="iconly-User3 icli sidebar_icons"></i>
                          }
                        >
                          <MenuItem
                            routerLink={<Link to="/customers" />}
                            icon={
                              <i className="iconly-User3 icli sidebar_icons"></i>
                            }
                          >
                            <span>Customers</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/customerinsights" />}
                            icon={
                              <i className="iconly-Filter icli sidebar_icons"></i>
                            }
                          >
                            <span>
                              Customer <br />
                              Insights
                            </span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/customerfeedback" />}
                            icon={
                              <i className="iconly-Heart icli sidebar_icons"></i>
                            }
                          >
                            <span>
                              Customer <br />
                              Feedback
                            </span>
                          </MenuItem>
                        </SubMenu>
                      ) : (
                        <></>
                      )}
                      {/* offers */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      !this.context.role.role === 'staff' ? (
                        <MenuItem
                          routerLink={<Link to="/offers" />}
                          icon={
                            <i className="iconly-Bag icli sidebar_icons"></i>
                          }
                        >
                          <span>Offers</span>
                        </MenuItem>
                      ) : (
                        <></>
                      )}
                      {/* setup */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      !this.context.role.role === 'manager' ||
                      !this.context.role.role === 'staff' ? (
                        <SubMenu
                          label="Setup"
                          icon={
                            <i className="iconly-Setting icli sidebar_icons"></i>
                          }
                        >
                          <MenuItem
                            routerLink={<Link to="/dineinlisting" />}
                            icon={
                              <i className="iconly-Setting icli sidebar_icons"></i>
                            }
                          >
                            <span>
                              Dine In
                              <br />
                              Management
                            </span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/pickuppoint" />}
                            icon={
                              <i className="iconly-Setting icli sidebar_icons"></i>
                            }
                          >
                            <span>
                              Pickup Points
                              <br />
                              Management
                            </span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/kitchens" />}
                            icon={
                              <i className="iconly-Setting icli sidebar_icons"></i>
                            }
                          >
                            <span>
                              Kitchens <br />
                              Management
                            </span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/staffaccounts" />}
                            icon={
                              <i className="iconly-User2 icli sidebar_icons"></i>
                            }
                          >
                            <span>Staff Accounts</span>
                          </MenuItem>
                          <MenuItem
                            routerLink={<Link to="/editprofile" />}
                            icon={
                              <i className="iconly-Setting icli sidebar_icons"></i>
                            }
                          >
                            <span>Store Profile</span>
                          </MenuItem>
                        </SubMenu>
                      ) : (
                        <></>
                      )}
                      {/* learning center */}
                      {this.context.role.role === 'owner' ||
                      this.context.role.role === 'admin' ||
                      this.context.role.role === 'manager' ||
                      this.context.role.role === 'staff' ? (
                        <MenuItem
                          routerLink={<Link to="/comingsoon" />}
                          icon={
                            <i className="iconly-Video icli sidebar_icons"></i>
                          }
                        >
                          <span>Learning Center</span>
                        </MenuItem>
                      ) : (
                        <></>
                      )}
                    </Menu>
                  </div>
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
