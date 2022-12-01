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
import Skeletonloader from "../othercomponent/Skeletonloader";
export class ReleaseStock extends Component {
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
      products:[],
      product_show: true,
      product_id: 0,
      name: "",
      c_id: "",
      market_price: "",
      our_price: "",
      description: "",
      type: "product",
      is_veg: 1,
      save_and_continue: false,
      add_category_loading: false,
      rows: [{
        id: 1,
        name: "",
        quantity: "",
        Unit: "",
    
      }],
    total:0,
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts();
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

  uploadImage = async (e) => {
    let image = this.state.images;
    image.push(e.target.files[0]);
    this.setState({ images: image });
  };

  add = () => {
    if (this.state.new_category_name != "") {
      this.setState({ add_category_loading: true });
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
            this.setState({
              open: false,
              new_category_name: "",
            });
            toast.success(json.msg);
            this.fetchCategories();
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ add_category_loading: false });
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
      this.state.images == "" ||
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
      this.setState({ save_and_continue: true, isLoading: true });

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
            this.setState({ product_show: false, product_id: json.data.id });
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ isLoading: false, save_and_continue: false });
        });
    }
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

  handleChange = (idx) => (e) => {
    const newRows = [...this.state.rows];

    if(e.target.name == 'name')
    {
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index]
      var option =  optionElement.getAttribute('unit');
      newRows[idx]['unit'] = option;
    }

    newRows[idx][e.target.name] = e.target.value;

    this.setState({ rows: newRows });
  };
  handleAddRow = () => {
    const vari = [
      {
        id: 1,
        name: "",
        quantity: "",
        Unit: "",
        price: "",
        sgst: "",
        cgst: "",
        igst: "",
        total: "",
      },
    ];
    this.setState({ rows: [...this.state.rows, ...vari] });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };
  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            {/* {this.state.product_show ? ( */}
              <div className="content">
                <div className="page-header">
                  <div className="page-title">
                    <h4>Release  Stocks</h4>
                    <h6>Release stock in inventory</h6>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                     
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Receiver</label>
                          <input
                            onChange={(e) => {
                              this.setState({ our_price: e.target.value });
                            }}
                            type="text"
                          />
                        </div>
                      </div>
                  
                   

                      {this.state.rows.length > 0 ? (
              <div className="row">
                <div className="col-mg-12">
                <label>Row Material Details</label>
                <br/>
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
                       <th className="text-center">Unit</th>
                        <th className="text-center">Quantity</th>
                    
                        <th className="text-end">Action</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rows.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          <td>{idx+1}</td>
                          <td>

                          <select
                              onChange={this.handleChange(idx)}
                            className="select-container"
                            name="name"
                          >
                            <option>Choose Suplier</option>
                            {this.state.products.length > 0 ? (
                              this.state.products.map((item, index) => (
                                <option value={item.id} unit={item.purchase_unit}>{item.inventory_product_name}</option>
                              ))
                            ) : (
                              <></>
                            )}
                          </select>

                            {/* <input
                              type="text"
                              name="variants_name"
                              value={this.state.rows[idx].name}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            /> */}
                          </td>
                          <td>
                            <input
                              type="text"
                              name="unit"
                              value={this.state.rows[idx].unit}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="quantity"
                              value={this.state.rows[idx].quantity}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                         
                          <td className="text-end">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSpecificRow(idx)}
                            >
                          X
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
                      Add New
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}




<div className="col-lg-12">
                          {this.state.save_and_continue ? (
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
                              Saving
                            </button>
                          ) : (
                            <a
                              onClick={() => {
                                this.create();
                              }}
                              className="btn btn-submit me-2"
                              style={{float:'right'}}
                            >
                              Save Changes
                            </a>
                          )}
                        </div>
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
                <h4>Add  Supplier </h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Supplier Name</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.add_category_loading ? (
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
                       Add  Supplier
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



function Navigate(props) {
  const abcd = useNavigate();
  const location = useLocation();
  return (
    <ReleaseStock
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
