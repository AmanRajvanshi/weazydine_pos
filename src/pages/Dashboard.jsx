import React, { Component } from "react";
import Header from "../othercomponent/Header";
import Sidebar from "../othercomponent/Sidebar";

export class Dashboard extends Component {
  render() {
    return (
      <>
        <div className="main-wrappers">
          <Header />
          <Sidebar />
          <div className="page-wrapper">
            <div className="content">
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
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
                        $
                        <span className="counters" data-count={307144.0}>
                          $307,144.00
                        </span>
                      </h5>
                      <h6>Total Purchase Due</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
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
                        $
                        <span className="counters" data-count={4385.0}>
                          $4,385.00
                        </span>
                      </h5>
                      <h6>Total Sales Due</h6>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="dash-widget dash2">
                    <div className="dash-widgetimg">
                      <span>
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash3.svg"
                          alt="img"
                        />
                      </span>
                    </div>
                    <div className="dash-widgetcontent">
                      <h5>
                        $
                        <span className="counters" data-count="385656.50">
                          385,656.50
                        </span>
                      </h5>
                      <h6>Total Sale Amount</h6>
                    </div>
                  </div>
                </div>
                <h4>Tables</h4>
                <div className="col-lg-4 col-sm-6 col-12 d-flex">
                  <div className="dash-count">
                    <div className="dash-counts">
                      <h4>Table 1</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12 d-flex">
                  <div className="dash-count1">
                    <div className="dash-counts">
                      <h4>Table 2</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12 d-flex">
                  <div className="dash-count">
                    <div className="dash-counts">
                      <h4>Table 3</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12 d-flex">
                  <div className="dash-count1">
                    <div className="dash-counts">
                      <h4>Table 4</h4>
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

export default Dashboard;
