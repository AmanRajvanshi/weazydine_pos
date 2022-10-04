import React, { Component } from "react";
import Header from "../othercomponent/Header";
import { Bars } from "react-loader-spinner";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContextProvider.js";
export class Dashboard extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isloading: true,
    };
  }

  loader = (value) => {
    this.setState({ isloading: value });
  };
  render() {
    return (
      <>
        <div className="main-wrappers">
          <Header />
          {this.state.isloading ? (
            <div className="main_loader">
              <Bars
                height="80"
                width="80"
                color="#eda332"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className="page-wrapper">
              <div className="content">
                <div className="row">
                  <div className="col-lg-3 col-sm-3 col-12">
                    <div className="dash-widget">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash1.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h5>
                          <span className="counters" data-count={307144.0}>
                            1200
                          </span>
                        </h5>
                        <h6>Total Orders</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-3 col-12">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h5>
                          <BiRupee />
                          <span className="counters" data-count={4385.0}>
                            4,385.00
                          </span>
                        </h5>
                        <h6>Total Sales</h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-3 col-12">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h5>
                          <BiRupee />
                          <span className="counters" data-count={4385.0}>
                            4,385.00
                          </span>
                        </h5>
                        <h6>Total Sales</h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-3 col-12">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h5>
                          <BiRupee />
                          <span className="counters" data-count={4385.0}>
                            4,385.00
                          </span>
                        </h5>
                        <h6>Total Sales</h6>
                      </div>
                    </div>
                  </div>

                  <Tables isloading={this.loader} />
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

class Tables extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetch_table_vendors();
  }

  fetch_table_vendors = () => {
    fetch(global.api + "fetch_table_vendors", {
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
        if (!json.status) {
          var msg = json.msg;
        } else {
          if (json.data.length > 0) {
            this.setState({ data: json.data });
          }
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.props.isloading(false);
      });
  };

  render() {
    return (
      <>
        {this.state.data.length > 0 ? (
          <>
            <h4>Dine-In</h4>
            <div className="row" style={{ marginTop: 10 }}>
              {this.state.data.map((item, index) => {
                return (
                  <div className="col-lg-3 col-sm-6 col-12">
                    <Link
                      to={"/tableorderdetails/" + item.table_uu_id}
                      className=" d-flex w-100"
                    >
                      <div
                        className={
                          item.table_status == "active"
                            ? "dash-count1"
                            : "dash-count"
                        }
                      >
                        <div className="dash-counts">
                          <h4>{item.table_name}</h4>
                          <h6
                            style={{
                              textTransform: "capitalize",
                            }}
                          >
                            {item.table_status}
                          </h6>

                          {/* <a href={item.qr_link}>Download QR</a> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Dashboard;
