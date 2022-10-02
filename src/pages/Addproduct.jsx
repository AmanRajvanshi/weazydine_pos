import React, { Component } from "react";
import Header from "../othercomponent/Header";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { BiRupee } from "react-icons/bi";

export class Addproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      images: [],
      variants_addons_div: true,
      rows: [{}],
      newaddon: false,
    };
  }
  componentDidMount() {
    const user_data = JSON.parse(localStorage.getItem("@auth_login"));
    if (user_data != null) {
      console.log(user_data.token);
      global.token = user_data.token;
      global.user = user_data.user_id;
    } else {
      global.token = "";
    }
  }

  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value,
    };
    this.setState({
      rows,
    });
  };
  handleAddRow = () => {
    const item = {
      name: "",
      mobile: "",
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
  uploadImage = async (e) => {
    let image = this.state.images;
    image.push(e.target.files[0]);
    this.setState({ images: image });
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
                        <input type="text" />
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
                        <select className="select-container">
                          <option>Choose Category</option>
                          <option>Computers</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Market Price</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Our Price</label>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>VEG/NON-VEG</label>
                        <RadioGroup onChange={this.onChange} horizontal>
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
                        <textarea className="form-control" defaultValue={""} />
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
                    {this.state.variants_addons_div ? (
                      <>
                        <h3 className="mb-3 py-2 underline">
                          Variants and Addons
                        </h3>
                        <h2 className="mb-3 py-2 underline">Variants</h2>
                        <div className="row">
                          <div className="col-mg-12">
                            <table
                              className="table table-bordered table-hover"
                              id="tab_logic"
                            >
                              <thead>
                                <tr>
                                  <th className="text-center"> # </th>
                                  <th className="text-center"> Name </th>
                                  <th className="text-center"> Mobile </th>
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
                                        name="mobile"
                                        value={this.state.rows[idx].mobile}
                                        onChange={this.handleChange(idx)}
                                        className="form-control"
                                      />
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={this.handleRemoveSpecificRow(
                                          idx
                                        )}
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
                                Add Row
                              </button>
                            </div>
                          </div>
                        </div>
                        <h2 className="mb-3 py-2 underline">Addons</h2>
                        <div className="row">
                          <div className="col-mg-12">
                            <div className="checkbox_addon">
                              <input
                                type="checkbox"
                                id="addon"
                                name="addon"
                                value="Addon"
                                className="form-check-input new_checkbox mr-4"
                              />
                              <label for="addon">
                                Addon - <BiRupee /> 20
                              </label>
                            </div>
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
                          <div className="col-lg-12">
                            <a className="btn btn-submit me-2">Submit</a>
                            <a
                              href="https://dreamspos.dreamguystech.com/html/template/productlist.html"
                              className="btn btn-cancel"
                            >
                              Cancel
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="col-lg-12">
                        <a
                          onClick={() => {
                            this.setState({ variants_addons_div: true });
                          }}
                          className="btn btn-submit me-2"
                        >
                          Save and continue
                        </a>
                        <a
                          href="https://dreamspos.dreamguystech.com/html/template/productlist.html"
                          className="btn btn-cancel"
                        >
                          Cancel
                        </a>
                      </div>
                    )}
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
                <h4>Add Category</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input type="text" />
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
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Addon Price</label>
                      <input type="text" />
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
      </>
    );
  }
}

class TableRows extends React.Component {
  render() {
    return this.props.rowsData.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => this.props.handleChange(e, index)}
            />
          </td>
          <td>
            <input
              type="text"
              name="email"
              value={item.email}
              onChange={(e) => this.props.handleChange(e, index)}
            />
          </td>
          <td>
            <input
              type="text"
              name="salary"
              value={item.salary}
              onChange={(e) => this.props.handleChange(e, index)}
            />
          </td>
          <td>
            <button
              className="btn btn-outline-danger"
              onClick={this.props.deleteTableRows(index)}
            >
              X
            </button>
          </td>
        </tr>
      );
    });
  }
}

export default Addproduct;
