import React, { Component } from "react";
import Header from "../othercomponent/Header";
import Sidebar from "../othercomponent/Sidebar";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import delete_icon from "../assets/images/icons/delete.svg"
import edit_icon from "../assets/images/icons/edit.svg"

export class Categorylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openedit: false,
    };
  }
  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header />
          <Sidebar />
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Category List</h4>
                  <h6>Manage your categories</h6>
                </div>
                <div className="page-btn">
                  <a
                    className="btn btn-added"
                    onClick={() => {
                      this.setState({ open: true });
                    }}
                  >
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/plus.svg"
                      alt="img"
                      className="me-1"
                    />
                    Add New Category
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table  datanew">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Products</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="productimgname">
                            <a
                              href="javascript:void(0);"
                              className="product-img"
                            >
                              <img
                                src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product1.jpg"
                                alt="product"
                              />
                            </a>
                            <a href="javascript:void(0);">Macbook pro</a>
                          </td>
                          <td>12</td>
                          <td>
                            <a
                              className="me-3"
                              onClick={() => {
                                this.setState({ openedit: true });
                              }}
                            >
                              <img
                                src={edit_icon}
                                alt="img"
                              />
                            </a>
                            <a
                              className="confirm-text"
                              href="javascript:void(0);"
                            >
                              <img
                                src={delete_icon}
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
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Add Category</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-submit me-2"
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.openedit}
          onClose={() => this.setState({ openedit: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Edit Category</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-submit me-2"
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default Categorylist;
