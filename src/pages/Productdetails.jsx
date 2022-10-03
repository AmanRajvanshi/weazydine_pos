import React, { Component } from "react";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Header } from "../othercomponent/Header";

export class Productdetails extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Product Details</h4>
              </div>
              <Link to="/editproduct/1">
                <button className="btn btn-added">Edit</button>
              </Link>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="slider-product">
                      <img
                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product69.jpg"
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="productdetails">
                      <ul className="product-bar">
                        <li>
                          <h4>Product</h4>
                          <h6>Macbook pro </h6>
                        </li>
                        <li>
                          <h4>Category</h4>
                          <h6>Computers</h6>
                        </li>
                        {/* <li>
                          <h4>Unit</h4>
                          <h6>Piece</h6>
                        </li>
                        <li>
                          <h4>SKU</h4>
                          <h6>PT0001</h6>
                        </li>
                        <li>
                          <h4>Minimum Qty</h4>
                          <h6>5</h6>
                        </li>
                        <li>
                          <h4>Quantity</h4>
                          <h6>50</h6>
                        </li> */}
                        {/* <li>
                          <h4>Tax</h4>
                          <h6>0.00 %</h6>
                        </li> */}
                        <li>
                          <h4>Discount Type</h4>
                          <h6>Percentage</h6>
                        </li>
                        <li>
                          <h4>Market Price</h4>
                          <h6>
                            <BiRupee /> 1500.00
                          </h6>
                        </li>
                        <li>
                          <h4>Our Price</h4>
                          <h6>
                            <BiRupee /> 1500.00
                          </h6>
                        </li>
                        <li>
                          <h4>Status</h4>
                          <h6>Active</h6>
                        </li>
                        <li>
                          <h4>Description</h4>
                          <h6>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                          </h6>
                        </li>
                        <li>
                          <h4>Variants</h4>
                          <ul>
                            <li>
                              <h6
                                style={{
                                  width: "100%",
                                }}
                              >
                                Color
                              </h6>
                            </li>
                            <li>
                              <h6
                                style={{
                                  width: "100%",
                                }}
                              >
                                Color
                              </h6>
                            </li>
                            <li>
                              <h6
                                style={{
                                  width: "100%",
                                }}
                              >
                                Color
                              </h6>
                            </li>
                            <li>
                              <h6
                                style={{
                                  width: "100%",
                                }}
                              >
                                Color
                              </h6>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h4>Addons</h4>
                          <ul>
                            <li>
                              <h6
                                style={{
                                  width: "100%",
                                }}
                              >
                                Color
                              </h6>
                            </li>
                            <li>
                              <h6
                                style={{
                                  width: "100%",
                                }}
                              >
                                Color
                              </h6>
                            </li>
                            <li>
                              <h6
                                style={{
                                  width: "100%",
                                }}
                              >
                                Color
                              </h6>
                            </li>
                            <li>
                              <h6
                                style={{
                                  width: "100%",
                                }}
                              >
                                Color
                              </h6>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Productdetails;
