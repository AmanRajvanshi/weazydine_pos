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
      is_button_loading_add: false,
      category_loding: true,
      opencategory: false,
      open: false,
      is_buttonloding: false,
      openedit: false,
      new_category_name: "",
      category_id: "",
      inventory_product_add_name: "",
      invenroty_product_add_category_id: "",
      inventory_prodduct_add_model: "",
      inventory_add_purchase_unit: "",
      inventory_add_purchase_subunit_quantity: "",
      inventory_add_purchase_sub_unit: "",
      inventory_add_status: "active",
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts(0, 1);
  }

  active_cat = (id) => {
    this.setState({ active_cat: id, product_loding: true, is_loding: true });
    this.fetchProducts(id, 1);
  };

  fetchProducts = (id, page) => {
    fetch(global.api + "fetch_inventory_products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          if (page == 1) {
            this.setState({ products: [] });
          }
        } else {
          if (json.data.data.length > 0) {
            this.setState({ products: json.data.data });
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
    fetch(global.api + "fetch_inventory_category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          this.setState({ category: json.data.data });
        } else {
          this.setState({ category: [] });
        }

        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ category_loding: false });
      });
  };

  delete_product = (id) => {
    fetch(global.api + "delete_inventory_product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        product_id: id,
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

  addCategory = () => {
    if (
      this.state.new_category_name != "" ||
      this.state.parent_category_id != ""
    ) {
      this.setState({ is_button_loading_add: true });
      fetch(global.api + "create_inventory_category", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          category_name: this.state.new_category_name,
          category_status: "active",
          category_parent: this.state.parent_category_id,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          // console.warn(json)
          if (!json.status) {
            var msg = json.msg;
            toast.error(msg);
          } else {
            this.setState({ opencategory: false, new_category_name: "" });
            toast.success(json.msg);
            this.fetchCategories();
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ isloading: false, is_buttonloding: false });
        });
    } else {
      toast.error("Please fill all required fields!");
    }
  };

  add_product = () => {
    this.setState({ is_button_loading_add: true });
    if (
      this.state.inventory_product_add_name != "" ||
      this.state.invenroty_product_add_category_id != "" ||
      this.state.inventory_prodduct_add_model != "" ||
      this.state.inventory_add_purchase_unit != "" ||
      this.state.inventory_add_purchase_subunit_quantity != "" ||
      this.state.inventory_add_purchase_sub_unit != ""
    ) {
      this.setState({ is_button_loading_add: true });
      fetch(global.api + "add_inventory_product", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          inventory_product_name: this.state.inventory_product_add_name,
          inventory_category_id: this.state.invenroty_product_add_category_id,
          model: this.state.inventory_prodduct_add_model,
          purchase_unit: this.state.inventory_add_purchase_unit,
          purchase_subunit_quantity:
            this.state.inventory_add_purchase_subunit_quantity,
          purchase_sub_unit: this.state.inventory_add_purchase_sub_unit,
          status: this.state.inventory_add_status,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          // console.warn(json)
          if (!json.status) {
            var msg = json.msg;
            toast.error(msg);
          } else {
            this.setState({
              open: false,
              inventory_product_add_name: "",
              invenroty_product_add_category_id: "",
              inventory_prodduct_add_model: "",
              inventory_add_purchase_unit: "",
              inventory_add_purchase_subunit_quantity: "",
              inventory_add_purchase_sub_unit: "",
              inventory_add_status: "",
            });
            toast.success(json.msg);
            this.fetchProducts(this.state.active_cat, 1);
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ is_button_loading_add: false });
        });
    } else {
      toast.error("Please fill all required fields!");
      this.setState({ is_button_loading_add: false });
    }
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
                  <h4>Raw Materials</h4>
                  <h6>Manage raw materials in your inventory</h6>
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
                                <th>Model</th>
                                <th>Stock</th>
                                <th>Purchase Unit</th>
                                <th>Purchase Sub Unit</th>
                                <th>Purchase Subunit Quantity</th>
                                <th>Category</th>
                                <th style={{ textAlign: "end" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.products.map((item, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.inventory_product_name}</td>
                                    <td>{item.model}</td>
                                    <td>{item.current_stock} {item.purchase_unit}</td>
                                    <td>{item.purchase_unit}</td>
                                    <td>{item.purchase_sub_unit}</td>
                                    <td>{item.purchase_subunit_quantity}</td>
                                    <td>{item.category.category_name}</td>
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
                    <div
                      className="d-flex align-items-center justify-content-center flex-column"
                      style={{
                        height: "70vh",
                      }}
                    >
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
                          this.setState({
                            inventory_product_add_name: e.target.value,
                          });
                        }}
                        value={this.state.inventory_product_add_name}
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
                          this.setState({
                            invenroty_product_add_category_id: e.target.value,
                          });
                        }}
                        className="select-container"
                      >
                        <option>Please Choose Category</option>
                        {this.state.category.length > 0 &&
                          this.state.category.map((item, index) => (
                            <option id={index} value={item.id}>
                              {item.category_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Modal</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            inventory_prodduct_add_model: e.target.value,
                          });
                        }}
                        value={this.state.inventory_prodduct_add_model}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Purchase Unit</label>
                      <select
                        onChange={(e) => {
                          this.setState({
                            inventory_add_purchase_unit: e.target.value,
                          });
                        }}
                        className="select-container"
                      >
                        <option>Please Choose Unit</option>
                        <option value="kg">KG</option>
                        <option value="gm">GM</option>
                        <option value="ltr">LTR</option>
                        <option value="ml">ML</option>
                        <option value="pcs">PCS</option>
                        <option value="bori">Bori</option>
                        <option value="dozen">Dozen</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                        <option value="bundle">Bundle</option>
                        <option value="bag">Bag</option>
                        <option value="bottle">Bottle</option>
                        <option value="carton">Carton</option>
                        <option value="coil">Coil</option>
                        <option value="drum">Drum</option>
                        <option value="pair">Pair</option>
                        <option value="ream">Ream</option>
                        <option value="roll">Roll</option>
                        <option value="set">Set</option>
                        <option value="tube">Tube</option>
                        <option value="unit">Unit</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Purchase Sub-Unit</label>
                      <select
                        onChange={(e) => {
                          this.setState({
                            inventory_add_purchase_sub_unit: e.target.value,
                          });
                        }}
                        className="select-container"
                      >
                        <option>Please Choose Sub-Unit</option>
                        <option value="kg">KG</option>
                        <option value="gm">GM</option>
                        <option value="ltr">LTR</option>
                        <option value="ml">ML</option>
                        <option value="pcs">PCS</option>
                        <option value="bori">Bori</option>
                        <option value="dozen">Dozen</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                        <option value="bundle">Bundle</option>
                        <option value="bag">Bag</option>
                        <option value="bottle">Bottle</option>
                        <option value="carton">Carton</option>
                        <option value="coil">Coil</option>
                        <option value="drum">Drum</option>
                        <option value="pair">Pair</option>
                        <option value="ream">Ream</option>
                        <option value="roll">Roll</option>
                        <option value="set">Set</option>
                        <option value="tube">Tube</option>
                        <option value="unit">Unit</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Purchase Sub-Unit Quantity</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            inventory_add_purchase_subunit_quantity:
                              e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end align-items-center">
                    {this.state.is_button_loading_add ? (
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
                          this.add_product();
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
                          this.setState({
                            inventory_product_add_name: e.target.value,
                          });
                        }}
                        value={this.state.inventory_product_add_name}
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
                          this.setState({
                            invenroty_product_add_category_id: e.target.value,
                          });
                        }}
                        className="select-container"
                      >
                        <option>Please Choose Category</option>
                        {this.state.category.length > 0 &&
                          this.state.category.map((item, index) => (
                            <option id={index} value={item.id}>
                              {item.category_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Modal</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            inventory_prodduct_add_model: e.target.value,
                          });
                        }}
                        value={this.state.inventory_prodduct_add_model}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Purchase Unit</label>
                      <select
                        onChange={(e) => {
                          this.setState({
                            inventory_add_purchase_unit: e.target.value,
                          });
                        }}
                        className="select-container"
                      >
                        <option>Please Choose Unit</option>
                        <option value="kg">KG</option>
                        <option value="gm">GM</option>
                        <option value="ltr">LTR</option>
                        <option value="ml">ML</option>
                        <option value="pcs">PCS</option>
                        <option value="bori">Bori</option>
                        <option value="dozen">Dozen</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                        <option value="bundle">Bundle</option>
                        <option value="bag">Bag</option>
                        <option value="bottle">Bottle</option>
                        <option value="carton">Carton</option>
                        <option value="coil">Coil</option>
                        <option value="drum">Drum</option>
                        <option value="pair">Pair</option>
                        <option value="ream">Ream</option>
                        <option value="roll">Roll</option>
                        <option value="set">Set</option>
                        <option value="tube">Tube</option>
                        <option value="unit">Unit</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Purchase Sub-Unit</label>
                      <select
                        onChange={(e) => {
                          this.setState({
                            inventory_add_purchase_sub_unit: e.target.value,
                          });
                        }}
                        className="select-container"
                      >
                        <option>Please Choose Sub-Unit</option>
                        <option value="kg">KG</option>
                        <option value="gm">GM</option>
                        <option value="ltr">LTR</option>
                        <option value="ml">ML</option>
                        <option value="pcs">PCS</option>
                        <option value="bori">Bori</option>
                        <option value="dozen">Dozen</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                        <option value="bundle">Bundle</option>
                        <option value="bag">Bag</option>
                        <option value="bottle">Bottle</option>
                        <option value="carton">Carton</option>
                        <option value="coil">Coil</option>
                        <option value="drum">Drum</option>
                        <option value="pair">Pair</option>
                        <option value="ream">Ream</option>
                        <option value="roll">Roll</option>
                        <option value="set">Set</option>
                        <option value="tube">Tube</option>
                        <option value="unit">Unit</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Purchase SubUnit Quantity</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            inventory_add_purchase_subunit_quantity:
                              e.target.value,
                          });
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
                        Editing...
                      </button>
                    ) : (
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          this.add();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Edit Product
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
                      <label>
                        Category Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Choose Parent Categry{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        onChange={(e) => {
                          this.setState({ parent_category_id: e.target.value });
                          // alert(e.target.value);
                        }}
                        className="select-container"
                      >
                        <option>Choose Parent Category</option>
                        <option value={0}>None</option>
                        {this.state.category.length > 0 &&
                          this.state.category.map((item, index) => (
                            <option value={item.id}>
                              {item.category_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
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
                          this.addCategory();
                        }}
                        className="btn btn-primary btn-sm me-2"
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
        {this.props.category.length > 0 && (
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
            {this.props.category.map((item, index) => {
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
                      {item.category_name}({item.products_count}){" "}
                    </h6>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
export default Inventoryproducts;
