import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import delete_icon from '../assets/images/icons/delete.svg';
import edit_icon from '../assets/images/icons/edit.svg';
import money_icon from '../assets/images/icons/money.svg';
import { AuthContext } from '../AuthContextProvider';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import no_img from '../assets/images/no_products_found.png';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import moment from 'moment';
import { Toggle } from '../othercomponent/Toggle';

class ProductRecipe extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openedit: false,
      is_loding: true,
      category: [],
      new_category_name: '',
      category_id: '',
      is_buttonloding: false,
      parent_category_id: '',
      category_status: 'active',
      parent_category_id_edit: '',
      remaing_amount: 0,
      payment_mode: 'cash',
      txn_amount: '',
      txn_note: 'kjh',
      txn_date: moment(new Date()).format('YYYY-MM-DD'),
      purchase_id: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(global.api + 'fetch_recipe_products', {
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
          this.setState({ category: json.vendor_products });
          this.setState({ is_loding: false });
        } else {
          this.setState({ category: [], is_loding: false });
          toast.error(json.message);
        }
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  addPayment = () => {
    fetch(global.api + 'add_payment_purchase_order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        purchase_id: this.state.purchase_id,
        txn_amount: this.state.txn_amount,
        txn_method: this.state.payment_mode,
        txn_notes: this.state.txn_note,
        txn_date: this.state.txn_date,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          toast.success(json.msg);
          this.setState({ open: false });
          this.fetchData();
        } else {
          toast.error(json.msg);
        }
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  live_inventory = (e) => {
    this.setState({ is_live_inventory: e.target.checked });
    fetch(global.api + 'update_live_inventory_status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        live_inventory_status: e.target.checked ? 1 : 0,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          toast.success(json.msg);
          this.context.get_vendor_profile(this.context.token);
        } else {
          toast.error(json.msg);
        }
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
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
                  <h4>Recipes for Products</h4>
                </div>
                <div className="page-btn d-flex align-items-center">
                  Live Inventory
                  <div className="status-toggle ml-3">
                    <input
                      type="checkbox"
                      id="live_inventory"
                      className="check"
                      checked={
                        this.context.user.live_inventory == '1' ? true : false
                      }
                      onChange={(e) => {
                        this.live_inventory(e);
                      }}
                    />
                    <label
                      htmlFor="live_inventory"
                      className="checktoggle"
                    ></label>
                  </div>
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
                  {this.state.category.length > 0 ? (
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table  datanew">
                          <thead>
                            <tr>
                              <th>S.no</th>
                              <th>Product Name</th>
                              <th>Product Variant</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.category.map((item, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{item.product_name}</td>
                                <td>{item.varient_name}</td>
                                <td>
                                  {item.recipe_status == '1' ? (
                                    <Link
                                      className="me-3"
                                      to={
                                        '/updateproductrecipe/' +
                                        item.id +
                                        '/' +
                                        item.varient_id
                                      }
                                      target="_blank"
                                    >
                                      <button className="btn btn-primary btn-sm">
                                        Update Recipe
                                      </button>
                                    </Link>
                                  ) : (
                                    <Link
                                      className="me-3"
                                      to={
                                        '/updateproductrecipe/' +
                                        item.id +
                                        '/' +
                                        item.varient_id
                                      }
                                      target="_blank"
                                    >
                                      <button className="btn btn-danger btn-sm">
                                        Create Recipe
                                      </button>
                                    </Link>
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
                      <h4>No Recoard Found</h4>
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
                <h4>Add Category</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Category Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Choose Parent Categry{' '}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        onChange={(e) => {
                          this.setState({ parent_category_id: e.target.value });
                          // alert(e.target.value);
                        }}
                        className="select-container"
                      >
                        <option>Choose Parent Category</option>
                        <option value={0}>None</option>
                        {this.state.category.length > 0 &&
                          this.state.category.map((item, index) => (
                            <option value={item.id}>
                              {item.category_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.is_buttonloding ? (
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
                          this.add();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Add Category
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
                <h4>Pay Amount</h4>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Remaing Amount - {this.state.remaing_amount}
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Amount
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ txn_amount: e.target.value });
                        }}
                        value={this.state.txn_amount}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Payment Date
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ txn_date: e.target.value });
                        }}
                        value={this.state.txn_date}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="form-group">
                        <label> Payment mode</label>
                        <RadioGroup
                          value={this.state.payment_mode}
                          onChange={(e) => {
                            this.setState({ payment_mode: e });
                          }}
                          horizontal
                        >
                          <RadioButton
                            value="Cash"
                            //   pointColor="#f3c783"
                            iconSize={20}
                            //   rootColor="#065f0a"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Cash
                          </RadioButton>
                          <RadioButton
                            value="Card"
                            //   pointColor="#f3c783"
                            iconSize={20}
                            //   rootColor="#065f0a"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Card
                          </RadioButton>
                          <RadioButton
                            value="Chaque"
                            //   pointColor="#f3c783"
                            iconSize={20}
                            //   rootColor="#065f0a"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Chaque
                          </RadioButton>
                          <RadioButton
                            value="Online"
                            //   pointColor="#f3c783"
                            iconSize={20}
                            //   rootColor="#bf370d"
                            iconInnerSize={10}
                            padding={10}
                          >
                            Online
                          </RadioButton>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.is_buttonloding ? (
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
                          this.addPayment();
                        }}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Save Changes
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

export default ProductRecipe;
