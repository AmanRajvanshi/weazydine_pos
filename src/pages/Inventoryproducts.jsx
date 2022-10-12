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
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

class Inventoryproducts extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      products: [],
      active_cat: 0,
      is_loding: true,
      category_loding: true,
      opencategory: false,
      open: false,
      openedit: false,
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
      <>
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Inventory Product List</h4>
                  <h6>Manage the products in your inventory</h6>
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
                    Add New Product
                  </a>
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
                                <th>S.no</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Unit</th>
                                <th>Quantity</th>
                                <th style={{ textAlign: "end" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.products.map((item, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.product_name}</td>
                                    <td>
                                      <BiRupee />
                                      {item.market_price}
                                    </td>
                                    <td>{item.category.name}</td>
                                    <td>{item.category.name}</td>
                                    <td>10</td>
                                    <td style={{ textAlign: "end" }}>
                                      <img
                                        src={edit_icon}
                                        alt="img"
                                        className="mx-2 cursor_pointer"
                                        onClick={() => {
                                          this.setState({
                                            openedit: true,
                                          });
                                        }}
                                      />
                                      <a
                                        className="confirm-text"
                                        onClick={() =>
                                          Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText:
                                              "Yes, delete it!",
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
                <h4>Add Product in Inventory</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="d-flex align-items-center justify-content-between">
                        <label>Category</label>
                        <div className="page-btn">
                          <a
                            className="btn btn-added  d-flex align-items-center pt-0"
                            onClick={() => {
                              this.setState({ opencategory: true });
                            }}
                          >
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/plus.svg"
                              alt="img"
                              className="me-1"
                            />
                            Add
                          </a>
                        </div>
                      </div>
                      <select
                        onChange={(e) => {
                          this.setState({ c_id: e.target.value });
                        }}
                        className="select-container"
                      >
                        {this.state.category.length > 0 ? (
                          this.state.category.map((item, index) => (
                            <option value={item.id}>{item.name}</option>
                          ))
                        ) : (
                          <></>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Select Unit</label>
                      <select
                        onChange={(e) => {
                          this.setState({ c_id: e.target.value });
                        }}
                        className="select-container"
                      >
                        {this.state.category.length > 0 ? (
                          this.state.category.map((item, index) => (
                            <option value={item.id}>{item.name}</option>
                          ))
                        ) : (
                          <></>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-end align-items-center">
                    {this.state.is_buttonloding ? (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        style={{
                          pointerEvents: "none",
                          opacity: "0.8",
                        }}
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Adding
                      </button>
                    ) : (
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          this.add();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Add Product
                      </a>
                    )}
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
                <h4>Edit Product</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="d-flex align-items-center justify-content-between">
                        <label>Category</label>
                        <div className="page-btn">
                          <a
                            className="btn btn-added  d-flex align-items-center pt-0"
                            onClick={() => {
                              this.setState({ opencategory: true });
                            }}
                          >
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/plus.svg"
                              alt="img"
                              className="me-1"
                            />
                            Add
                          </a>
                        </div>
                      </div>
                      <select
                        onChange={(e) => {
                          this.setState({ c_id: e.target.value });
                        }}
                        className="select-container"
                      >
                        {this.state.category.length > 0 ? (
                          this.state.category.map((item, index) => (
                            <option value={item.id}>{item.name}</option>
                          ))
                        ) : (
                          <></>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Select Unit</label>
                      <select
                        onChange={(e) => {
                          this.setState({ c_id: e.target.value });
                        }}
                        className="select-container"
                      >
                        {this.state.category.length > 0 ? (
                          this.state.category.map((item, index) => (
                            <option value={item.id}>{item.name}</option>
                          ))
                        ) : (
                          <></>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-end align-items-center">
                    {this.state.is_buttonloding ? (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        style={{
                          pointerEvents: "none",
                          opacity: "0.8",
                        }}
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Adding
                      </button>
                    ) : (
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          this.add();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Add Product
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          open={this.state.opencategory}
          onClose={() => this.setState({ opencategory: false })}
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
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.is_buttonloding ? (
                      <button
                        className="btn btn-submit me-2"
                        style={{
                          pointerEvents: "none",
                          opacity: "0.8",
                        }}
                      >
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Adding
                      </button>
                    ) : (
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          this.add();
                        }}
                        className="btn btn-submit me-2"
                      >
                        Add Category
                      </a>
                    )}
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
export default Inventoryproducts;
