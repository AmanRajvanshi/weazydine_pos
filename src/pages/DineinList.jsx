import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { AuthContext } from "../AuthContextProvider";
import { Bars } from "react-loader-spinner";
import no_order from "../assets/images/no_orders.webp";
import delete_icon from "../assets/images/icons/delete.svg";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export class DineinList extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      adding_table: false,
    };
  }

  componentDidMount() {
    this.fetch_table_vendors();
  }

  fetch_table_vendors = () => {
    fetch(global.api + "fetch_table_vendors", {
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
        if (json.status) {
          this.setState({ data: json.data, isLoading: false });
        } else {
          this.setState({ data: [], isLoading: false });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  delete_table = (id) => {
    fetch(global.api + "delete_table_vendor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        table_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          toast.success(json.msg);
          this.fetch_table_vendors();
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
  };

  add = () => {
    this.setState({ table_load: true, adding_table: true });
    fetch(global.api + "add_new_table_vendor", {
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
        console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          // Toast.show(msg);
        } else {
          toast.success(json.msg);

          this.fetch_table_vendors();
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ table_load: false, adding_table: false });
      });
  };

  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title d-flex align-items-center justify-content-between w-100">
                  <h4>Dine In</h4>
                  {this.state.adding_table ? (
                    <button
                      className="btn btn-primary me-2"
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
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.add();
                      }}
                    >
                      Add Dine in
                    </button>
                  )}
                </div>
              </div>
              {this.state.isLoading ? (
                <div
                  className="main_loader"
                  style={{
                    height: "60vh",
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
                  {this.state.data.length > 0 ? (
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table  datanew">
                            <thead>
                              <tr>
                                <th>S.no</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>QR Code</th>
                                <th style={{ textAlign: "end" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.data.map((item, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      <Link
                                        to={
                                          "/tableorderdetails/" +
                                          item.table_uu_id
                                        }
                                      >
                                        {item.table_name}
                                      </Link>
                                    </td>
                                    <td>
                                      <span
                                        className={
                                          item.table_status == "active"
                                            ? "text-success"
                                            : "text-warning"
                                        }
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {item.table_status}
                                      </span>
                                    </td>
                                    <td>
                                      <a href={item.qr_link} target="_blank">
                                        <i
                                          className="fa fa-qrcode"
                                          style={{
                                            marginRight: "10px",
                                          }}
                                        ></i>
                                        QR Code
                                      </a>
                                    </td>
                                    <td style={{ textAlign: "end" }}>
                                      <img
                                        src={delete_icon}
                                        alt="img"
                                        style={{
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          Swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText:
                                              "Yes, delete it!",
                                            cancelButtonText: "No, cancel!",
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              this.delete_table(
                                                item.table_uu_id
                                              );
                                            }
                                          });
                                        }}
                                      />
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
                    <div className="page-wrapper">
                      <div
                        className="content"
                        style={{
                          height: "60vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img src={no_order} alt="" />
                        <h3>No DineIn data Found</h3>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DineinList;
