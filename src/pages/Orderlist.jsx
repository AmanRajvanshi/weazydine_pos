import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";

import delete_icon from "../assets/images/icons/delete.svg";
import edit_icon from "../assets/images/icons/edit.svg";
import moment from "moment";

class Orderlist extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Orders</h4>
              </div>
            </div>
            <div className="comp-sec-wrapper">
              <section className="comp-section">
                <div className="row pb-4">
                  <div className="col-md-12">
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                        >
                          Home
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table  datanew">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Items</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Channel</th>
                        <th>Status</th>
                        <th style={{ textAlign: "end" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <Link to="/orderdetails">
                          <td>WD-1878787</td>
                        </Link>
                        <td>10</td>
                        <td>{moment().calendar()}</td>
                        <td>Online</td>
                        <td>Dine-in</td>
                        <td>Accepted</td>
                        <td style={{ display: "flex", justifyContent: "end" }}>
                          <span
                            style={{
                              marginRight: "5px",
                            }}
                          >
                            Pending
                          </span>
                          <div className="status-toggle">
                            <input
                              type="checkbox"
                              id="status_1"
                              className="check"
                              isChecked
                            />
                            <label
                              htmlFor="status_1"
                              className="checktoggle"
                            ></label>
                          </div>
                          <span
                            style={{
                              marginLeft: "5px",
                            }}
                          >
                            Completed
                          </span>
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
    );
  }
}

export default Orderlist;
