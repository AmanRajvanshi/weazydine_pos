import React, { Component } from "react";
import Header from "../othercomponent/Header";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { BiRupee } from "react-icons/bi";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContextProvider";
export class Addproduct extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      images: [],
      variants_addons_div: false,
      newaddon: false,
      new_category_name: "",
      category: [],
      add_data: [],
      addon_name: "",
      addon_price: "",
      object: [],
      name: "",
      c_id: "",
      market_price: "",
      our_price: "",
      description: "",
      type: "product",
      photo: "",
      is_veg: 1,
      show_product: false,
    };
  }

  componentDidMount() {
    this.fetchCategories();
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

  add = () => {
    console.log(this.state.rows);
  };

  uploadImage = async (e) => {
    let image = this.state.images;
    image.push(e.target.files[0]);
    this.setState({ images: image });
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

      if (this.state.images.length > 0) {
        this.state.images.map((item, index) => {
          form.append("product_img", item);
        });
      }

      form.append("is_veg", this.state.is_veg);
      fetch(global.api + "vendor_add_product", {
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
            // this.props.get_cat();
            // this.props.get_product(0, 1);

            // this.props.navigation.navigate("ProductVariants", {
            //   product_id: json.data.id,
            //   variants: json.data.variants,
            //   addons: json.data.addons,
            //   refresh: true,
            // });
            // this.props.navigation.navigate(this.props.back,{refresh:true})
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

  handleAddon = (e) => {
    // to find out if it's checked or not; returns true or false
    const checked = e.target.checked;
    // to get the checked value
    const checkedValue = e.target.value;

    if (checked) {
      if (this.state.object[checkedValue]) {
        const object = this.state.object;
        object[checkedValue] = false;
        this.setState({ object });
      } else {
        const object = this.state.object;
        object[checkedValue] = true;
        this.setState({ object });
      }
    } else {
    }
    //then you can do with the value all you want to do with it.
  };
  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header />

          {this.state.show_product ? (
            <div className="page-wrapper">
              <div className="content">
                <div className="page-header">
                  <div className="page-title">
                    <h4>Product Add</h4>
                    <h6>Create new product</h6>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Product Name</label>
                          <input
                            type="text"
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
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Market Price</label>
                          <input
                            type="text"
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
                            onChange={(value) => {
                              this.setState({ is_veg: value });
                            }}
                            value="1"
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

                      <div className="col-lg-12">
                        <a
                          onClick={() => {
                            this.create();
                            // this.setState({ variants_addons_div: true });
                          }}
                          className="btn btn-submit me-2"
                        >
                          Save and continue
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="page-wrapper">
              <div className="content">
                <div className="page-header">
                  <div className="page-title">
                    <h4>Product Varients & Addons</h4>
                    <h6>Create varients & addons of your product</h6>
                  </div>
                  <div
            className="col-lg-6"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
           
         
                  <a
              href="https://dreamspos.dreamguystech.com/html/template/productlist.html"
              className="btn btn-cancel"
            >
              No My Product dont have any variants or addons
            </a>

            <a className="btn btn-submit me-2" onClick={() => this.add()}>
              Save this product
            </a>
            </div>
                </div>
              
                  <Variants />
             
              </div>
            </div>
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

class Variants extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      variants: [],
      variant_name: "",
      variant_price: "",
      variant_id: "",
      variant_addons: [],
      variant_addon_name: "",
      variant_addon_price: "",
      variant_addon_id: "",
      variant_addon: [],
      rows: [],
      variants_addons_div: false,

      add_data: [],
      addon_name: "",
      addon_price: "",
      object: [],
      name: "",
      c_id: "",
      market_price: "",
      our_price: "",
      description: "",
      type: "product",
      photo: "",
      is_veg: 1,
    };
  }

  componentDidMount() {
    this.fetch_addon();
  }

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
  };
  handleAddRow = () => {
    const item = {
      name: "",
      market_price: "",
      offer_price: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
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



  update_product_variant = () => {
    const add = [];
    this.state.object.map((item, index) => {
      if (item) {
        add.push(index);
      }

    });

    fetch(global.vendor_api + 'vendor_update_product_options', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': global.token
      },
      body: JSON.stringify({
        variants: this.state.v_data,
        addons: add,
        product_id: this.props.route.params.product_id,
      })
    }).then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if (!json.status) {
          toast.error(json.msg);
        }
        else {
          if (this.props.route.params.refresh) {
            this.props.navigation.navigate("Products", { refresh: true, active_cat:0});
          }
          else {
            this.props.navigation.goBack({ refresh: true });
          }

        }

        this.setState({ isLoading2: false });
        return json;
      }).catch((error) => {
        console.error(error);
      });
   }

  render() {
    return (
      <>
        <div className="card" style={{ padding: 20 }}>
        <h3 className="mb-3 py-2 underline">Variants</h3>
        <div className="row">
          {this.state.rows.length > 0 ? (
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
                      <td>{idx}</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={this.state.rows[idx].name}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="market_price"
                          value={this.state.rows[idx].market_price}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="offer_price"
                          value={this.state.rows[idx].offer_price}
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
                  className="btn btn-primary"
                  style={{
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                >
                  Add New Varients
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Want to add Varient
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={this.handleAddRow}
                  className="btn btn-primary"
                  style={{
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                >
                   Add New Varient
                </button>
              </div>
            </>
          )}
        </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
        <h3 className="mb-3 py-2 underline">Addons</h3>
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

            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.setState({
                    newaddon: true,
                  });
                }}
                style={{
                  marginBottom: "20px",
                  marginTop: "10px",
                }}
              >
                Add New Addon
              </button>
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

export default Addproduct;
