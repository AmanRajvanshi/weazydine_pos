import React, { Component } from "react";
import Header from "../othercomponent/Header";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { RadioGroup, RadioButton } from "react-radio-buttons";

export class Addproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      images: [],
      variants_addons_div: true,
      rowsData: [],
    };
  }

  addTableRows = () => {
    const rowsInput = {
      fullName: "",
      emailAddress: "",
      salary: "",
    };
    this.setState({ rowsData: [...this.state.rowsData, rowsInput] });
  };

  deleteTableRows = (index) => {
    const rowsData = [...this.state.rowsData];
    rowsData.splice(index, 1);
    this.setState({ rowsData });
  };

  handleChange = (e, index) => {
    const { name, value } = e.target;
    const rowsData = [...this.state.rowsData];
    rowsData[index][name] = value;
    this.setState({ rowsData });
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
                        <div className="row">
                          <div className="col-mg-12">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Full Name</th>
                                  <th>Email Address</th>
                                  <th>Salary</th>
                                  <th>
                                    <button
                                      className="btn btn-outline-success"
                                      onClick={this.addTableRows()}
                                    >
                                      +
                                    </button>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <TableRows
                                  rowsData={this.state.rowsData}
                                  deleteTableRows={this.deleteTableRows()}
                                  handleChange={this.handleChange()}
                                />
                              </tbody>
                            </table>
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
              onChange={(e) => this.props.handleChange(index, e)}
            />
          </td>
          <td>
            <input
              type="text"
              name="email"
              value={item.email}
              onChange={(e) => this.props.handleChange(index, e)}
            />
          </td>
          <td>
            <input
              type="text"
              name="salary"
              value={item.salary}
              onChange={(e) => this.props.handleChange(index, e)}
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
