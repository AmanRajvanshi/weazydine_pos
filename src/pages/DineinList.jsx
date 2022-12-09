import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { AuthContext } from '../AuthContextProvider';
import { Bars } from 'react-loader-spinner';
import no_order from '../assets/images/no_orders.webp';
import delete_icon from '../assets/images/icons/delete.svg';
import edit_icon from '../assets/images/icons/edit.svg';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export class DineinList extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      adding_table: false,
      edit_modal: false,
      edit_table_name_button: false,
      table_name_to_edit_id: '',
      table_name_to_edit: '',
    };
  }

  componentDidMount() {
    this.fetch_table_vendors();

    window.Echo.private(`checkTableStatus.` + this.context.user.id).listen(
      '.server.created',
      (e) => {
        this.setState({ data: e.tables });
      }
    );
  }

  fetch_table_vendors = () => {
    fetch(global.api + 'fetch_table_vendors', {
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
    fetch(global.api + 'delete_table_vendor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        table_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error('Something went wrong! Please try again later.');
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
    fetch(global.api + 'add_new_table_vendor', {
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
          var msg = json.msg;
          // Toast.show(msg);
        } else {
          // toast.success(json.msg);
          toast.success('Dine In Added Successfully');

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

  edit_table_name = () => {
    this.setState({ edit_table_name_button: true });
    fetch(global.api + 'edit_table_name', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        table_id: this.state.table_name_to_edit_id,
        table_name: this.state.table_name_to_edit,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error('Something went wrong! Please try again later.');
        } else {
          toast.success(json.msg);
          this.fetch_table_vendors();
          this.setState({
            edit_modal: false,
          });
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ edit_table_name_button: false });
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
                  <h4>Dine In Management</h4>
                  {this.state.adding_table ? (
                    <button
                      className="btn btn-sm btn-primary me-2"
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
                    <button
                      className="btn btn-sm btn-primary me-2"
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
                    height: '60vh',
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
                                <th style={{ textAlign: 'end' }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.data.map((item, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      <a
                                        onClick={() => {
                                          this.setState({
                                            edit_modal: true,
                                            table_name_to_edit_id:
                                              item.table_uu_id,
                                            table_name_to_edit: item.table_name,
                                          });
                                        }}
                                      >
                                        {item.table_name}
                                      </a>
                                    </td>
                                    <td>
                                      <span
                                        className={
                                          item.table_status == 'active'
                                            ? 'text-success'
                                            : 'text-warning'
                                        }
                                        style={{ textTransform: 'capitalize' }}
                                      >
                                        {item.table_status}
                                      </span>
                                    </td>
                                    <td>
                                      <a href={item.qr_link} target="_blank">
                                        <i
                                          className="fa fa-qrcode"
                                          style={{
                                            marginRight: '10px',
                                          }}
                                        ></i>
                                        QR Code
                                      </a>
                                    </td>
                                    <td
                                      style={{
                                        textAlign: 'end',
                                        display: 'flex',
                                        alingItems: 'center',
                                        justifyContent: 'flex-end',
                                      }}
                                    >
                                      <Link
                                        to={
                                          '/tableorderdetails/' +
                                          item.table_uu_id
                                        }
                                      >
                                        <button
                                          className="btn btn-primary"
                                          style={{
                                            marginRight: '10px',
                                            padding: '2px 6px',
                                          }}
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </Link>
                                      {/* <img
                                        src={edit_icon}
                                        alt="img"
                                        style={{
                                          cursor: 'pointer',
                                          margin: '0 10px',
                                        }}
                                      /> */}
                                      <img
                                        src={delete_icon}
                                        alt="img"
                                        style={{
                                          cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                          Swal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText:
                                              'Yes, delete it!',
                                            cancelButtonText: 'No, cancel!',
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
                    <div
                      className="content"
                      style={{
                        height: '60vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <img src={no_order} alt="" />
                      <h3>No DineIn data Found</h3>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <Modal
          open={this.state.edit_modal}
          onClose={() => this.setState({ edit_modal: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Edit Table Name</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>New Table Name</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ table_name_to_edit: e.target.value });
                        }}
                        value={this.state.table_name_to_edit}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.edit_table_name_button ? (
                      <button
                        className="btn btn-sm btn-primary me-2"
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
                        onClick={() => {
                          this.edit_table_name();
                        }}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Update Name
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

export default DineinList;
