import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";
import delete_icon from "../assets/images/icons/delete.svg";
import edit_icon from "../assets/images/icons/edit.svg";
import { AuthContext } from "../AuthContextProvider";
import { Bars } from "react-loader-spinner";
import { Toggle } from "../othercomponent/Toggle";
import Skeletonloader from "../othercomponent/Skeletonloader";
import no_img from "../assets/images/no_products_found.png";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export class Productlist extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      products: [],
      active_cat: 0,
      is_loding: true,
      category_loding: true,
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts(0, 1);
  }

  active_cat = (id) => {
    this.setState({ active_cat: id, product_loding: true });
    this.fetchProducts(id, 1);
  };

  fetchProducts = (category_id, page) => {
    this.setState({ is_loding: true });
    fetch(global.api + "vendor_get_vendor_product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        vendor_category_id: category_id,
        product_type: "product",
        page: page,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        //  console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          if (page == 1) {
            this.setState({ products: [] });
          }
        } else {
          if (json.data.length > 0) {
            this.setState({ products: json.data });
          }
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

  fetchCategories = () => {
    fetch(global.api + "fetch_vendor_category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn(json.data)
        this.setState({ category: json.data });

        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ category_loding: false });
      });
  };

  delete_product = (id) => {
    fetch(global.api + "update_status_product_offer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        action_id: id,
        type: "product",
        status: "delete",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn("delete_product",json)
        if (!json.status) {
          var msg = json.msg;
          // Toast.show(msg);
          toast.success(msg);
        } else {
          toast.success("Product Deleted Successfully");
          this.fetchProducts(this.state.active_cat, 1);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
  };

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
                  Add New Product
                </Link>
              </div>
            </div>
            {this.state.category_loding ? (
              <Skeletonloader count={1} height={50} />
            ) : (
              <Category
                category={this.state.category}
                active_cat={this.state.active_cat}
                fetch_product={this.active_cat}
              />
            )}

            {this.state.is_loding ? (
              <div
                className="main_loader"
                style={{
                  height: "50vh",
                }}
              >
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
              <>
                {this.state.products.length > 0 ? (
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table  datanew">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Market Price</th>
                              <th>Our Price</th>
                              <th>Category</th>
                              <th>Veg/NonVeg</th>
                              <th>Status</th>
                              <th style={{ textAlign: "end" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.products.map((item, index) => {
                              return (
                                <tr>
                                  <td className="productimgname">
                                    <Link
                                      to={"/productdetails/" + item.id}
                                      className="product-img"
                                    >
                                      <img
                                        src={item.product_img}
                                        alt="product"
                                        className="product-img"
                                      />
                                    </Link>
                                    <Link to={"/productdetails/" + item.id}>
                                      {item.product_name}
                                    </Link>
                                  </td>
                                  <td>
                                    <BiRupee />
                                    {item.market_price}
                                  </td>
                                  <td>
                                    <BiRupee />
                                    {item.our_price}
                                  </td>
                                  <td>{item.category.name}</td>
                                  <td>
                                    {item.is_veg ? <>Veg</> : <> Non-Veg</>}
                                  </td>

                                  <td>
                                    <Toggle
                                      status={item.status}
                                      product_id={item.id}
                                      action_type="product"
                                    />
                                  </td>
                                  <td style={{ textAlign: "end" }}>
                                    <Link
                                      to={"/editproduct/" + item.id}
                                      className="me-3"
                                    >
                                      <img src={edit_icon} alt="img" />
                                    </Link>
                                    <a
                                      className="confirm-text"
                                      // onClick={() => {
                                      //   this.delete_product(item.id);
                                      // }}
                                      onClick={() =>
                                        Swal.fire({
                                          title: "Are you sure?",
                                          text: "You won't be able to revert this!",
                                          icon: "warning",
                                          showCancelButton: true,
                                          confirmButtonColor: "#3085d6",
                                          cancelButtonColor: "#d33",
                                          confirmButtonText: "Yes, delete it!",
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            this.delete_product(item.id);
                                          }
                                        })
                                      }
                                    >
                                      <img src={delete_icon} alt="img" />
                                    </a>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <img
                      src={no_img}
                      alt=""
                      style={{
                        height: "250px",
                      }}
                    />
                    <h4>No Products Found</h4>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

class Category extends Component {
  render() {
    return (
      <div className="row">
        <ul className="tabs horizontal_scroll">
          <li
            onClick={() => {
              this.props.fetch_product(0);
            }}
          >
            <div
              className={
                "product-details" +
                (this.props.active_cat == 0 ? " active" : "")
              }
              href="#solid-rounded-justified-tab1"
              data-bs-toggle="tab"
            >
              <h6>All</h6>
            </div>
          </li>
          {this.props.category.length > 0 &&
            this.props.category.map((item, index) => {
              return (
                <li
                  onClick={() => {
                    this.props.fetch_product(item.id);
                  }}
                >
                  <div
                    className={
                      "product-details" +
                      (this.props.active_cat == item.id ? " active" : "")
                    }
                    href="#solid-rounded-justified-tab1"
                    data-bs-toggle="tab"
                  >
                    <h6>
                      {item.name}({item.products_count}){" "}
                    </h6>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Productlist;
