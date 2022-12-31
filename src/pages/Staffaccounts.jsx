import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import delete_icon from '../assets/images/icons/delete.svg';
import edit_icon from '../assets/images/icons/edit.svg';
import { AuthContext } from '../AuthContextProvider';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import no_img from '../assets/images/no_products_found.png';
import { BiRupee } from 'react-icons/bi';

export class Staffaccounts extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openedit: false,
      is_loding: true,
      add_data: [],
      edit_addon_name: '',
      edit_addon_price: '',
      edit_addon_id: '',
      newaddonLoading: false,
      editaddonLoading: false,
      is_buttonloding: false,
      addon_name: '',
      addon_price: '',
    };
  }

  componentDidMount() {
    this.fetch_addon();
  }

  fetch_addon = () => {
    fetch(global.api + 'fetch_product_addon', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          toast.error(json.msg);
          this.setState({ add_data: [] });
        } else {
          this.setState({ add_data: json.data });
        }
        this.setState({ is_loding: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  create_addon = () => {
    if (this.state.addon_name == '' || this.state.addon_price == '') {
      toast.error('All field is required!');
    } else {
      this.setState({ newaddonLoading: true });
      fetch(global.api + 'add_product_addon', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          addon_name: this.state.addon_name,
          addon_price: this.state.addon_price,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            toast.error(json.msg);
          } else {
            this.fetch_addon();
            this.setState({
              addon_name: '',
              addon_price: '',
              newaddonLoading: false,
              open: false,
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

  edit_addon = () => {
    if (this.state.edit_addon_name == '' || this.state.edit_addon_price == '') {
      toast.error('All field is required!');
    } else {
      this.setState({ editaddonLoading: true });
      fetch(global.api + 'update_product_addon', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          addon_id: this.state.edit_addon_id,
          addon_name: this.state.edit_addon_name,
          addon_price: this.state.edit_addon_price,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            toast.error(json.msg);
          } else {
            this.fetch_addon();
            this.setState({
              openedit: false,
            });
            toast.success(json.msg);
          }

          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ editaddonLoading: false });
        });
    }
  };

  delete_addon = (id) => {
    fetch(global.api + 'delete_product_addon', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        addon_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          // Toast.show(msg);
        } else {
          toast.success('Category deleted');
          this.fetch_addon();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
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
                <div className="page-title">
                  <h4>
                    Staff Accounts{' '}
                    <span
                      className="text-muted"
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      (0 of 10)
                    </span>
                  </h4>
                </div>
                <div className="page-btn">
                  <a
                    className="btn btn-added"
                    onClick={() => {
                      this.setState({ open: true });
                    }}
                  >
                    Create Staff Account
                  </a>
                </div>
              </div>
              {this.state.is_loding ? (
                <div
                  className="main_loader"
                  style={{
                    height: '50vh',
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
                  {this.state.add_data.length > 0 ? (
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table  datanew">
                          <thead>
                            <tr>
                              <th>S.no</th>
                              <th>Name</th>
                              <th>Phone Number</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.add_data.map((item, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.addon_name}</td>
                                <td>{item.addon_price}</td>
                                <td className="d-flex align-items-center">
                                  {/* <a
                                    className="confirm-text me-3"
                                    onClick={() => {
                                      Swal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!',
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          this.delete_addon(item.id);
                                        }
                                      });
                                    }}
                                  >
                                    <img src={delete_icon} alt="img" />
                                  </a> */}
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                      Swal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!',
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          this.delete_addon(item.id);
                                        }
                                      });
                                    }}
                                  >
                                    Remove Staff
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center flex-column"
                      style={{
                        height: '70vh',
                      }}
                    >
                      <img
                        src={no_img}
                        alt=""
                        style={{
                          height: '250px',
                        }}
                      />
                      <h4 className="mt-4">No Staff Found</h4>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Add New Staff</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Name
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ staff_account_name: e.target.value });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Mobile number
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            staff_account_number: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.newaddonLoading ? (
                      <button
                        className="btn btn-primary btn-sm me-2"
                        style={{
                          pointerEvents: 'none',
                          opacity: '0.8',
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
                          this.create_addon();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Add Staff
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

export default Staffaccounts;
