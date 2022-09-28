import React, { Component } from "react";
import Header from "../othercomponent/Header";

export class Addproduct extends Component {
  render() {
    return (
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
                      <label>Category</label>
                      <select className="select-container">
                        <option>Choose Category</option>
                        <option>Computers</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Sub Category</label>
                      <select className="select-container">
                        <option>Choose Sub Category</option>
                        <option>Fruits</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Brand</label>
                      <select className="select-container">
                        <option>Choose Brand</option>
                        <option>Brand</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Unit</label>
                      <select className="select-container">
                        <option>Choose Unit</option>
                        <option>Unit</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>SKU</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Minimum Qty</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Quantity</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-control" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Tax</label>
                      <select className="select-container">
                        <option>Choose Tax</option>
                        <option>2%</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Discount Type</label>
                      <select className="select-container">
                        <option>Percentage</option>
                        <option>10%</option>
                        <option>20%</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Price</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label> Status</label>
                      <select className="select-container">
                        <option>Closed</option>
                        <option>Open</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> Product Image</label>
                      <div className="image-upload">
                        <input type="file" />
                        <div className="image-uploads">
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/upload.svg"
                            alt="img"
                          />
                          <h4>Drag and drop a file to upload</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-submit me-2"
                    >
                      Submit
                    </a>
                    <a
                      href="https://dreamspos.dreamguystech.com/html/template/productlist.html"
                      className="btn btn-cancel"
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Addproduct;
