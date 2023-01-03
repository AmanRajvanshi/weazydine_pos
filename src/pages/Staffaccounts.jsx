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

      edit: false,
      newaddonLoading: false,
      editaddonLoading: false,
      is_buttonloding: false,
      staff_contact: '',
      staff_name: '',
      staff_role: '',

      staff_id: '',
      staff_edit_role: '',
      staff_edit_name: '',
    };
  }

  componentDidMount() {
    this.fetch_staff();
  }

  add_staff = () => {
    this.setState({ newaddonLoading: true });
    const { staff_contact, staff_name, staff_role } = this.state;
    if (staff_contact == '' || staff_name == '' || staff_role == '') {
      toast.error('Please fill all the fields');
      this.setState({ newaddonLoading: false });
    } else {
      fetch(global.api + 'add_staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          staff_contact: staff_contact,
          staff_name: staff_name,
          staff_role: staff_role,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            toast.success("Staff's account created successfully");
            this.setState({ newaddonLoading: false, open: false });
            this.fetch_staff();
          } else {
            toast.error("Staff's account not created");
            this.setState({ newaddonLoading: false });
          }
        })
        .catch((err) => {
          // toast.error('Something went wrong');
          // this.setState({ newaddonLoading: false });
        });
    }
  };

  //edit staff

  edit_staff = () => {
    this.setState({ newaddonLoading: true });
    const { staff_id, staff_edit_name, staff_edit_role } = this.state;
    if (staff_edit_name == '' || staff_edit_role == '') {
      toast.error('Please fill all the fields');
      this.setState({ newaddonLoading: false });
    } else {
      fetch(global.api + 'update_staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          staff_id: staff_id,
          staff_name: staff_edit_name,
          staff_role: staff_edit_role,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            toast.success(data.msg);
            this.setState({ newaddonLoading: false, edit: false });
            this.fetch_staff();
          } else {
            toast.error(data.msg);
            this.setState({ newaddonLoading: false });
          }
        })
        .catch((err) => {
          // toast.error('Something went wrong');
          // this.setState({ newaddonLoading: false });
        });
    }
  };

  delete_staff = (id) => {
    this.setState({ newaddonLoading: true });

    fetch(global.api + 'delete_staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        staff_id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success("Staff's account deleted successfully");
          this.setState({ newaddonLoading: false, edit: false });
          this.fetch_staff();
        } else {
          toast.error("Staff's account not deleted");
          this.setState({ newaddonLoading: false });
        }
      })
      .catch((err) => {
        // toast.error('Something went wrong');
        // this.setState({ newaddonLoading: false });
      });
  };

  fetch_staff = () => {
    this.setState({ is_loding: true });
    fetch(global.api + 'fetch_staff', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          this.setState({ add_data: data.data, is_loding: false });
        } else {
          this.setState({ is_loding: false });
        }
      })
      .catch((err) => {
        this.setState({ is_loding: false });
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
                      ({this.state.add_data.length} of 10)
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
                              <th>Role</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.add_data.map((item, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.staff_name}</td>
                                <td>{item.staff_contact}</td>
                                <td>{item.staff_role}</td>
                                <td>
                                  {item.staff_role !== 'owner' ? (
                                    <>
                                      <a>
                                        <img
                                          className="me-3"
                                          src={edit_icon}
                                          alt="img"
                                          onClick={() => {
                                            this.setState({
                                              staff_edit_name: item.staff_name,
                                              staff_edit_role: item.staff_role,
                                              edit: true,
                                              staff_id: item.staff_id,
                                            });
                                          }}
                                        />
                                      </a>
                                      <a
                                        className="confirm-text"
                                        onClick={() =>
                                          Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText:
                                              'Yes, delete it!',
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              this.delete_staff(item.staff_id);
                                            }
                                          })
                                        }
                                      >
                                        <img src={delete_icon} alt="img" />
                                      </a>
                                    </>
                                  ) : (
                                    <></>
                                  )}
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
                          this.setState({ staff_name: e.target.value });
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
                        maxLength={10}
                        onChange={(e) => {
                          this.setState({
                            staff_contact: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Role
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        onChange={(e) => {
                          this.setState({
                            staff_role: e.target.value,
                          });
                        }}
                        className="form-control"
                      >
                        <option value="0">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="waiter">Waiter</option>
                        <option value="staff">Staff</option>
                      </select>
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
                        Adding...
                        <span
                          class="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                      </button>
                    ) : (
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          this.add_staff();
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

        <Modal
          open={this.state.edit}
          onClose={() => this.setState({ edit: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Edit Role</h4>
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
                          this.setState({ staff_edit_name: e.target.value });
                        }}
                        value={this.state.staff_edit_name}
                      />
                    </div>
                    {/* <div className="form-group">
                      <label>
                        Mobile number
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({
                            staff_contact: e.target.value,
                          });
                        }}
                      />
                    </div> */}

                    <div className="form-group">
                      <label>
                        Role
                        <span className="text-danger">*</span>
                      </label>

                      <select
                        onChange={(e) => {
                          this.setState({
                            staff_edit_role: e.target.value,
                          });
                        }}
                        className="form-control"
                        value={this.state.staff_edit_role}
                      >
                        <option value="0">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="waiter">Waiter</option>
                        <option value="staff">Staff</option>
                      </select>
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
                        Updating
                      </button>
                    ) : (
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          this.edit_staff();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Update Staff
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
