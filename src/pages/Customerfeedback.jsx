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
import moment from 'moment';

export class Customerfeedback extends Component {
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
    fetch(global.api + 'get_vendor_feedback', {
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
          this.setState({ feed_data: [] });
        } else {
          this.setState({ feed_data: json.data });
        }
        this.setState({ is_loding: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
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
                  <h4>Customer Feedbacks</h4>
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
                  {this.state.feed_data.length > 0 ? (
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table  datanew">
                          <thead>
                            <tr>
                              <th>S.no</th>
                              <th>Rating</th>
                              <th>Feedback</th>
                              <th>Date & Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.feed_data.map((item, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.user_rating} / 5</td>
                                <td>{item.user_description}</td>
                                <td>
                                  {moment(item.created_at).format('llll')}
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
                      <h4>No Feedbacks Found</h4>
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
                <h4>Add Addons</h4>
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
                        Add Addon
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.openedit}
          onClose={() => this.setState({ openedit: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Edit Addon</h4>
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
                          this.setState({ edit_addon_name: e.target.value });
                        }}
                        value={this.state.edit_addon_name}
                      />
                    </div>
                    <div className="form-group">
                      <label>Addon Price</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ edit_addon_price: e.target.value });
                        }}
                        value={this.state.edit_addon_price}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.editaddonLoading ? (
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
                          this.edit_addon();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Update Addon
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

export default Customerfeedback;
