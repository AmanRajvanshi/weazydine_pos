import React, { Component } from "react";
import Header from "../othercomponent/Header";
import moment from "moment";
import { BiRupee } from "react-icons/bi";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export class TableOrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      edit_user_modal: false,
    };
  }
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Order Details</h4>
              </div>
            </div>
            <section className="comp-section comp-cards">
              <div className="row">
                <div className="col-8">
                  {/* order details */}
                  <div className="card flex-fill bg-white">
                    <div className="card-header order_details">
                      <h5>Order ID: WD-1878787</h5>
                      <h6 className="order_date">{moment().calendar()}</h6>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">2 Items</h5>
                      <div className="row">
                        <div className="col-md-10">
                          <div className=" d-flex">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product2.jpg"
                              alt="img"
                              className="single_order_product_img"
                            />
                            <div className="single_order_product_text">
                              <p className="single_order_product_text">
                                asjkjsd
                              </p>
                              <p className="single_order_product_text">
                                <span className="single_product_qty">2</span> x{" "}
                                <BiRupee />
                                30 =
                                <span className="single_product_total">
                                  <BiRupee />
                                  60
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className=" d-flex">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product2.jpg"
                              alt="img"
                              className="single_order_product_img"
                            />
                            <div className="single_order_product_text">
                              <p className="single_order_product_text">
                                asjkjsd
                              </p>
                              <p className="single_order_product_text">
                                <span className="single_product_qty">2</span> x{" "}
                                <BiRupee />
                                30 =
                                <span className="single_product_total">
                                  <BiRupee />
                                  60
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className=" d-flex">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product2.jpg"
                              alt="img"
                              className="single_order_product_img"
                            />
                            <div className="single_order_product_text">
                              <p className="single_order_product_text">
                                asjkjsd
                              </p>
                              <p className="single_order_product_text">
                                <span className="single_product_qty">2</span> x{" "}
                                <BiRupee />
                                30 =
                                <span className="single_product_total">
                                  <BiRupee />
                                  60
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex align-items-start justify-content-end print-receipt">
                          <a href="">
                            <div className="d-flex align-items-center">
                              <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                              <p>Print Receipt</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-muted">
                      <div className="row">
                        <div className="col-md-6">Item Total</div>
                        <div className="col-md-6 d-flex align-items-start justify-content-end item_total">
                          <div className="d-flex align-items-center">
                            <BiRupee />
                            60
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 grand_total">Grand Total</div>
                        <div className="col-md-6 d-flex align-items-start justify-content-end">
                          <div className="d-flex align-items-center grand_total">
                            <BiRupee />
                            60
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* user details */}
                  <div className="card flex-fill bg-white">
                    <div className="card-header order_details">
                      <div className=" d-flex align-items-center justify-content-between">
                        <h5>Customer details</h5>
                        <a
                          className="btn btn-added"
                          style={{
                            color: "#eda332",
                          }}
                          onClick={() =>
                            this.setState({ edit_user_modal: true })
                          }
                        >
                          Edit
                        </a>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">2 Items</h5>
                      <div className="row">
                        <div className="col-md-10">
                          <div className=" d-flex">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product2.jpg"
                              alt="img"
                              className="single_order_product_img"
                            />
                            <div className="single_order_product_text">
                              <p className="single_order_product_text">
                                asjkjsd
                              </p>
                              <p className="single_order_product_text">
                                <span className="single_product_qty">2</span> x{" "}
                                <BiRupee />
                                30 =
                                <span className="single_product_total">
                                  <BiRupee />
                                  60
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className=" d-flex">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product2.jpg"
                              alt="img"
                              className="single_order_product_img"
                            />
                            <div className="single_order_product_text">
                              <p className="single_order_product_text">
                                asjkjsd
                              </p>
                              <p className="single_order_product_text">
                                <span className="single_product_qty">2</span> x{" "}
                                <BiRupee />
                                30 =
                                <span className="single_product_total">
                                  <BiRupee />
                                  60
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className=" d-flex">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product2.jpg"
                              alt="img"
                              className="single_order_product_img"
                            />
                            <div className="single_order_product_text">
                              <p className="single_order_product_text">
                                asjkjsd
                              </p>
                              <p className="single_order_product_text">
                                <span className="single_product_qty">2</span> x{" "}
                                <BiRupee />
                                30 =
                                <span className="single_product_total">
                                  <BiRupee />
                                  60
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex align-items-start justify-content-end print-receipt">
                          <a href="">
                            <div className="d-flex align-items-center">
                              <i className="fa-solid fa-file-invoice  print-receipt-icon"></i>
                              <p>Print Receipt</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-muted">
                      <div className="row">
                        <div className="col-md-6">Item Total</div>
                        <div className="col-md-6 d-flex align-items-start justify-content-end item_total">
                          <div className="d-flex align-items-center">
                            <BiRupee />
                            60
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 grand_total">Grand Total</div>
                        <div className="col-md-6 d-flex align-items-start justify-content-end">
                          <div className="d-flex align-items-center grand_total">
                            <BiRupee />
                            60
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex">
                  <div
                    className="card flex-fill bg-white"
                    style={{
                      height: "200px",
                    }}
                  >
                    <div className="card-body">
                      <div className=" d-flex align-items-start justify-content-between pb-4">
                        <h5>Notes</h5>
                        <a
                          className="btn btn-added"
                          style={{
                            color: "#eda332",
                          }}
                          onClick={() => this.setState({ open: true })}
                        >
                          Add
                        </a>
                      </div>
                      <p>sdghsdgfsdgfsdgf</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
            <div className="page-header m-0">
              <div className="page-title">
                <h4>Add Notes</h4>
                <p className="text-danger text-muted m-0">
                  Max characters 100*
                </p>
              </div>
            </div>
            <div className="card border-none">
              <div className="card-body p-0 pt-4">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        rows={5}
                        className="form-control"
                        placeholder="Enter Notes"
                      ></textarea>
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
          open={this.state.edit_user_modal}
          onClose={() => this.setState({ edit_user_modal: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header m-0">
              <div className="page-title">
                <h4>Edit Customer</h4>
              </div>
            </div>
            <div className="content">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <label>User Name</label>
                        <input type="text" />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="text" />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <div className="pass-group">
                          <input type="password" className=" pass-input" />
                          <span className="fas toggle-password fa-eye-slash" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <label>Mobile</label>
                        <input type="text" />
                      </div>
                      <div className="form-group">
                        <label>Role</label>
                        <select className="select-container">
                          <option>Select</option>
                          <option>Role</option>
                          <option>Role1</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="pass-group">
                          <input type="password" className=" pass-inputs" />
                          <span className="fas toggle-passworda fa-eye-slash" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-submit me-2"
                      >
                        Submit
                      </a>
                      <a href="javascript:void(0);" className="btn btn-cancel">
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TableOrderDetails;
