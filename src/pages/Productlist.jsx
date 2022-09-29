import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";
import delete_icon from "../assets/images/icons/delete.svg";
import edit_icon from "../assets/images/icons/edit.svg";

export class Productlist extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />

        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Product List</h4>
                <h6>Manage your products</h6>
              </div>
              <div className="page-btn">
                <Link to="/addproduct" className="btn btn-added">
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/plus.svg"
                    alt="img"
                    className="me-1"
                  />
                  Add New Category
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table  datanew">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>MRP</th>
                        <th>Status</th>
                        <th style={{ textAlign: "end" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="productimgname">
                          <a href="javascript:void(0);" className="product-img">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product2.jpg"
                              alt="product"
                            />
                          </a>
                          <a href="javascript:void(0);">Orange</a>
                        </td>
                        <td>
                          <BiRupee />
                          10
                        </td>
                        <td>
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
                        </td>
                        <td style={{ textAlign: "end" }}>
                          <a className="me-3">
                            <img src={edit_icon} alt="img" />
                          </a>
                          <a
                            className="confirm-text"
                            href="javascript:void(0);"
                          >
                            <img src={delete_icon} alt="img" />
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
    );
  }
}

export default Productlist;
