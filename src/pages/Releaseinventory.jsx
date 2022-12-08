import React, { Component } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContextProvider";
import Header from "../othercomponent/Header";
import { Bars } from "react-loader-spinner";
import DatePicker from "react-date-picker";
import moment from "moment";
import Skeletonloader from "../othercomponent/Skeletonloader";
import { BiRupee } from "react-icons/bi";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export class Releaseinventory extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      is_loading: true,
      submit_buttonLoading: false,
      date: "",
      name: "",
      comment: "",
    };
  }

  componentDidMount() {}

  save = () => {
    this.setState({ submit_buttonLoading: true });
    fetch(global.api + "update_profile_vendor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        email: this.state.email,
        shop_name: this.state.shop_name,
        website: this.state.website,
        description: this.state.description,
        whatsapp: this.state.whatsapp,
        name: this.state.name,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if (!json.status) {
          toast.error(json.errors[0]);
        } else {
          toast.success(json.msg);
          // this.props.navigation.navigate("More");
        }
        this.setState({ submit_buttonLoading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ submit_buttonLoading: false });
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
                <h4>Release Inventory</h4>
                {/* <h6>Release Inventory </h6> */}
              </div>
            </div>
            {!this.state.is_loading ? (
              <div
                className="main_loader"
                style={{
                  height: "60vh",
                }}
              >
                <Bars
                  height="80"
                  width="80"
                  color="#5BC2C1"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Date</label>
                        <DatePicker
                          onChange={(e) => {
                            this.setState({
                              date: moment(e).format("YYYY-MM-DD"),
                            });
                          }}
                          format="dd/MM/yyyy"
                          value={new Date()}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Name(to whom)</label>
                        <input
                          type="text"
                          placeholder="Name"
                          value={this.state.name}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">{/* <Products /> */}</div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Comment(Optional)</label>
                        <input
                          type="text"
                          placeholder="Comment"
                          value={this.state.comment}
                          onChange={(e) => {
                            this.setState({
                              comment: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-end">
                      {this.state.submit_buttonLoading ? (
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
                          Please Wait
                        </button>
                      ) : (
                        <a
                          onClick={() => {
                            this.save();
                          }}
                          className="btn btn-primary btn-sm me-2"
                        >
                          Submit
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
class Products extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.variants,
      add_data: [],
      addon_name: "",
      addon_price: "",
      object: [],
      add_on_loading: false,
      add_on_dataLoading: true,
      newaddon: false,
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
        this.setState({ add_on_dataLoading: false });
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
      this.setState({ newaddonLoading: true });
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
            this.setState({
              addon_name: "",
              addon_price: "",
              newaddonLoading: false,
              newaddon: false,
            });
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
                {this.state.add_on_dataLoading ? (
                  <Skeletonloader height={43} count={3} />
                ) : this.state.add_data.length > 0 ? (
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
                    {this.state.newaddonLoading ? (
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
                        onClick={() => {
                          this.create_addon();
                        }}
                        href="javascript:void(0);"
                        className="btn btn-submit me-2"
                      >
                        Add New Addon
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

export default Releaseinventory;
