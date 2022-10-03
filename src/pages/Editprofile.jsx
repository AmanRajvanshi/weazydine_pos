import React, { Component } from "react";
import Header from "../othercomponent/Header";

export class Editprofile extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Profile</h4>
                <h6>Edit Profile</h6>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="profile-set">
                  {/* <div className="profile-head"></div> */}
                  <div className="profile-top">
                    <div className="profile-content">
                      {/* <div className="profile-contentimg">
                        <img
                          src="https://dreamspos.dreamguystech.com/html/template/assets/img/customer/customer5.jpg"
                          alt="img"
                          id="blah"
                        />
                        <div className="profileupload">
                          <input type="file" id="imgInp" />
                          <a href="javascript:void(0);">
                            <img
                              src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-set.svg"
                              alt="img"
                            />
                          </a>
                        </div>
                      </div> */}
                      <div className="profile-contentname">
                        <h2>William Castillo</h2>
                        {/* <h4>Updates Your Photo and Personal Details.</h4> */}
                      </div>
                    </div>
                    {/* <div className="ms-auto">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-submit me-2"
                      >
                        Save
                      </a>
                      <a href="javascript:void(0);" className="btn btn-cancel">
                        Cancel
                      </a>
                    </div> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                      <label>Shop Name</label>
                      <input type="text" placeholder="Shop Name" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                      <label>Email Address(Optional)</label>
                      <input type="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                      <label>Website (Optional)</label>
                      <input type="text" placeholder="ccc.com" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                      <label>Shop Description</label>
                      <input type="text" placeholder="Description" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="form-group">
                      <label>Whatsapp Number</label>
                      <input type="text" placeholder="+1452 876 5432" />
                    </div>
                  </div>
                  <div className="col-12 d-flex align-items-center justify-content-end">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-submit me-2"
                    >
                      Submit
                    </a>
                    <a href="javascript:void(0);" className="btn btn-cancel">
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

export default Editprofile;
