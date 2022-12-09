import React, { Component } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContextProvider";
import Header from "../othercomponent/Header";
import { Bars } from "react-loader-spinner";

export class Editprofile extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      is_loading: true,
      submit_buttonLoading: false,
      shop_name: "",
      email: "",
      website: "",
      description: "",
      whatsapp: "",
      name: "",
      contact: "",
    };
  }

  componentDidMount() {
    this.get_vendor_profile();
  }

  get_vendor_profile = () => {
    fetch(global.api + "get_vendor_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status) {
          console.log(json);
          this.setState({
            name: json.data[0].name,
            shop_name: json.data[0].shop_name,
            email: json.data[0].email,
            website: json.data[0].website,
            description: json.data[0].description,
            whatsapp: json.data[0].whatsapp,
            contact: json.data[0].contact,
          });
        } else {
          toast.error(json.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ is_loading: false });
      });
  };

  save = () => {
    this.setState({ submit_buttonLoading: true });
    // let numberValidation = /^[0]?[6789]\d{9}$/;
    // let isnumValid = numberValidation.test(this.state.whatsapp);
    if (this.state.shop_name == "") {
      toast.error("All fields are required !");
      this.setState({ submit_buttonLoading: false });
    } else if (this.state.name == "") {
      toast.error("Enter your Shop Name!");
      this.setState({ submit_buttonLoading: false });
      // } else if (this.state.whatsapp != "" && !isnumValid) {
      //   toast.error("Enter valid whatsapp number!");
    } else {
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
    }
  };
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
            {this.state.is_loading ? (
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
                        {/* <div className="profile-contentname">
                        <h2>{this.state.name}</h2>
                      </div> */}
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
                        <label>Name</label>
                        <input
                          type="text"
                          placeholder="Name"
                          value={this.state.name}
                          onChange={(e) => {
                            this.setState({
                              name: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Shop Name</label>
                        <input
                          type="text"
                          placeholder="Shop Name"
                          value={this.state.shop_name}
                          onChange={(e) => {
                            this.setState({
                              shop_name: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Contact</label>
                        <input
                          type="text"
                          placeholder="Contact"
                          value={this.state.contact}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Email Address(Optional)</label>
                        <input
                          type="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={(e) => {
                            this.setState({
                              email: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Website (Optional)</label>
                        <input
                          type="text"
                          placeholder="ccc.com"
                          value={this.state.website}
                          onChange={(e) => {
                            this.setState({
                              website: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Shop Description</label>
                        <input
                          type="text"
                          placeholder="Description"
                          value={this.state.description}
                          onChange={(e) => {
                            this.setState({
                              description: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="form-group">
                        <label>Whatsapp Number</label>
                        <input
                          type="text"
                          placeholder="Whatsapp Number"
                          value={this.state.whatsapp}
                          onChange={(e) => {
                            this.setState({
                              whatsapp: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-end">
                      {this.state.submit_buttonLoading ? (
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
                          Please Wait
                        </button>
                      ) : (
                        <a
                          onClick={() => {
                            this.save();
                          }}
                          className="btn btn-submit me-2"
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

export default Editprofile;
