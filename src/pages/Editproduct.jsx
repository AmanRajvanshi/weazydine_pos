import React, { Component } from "react";
import Header from "../othercomponent/Header";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { BiRupee } from "react-icons/bi";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContextProvider";
export class Editproduct extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      images: [],
      newaddon: false,
      new_category_name: "",
      category: [],
      product_show: true,
      product_id: 0,
      name: "",
      c_id: "",
      market_price: "",
      our_price: "",
      description: "",
      type: "product",
      is_veg: 1,
      is_loading: true,
      v_data: [],
      product_image: "",
      addon_object: [],
    };
  }

  update_variant_from_child = (v_data, addon) => {
    this.setState({ v_data: v_data, addon_object: addon });
  };

  componentDidMount() {
    this.fetchCategories();
    this.fetchProduct();
  }

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
        if (json.data.length == 0) {
          this.setState({ open: true });
        }
        this.setState({ category: json.data });
        this.setState({ is_loding: false });
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  fetchProduct = () => {
    var product_id = this.props.id;

    fetch(global.api + "get_product_details?product_id=" + product_id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          toast.error(json.msg);
          this.props.navigate("/productlist");
        } else {
          var obj = json.data[0];
          this.setState({ product_id: obj.id });
          this.setState({ name: obj.product_name });
          this.setState({ market_price: obj.market_price });
          this.setState({ our_price: obj.our_price });
          this.setState({ description: obj.description });
          this.setState({ image: obj.product_img });
          this.setState({ c_id: obj.vendor_category_id });
          this.setState({ is_veg: obj.is_veg });
          this.setState({ product_image: obj.product_img });
          this.setState({ v_data: obj.variants });
          this.setState({ addon: obj.addon_map });
        }

        this.setState({ is_loading: false });
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  uploadImage = async (e) => {
    let image = this.state.images;
    image.push(e.target.files[0]);
    this.setState({ images: image, product_image: "" });
  };

  add = () => {
    if (this.state.new_category_name != "") {
      fetch(global.api + "create_category_vendor", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          category_name: this.state.new_category_name,
          status: "active",
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          // console.warn(json)
          if (!json.status) {
            var msg = json.msg;
            toast.error(msg);
          } else {
            this.setState({ open: false, new_category_name: "" });
            toast.success(json.msg);
            this.fetchCategories();
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ isloading: false });
        });
    } else {
      toast.error("Please add Category first!");
    }
  };

  create = () => {
    this.update_product_variant();
    let numberValidation = /^[0-9]+$/;
    let isnumValid = numberValidation.test(
      this.state.market_price + this.state.our_price
    );

    if (
      this.state.name == "" ||
      this.state.market_price == "" ||
      this.state.image == "" ||
      this.state.our_price == "" ||
      this.state.description == ""
    ) {
      toast.error("All fields are required !");
    } else if (this.state.category == "") {
      toast.error("Add category first !");
    }
    // else if (this.state.market_price<this.state.our_price) {
    //     toast.error("Your price should be less than market price !");
    // }
    else if (this.state.c_id == "") {
      toast.error("Category is required !");
    } else if (!isnumValid) {
      toast.error("Price contains digits only!");
    } else if (!isnumValid) {
      toast.error("Price contains digits only!");
    } else if (this.state.description == "") {
      toast.error("Description is required !");
    } else {
      this.setState({ isLoading: true });

      var form = new FormData();
      form.append("product_name", this.state.name);
      // form.append("token",global.token);
      form.append("vendor_category_id", this.state.c_id);
      form.append("market_price", this.state.market_price);
      form.append("price", this.state.our_price);
      form.append("description", this.state.description);
      form.append("type", this.state.type);
      form.append("product_id", this.state.product_id);

      if (this.state.images.length > 0) {
        this.state.images.map((item, index) => {
          form.append("product_img", item);
        });
      }

      form.append("is_veg", this.state.is_veg);
      fetch(global.api + "vendor_update_product", {
        method: "POST",
        body: form,
        headers: {
          Authorization: this.context.token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // console.warn(json)
          if (!json.status) {
            var msg = json.msg;
            toast.error(msg);
          } else {
            toast.success(json.msg);
            this.setState({ product_show: false, product_id: json.data.id });
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  update_product_variant = () => {
    const add = [];
    this.state.addon_object.map((item, index) => {
      if (item) {
        add.push(index);
      }
    });
    fetch(global.api + "vendor_update_product_options", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        variants: this.state.v_data,
        addons: add,
        product_id: this.state.product_id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          toast.error(json.msg);
        } else {
          toast.success(json.msg);
          this.props.navigate("/productlist");
        }

        this.setState({ isLoading2: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header />
          {!this.state.is_loading ? (
            <div className="page-wrapper">
              <div className="content">
                <div className="page-header">
                  <div className="page-title">
                    <h4>Edit Product</h4>
                    <h6>Edit your product</h6>
                  </div>
                  <a
                    className="btn btn-submit me-2"
                    onClick={() => this.update_product_variant()}
                  >
                    Save
                  </a>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Product Name</label>
                          <input
                            type="text"
                            value={this.state.name}
                            onChange={(e) => {
                              this.setState({ name: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <div className="d-flex align-items-center justify-content-between">
                            <label>Category</label>
                            <div className="page-btn">
                              <a
                                className="btn btn-added  d-flex align-items-center pt-0"
                                onClick={() => {
                                  this.setState({ open: true });
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
                            value={this.state.c_id}
                            onChange={(e) => {
                              this.setState({ c_id: e.target.value });
                            }}
                            className="select-container"
                          >
                            {this.state.category.length > 0 ? (
                              this.state.category.map((item, index) => {
                                return (
                                  <option value={item.id}>{item.name}aa</option>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Market Price</label>
                          <input
                            type="text"
                            value={this.state.market_price}
                            onChange={(e) => {
                              this.setState({ market_price: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Our Price</label>
                          <input
                            value={this.state.our_price}
                            onChange={(e) => {
                              this.setState({ our_price: e.target.value });
                            }}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>VEG/NON-VEG</label>
                          <RadioGroup
                            value={this.state.is_veg}
                            onChange={(e) => {
                              this.setState({ is_veg: e });
                            }}
                            horizontal
                          >
                            <RadioButton
                              value="1"
                              pointColor="#f3c783"
                              iconSize={20}
                              rootColor="#065f0a"
                              iconInnerSize={10}
                              padding={10}
                            >
                              VEG
                            </RadioButton>
                            <RadioButton
                              value="0"
                              pointColor="#f3c783"
                              iconSize={20}
                              rootColor="#bf370d"
                              iconInnerSize={10}
                              padding={10}
                            >
                              NON-VEG
                            </RadioButton>
                          </RadioGroup>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            value={this.state.description}
                            onChange={(e) => {
                              this.setState({ description: e.target.value });
                            }}
                            className="form-control"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label> Product Image</label>
                          <div
                            className="image-upload"
                            style={{
                              width: "max-content",
                            }}
                          >
                            {this.state.images.length > 0 ? (
                              <></>
                            ) : (
                              <input
                                type={"file"}
                                accept=".png, .jpg, .jpeg,.svg"
                                className="upload"
                                onChange={(e) => {
                                  this.uploadImage(e);
                                }}
                              />
                            )}

                            {this.state.product_image != "" ? (
                              <img
                                id="target"
                                src={this.state.product_image}
                                style={{
                                  width: "200px",
                                  height: "200px",
                                }}
                              />
                            ) : (
                              <></>
                            )}
                            {this.state.images.length > 0 ? (
                              this.state.images.map((item, index) => {
                                return (
                                  <img
                                    id="target"
                                    src={URL.createObjectURL(item)}
                                    style={{
                                      width: "200px",
                                      height: "200px",
                                    }}
                                  />
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Variants
                product_id={this.state.product_id}
                navigate={this.props.navigate}
                variants={this.state.v_data}
                addons={this.state.addon}
                update_child={this.update_variant_from_child}
              />
            </div>
          ) : (
            <h3>Loading</h3>
          )}
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
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        this.add();
                      }}
                      className="btn btn-submit me-2"
                    >
                      Add Category
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

class Variants extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.variants,
      add_data: [],
      addon_name: "",
      addon_price: "",
      object: [],
    };
  }

  componentDidMount() {
    this.fetch_addon();
    if (this.props.addons != undefined && this.props.addons.length > 0) {
      this.props.addons.map((item, index) => {
        this.cat_update(item.pivot.addon_id);
      });
    }
  }

  cat_update = (str) => {
    const object = this.state.object;
    object[str] = true;
    this.setState({ object });
    this.props.update_child(this.state.Rows, object);
  };

  fetch_addon = () => {
    fetch(global.api + "fetch_product_addon", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          toast.error(json.msg);
        } else {
          this.setState({ add_data: json.data });
        }

        this.setState({ isLoading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleChange = (idx) => (e) => {
    const newRows = [...this.state.rows];
    newRows[idx][e.target.name] = e.target.value;

    this.setState({
      rows: newRows,
    });

    this.props.update_child(newRows, this.state.object);
  };
  handleAddRow = () => {
    const vari = [
      {
        id: 1,
        variants_name: "",
        variants_price: "",
        variants_discounted_price: "",
      },
    ];
    this.setState({ rows: [...this.state.rows, ...vari] });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };

  create_addon = () => {
    if (this.state.addon_name == "" || this.state.addon_price == "") {
      toast.error("All field is required!");
    } else {
      this.setState({ isLoading: true });
      fetch(global.api + "add_product_addon", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          addon_name: this.state.addon_name,
          addon_price: this.state.addon_price,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.warn(json);
          if (!json.status) {
            toast.error(json.msg);
          } else {
            this.fetch_addon();
            this.setState({ addon_name: "", addon_price: "", newaddon: false });
            toast.success(json.msg);
          }

          return json;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  handleAddon = (e) => {
    // to find out if it's checked or not; returns true or false
    const checked = e.target.checked;
    // to get the checked value
    const checkedValue = e.target.value;

    if (this.state.object[checkedValue]) {
      var object = this.state.object;
      object[checkedValue] = false;
      this.setState({ object });
    } else {
      var object = this.state.object;
      object[checkedValue] = true;
      this.setState({ object });
    }

    this.props.update_child(this.state.rows, object);
    //then you can do with the value all you want to do with it.
  };

  render() {
    return (
      <>
        <div className="content">
          <div className="page-header">
            <div className="page-title" style={{ marginTop: "-50px" }}>
              <h4>Product Varients & Addons</h4>
              <h6>Create Product Varients & Addons</h6>
            </div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <h3 className="mb-3 py-2 underline">Variants</h3>
            {this.state.rows.length > 0 ? (
              <div className="row">
                <div className="col-mg-12">
                  <table
                    className="table table-bordered table-hover"
                    id="tab_logic"
                    style={{
                      border: "1px solid #d9d9d9",
                    }}
                  >
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Market Price</th>
                        <th className="text-center">Offer Price</th>
                        <th className="text-end">Action</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rows.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <input
                              type="text"
                              name="variants_name"
                              value={this.state.rows[idx].variants_name}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="variants_price"
                              value={this.state.rows[idx].variants_price}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="variants_discounted_price"
                              value={
                                this.state.rows[idx].variants_discounted_price
                              }
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSpecificRow(idx)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <button
                      onClick={this.handleAddRow}
                      className="btn btn-outline-secondary"
                      style={{
                        marginBottom: "20px",
                        marginTop: "10px",
                      }}
                    >
                      Add New Varient
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={this.handleAddRow}
                  className="btn btn-outline-secondary"
                  style={{
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                >
                  Add New Varient
                </button>
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <h3 className="mb-3 py-2 underline">Addons</h3>
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  this.setState({
                    newaddon: true,
                  });
                }}
                style={{
                  marginBottom: "20px",
                  marginTop: "10px",
                  marginLeft: "30px",
                }}
              >
                Add New Addon
              </button>
            </div>
            <div className="row">
              <div className="col-mg-12">
                {this.state.add_data.length > 0 ? (
                  this.state.add_data.map((item, index) => {
                    return (
                      <div className="checkbox_addon">
                        <input
                          type="checkbox"
                          id={"addon" + item.id}
                          name="addon"
                          value={item.id}
                          onChange={this.handleAddon}
                          className="form-check-input new_checkbox mr-4"
                          checked={this.state.object[item.id] ? true : false}
                        />
                        <label for={"addon" + item.id}>
                          {item.addon_name} - <BiRupee /> {item.addon_price}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <>No Addon Found</>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={this.state.newaddon}
          onClose={() => this.setState({ newaddon: false })}
          center
          classNames={{
            modal: "customModal",
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Add Addon</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Addon Name</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ addon_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Addon Price</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ addon_price: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <a
                      onClick={() => {
                        this.create_addon();
                      }}
                      href="javascript:void(0);"
                      className="btn btn-submit me-2"
                    >
                      Add New Addon
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

function Navigate(props) {
  const abcd = useNavigate();
  const location = useLocation();
  return (
    <Editproduct
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
