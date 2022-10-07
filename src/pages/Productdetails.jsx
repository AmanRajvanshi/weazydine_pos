import React, { Component } from "react";
import { BiRupee } from "react-icons/bi";
import { Bars } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../othercomponent/Header";

export class Productdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      is_loding: true,
    };
  }
  componentDidMount() {
    this.productDetails();
  }

  productDetails = () => {
    fetch(global.api + "get_product_details?product_id=" + this.props.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          this.setState({ product: json.data[0] });
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ is_loding: false });
      });
  };
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        {this.state.is_loding ? (
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
              <div className="page-header">
                <div className="page-title">
                  <h4>Product Details</h4>
                </div>
                {/* <Link to="/editproduct/1">
                <button className="btn btn-added">Edit</button>
              </Link> */}
              </div>
              <div className="row">
                <div className="col-lg-3 col-sm-12">
                  <div className="card d-flex justify-content-center align-items-center">
                    <div
                      className="card-body"
                      style={{
                        height: "200px",
                        width: "200px",
                      }}
                    >
                      <img
                        src={this.state.product.product_img}
                        alt="img"
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="productdetails">
                        <ul className="product-bar">
                          <li>
                            <h4>Name</h4>
                            <h6>{this.state.product.product_name}</h6>
                          </li>
                          {/* <li>
                            <h4>Category</h4>
                            <h6>Computers</h6>
                          </li> */}
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
                            <h4>VEG/NON-VEG</h4>
                            {this.state.product.is_veg == "1" ? (
                              <h6>VEG</h6>
                            ) : (
                              <h6>NON-VEG</h6>
                            )}
                          </li>
                          <li>
                            <h4>Market Price</h4>
                            <h6>
                              <BiRupee /> {this.state.product.market_price}
                            </h6>
                          </li>
                          <li>
                            <h4>Our Price</h4>
                            <h6>
                              <BiRupee /> {this.state.product.our_price}
                            </h6>
                          </li>
                          <li>
                            <h4>Status</h4>
                            <h6>{this.state.product.status}</h6>
                          </li>
                          <li>
                            <h4>Description</h4>
                            <h6>{this.state.product.description}</h6>
                          </li>
                          {this.state.product.variants.length > 0 && (
                            <li>
                              <h4>Variants</h4>
                              <ul>
                                {this.state.product.variants.map((item, i) => {
                                  return (
                                    <li>
                                      <h6
                                        style={{
                                          width: "100%",
                                        }}
                                      >
                                        {item.variants_name}
                                        <span
                                          className="mx-2"
                                          style={{
                                            textDecoration: "line-through",
                                            opacity: "0.9",
                                          }}
                                        >
                                          <BiRupee />
                                          {item.variants_price}
                                        </span>
                                        <span className="mx-2">
                                          <BiRupee />
                                          {item.variants_discounted_price}
                                        </span>
                                      </h6>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          )}
                          {this.state.product.addon_map.length > 0 && (
                            <li>
                              <h4>Addons</h4>
                              <ul>
                                {this.state.product.addon_map.map((item, i) => {
                                  return (
                                    <li>
                                      <h6
                                        style={{
                                          width: "100%",
                                        }}
                                      >
                                        {item.addon_name}
                                        <span className="mx-2">
                                          <BiRupee />
                                          {item.addon_price}
                                        </span>
                                      </h6>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default (props) => <Productdetails {...useParams()} {...props} />;
