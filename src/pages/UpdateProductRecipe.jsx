import React, { Component } from 'react';
import Header from '../othercomponent/Header';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { BiRupee } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContextProvider';
import Skeletonloader from '../othercomponent/Skeletonloader';
import { Bars } from 'react-loader-spinner';
import { Toggle } from '../othercomponent/Toggle';

export class UpdateProductRecipe extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      is_loding: true,
      open: false,
      images: [],
      variants_addons_div: false,
      newaddon: false,
      new_category_name: '',
      category: [],
      products: [],
      product_show: true,
      product_id: 0,
      name: '',
      c_id: '',
      market_price: '',
      our_price: '',
      description: '',
      type: 'product',
      is_veg: 1,
      save_and_continue: false,
      add_category_loading: false,
      rows: [
        {
          id: 1,
          name: '',
          quantity: '',
          Unit: '',
          material_id: '',
        },
      ],
      total: 0,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = (id, page) => {
    fetch(global.api + 'fetch_inventory_products', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page,
        inventory_category_id: 0,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          if (page == 1) {
            this.setState({ products: [] });
          }
        } else {
          if (json.data.data.length > 0) {
            this.setState({ products: json.data.data });
          }
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ is_loding: false });
      });
  };

  handleChange = (idx) => (e) => {
    const newRows = [...this.state.rows];

    if (e.target.name == 'material_id') {
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index];
      var option = optionElement.getAttribute('unit');
      newRows[idx]['unit'] = option;
    }

    newRows[idx][e.target.name] = e.target.value;

    this.setState({ rows: newRows });
  };
  handleAddRow = () => {
    const vari = [
      {
        id: 1,
        name: '',
        quantity: '',
        Unit: '',
      },
    ];
    this.setState({ rows: [...this.state.rows, ...vari] });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
  };
  render() {
    return (
      <>
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            {/* {this.state.product_show ? ( */}
            <div className="content">
              <div className="page-header">
                <div className="page-title w-100 d-flex align-items-center justify-content-between">
                  <h4>Product Recipe</h4>
                  <div>
                    Live Inventory <Toggle />
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
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Product</label>
                          <select
                            className="form-control"
                            name="material_id"
                            onChange={this.handleChange(0)}
                          >
                            <option value="">Select Product</option>
                            {this.state.products.map((item, key) => (
                              <option value={item.id} unit={item.unit}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Quantity</label>
                          <select
                            className="form-control"
                            name="material_id"
                            onChange={this.handleChange(0)}
                          >
                            <option value="">Select Quantity</option>
                            {this.state.products.map((item, key) => (
                              <option value={item.id} unit={item.unit}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <h5>Select Semi-Finished Products</h5>
                      {this.state.rows.length > 0 ? (
                        <div className="col-lg-12">
                          <br />
                          <table
                            className="table table-bordered table-hover"
                            id="tab_logic"
                            style={{
                              border: '1px solid #d9d9d9',
                            }}
                          >
                            <thead>
                              <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Unit</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-end">Action</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.rows.map((item, idx) => (
                                <tr id="addr0" key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>
                                    <select
                                      onChange={this.handleChange(idx)}
                                      className="select-container"
                                      name="material_id"
                                    >
                                      <option>Choose Material</option>
                                      {this.state.products.length > 0 ? (
                                        this.state.products.map(
                                          (item, index) => (
                                            <option
                                              value={item.id}
                                              unit={item.purchase_unit}
                                              current_quantity={
                                                item.current_stock
                                              }
                                            >
                                              {item.inventory_product_name}
                                            </option>
                                          )
                                        )
                                      ) : (
                                        <></>
                                      )}
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name="unit"
                                      value={this.state.rows[idx].unit}
                                      onChange={this.handleChange(idx)}
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name="quantity"
                                      value={
                                        this.state.rows[idx].current_quantity
                                      }
                                      onChange={this.handleChange(idx)}
                                      className="form-control"
                                    />
                                  </td>

                                  <td className="text-end">
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={this.handleRemoveSpecificRow(
                                        idx
                                      )}
                                    >
                                      X
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'end',
                            }}
                          >
                            <button
                              onClick={this.handleAddRow}
                              className="btn btn-outline-secondary"
                              style={{
                                marginBottom: '20px',
                                marginTop: '10px',
                              }}
                            >
                              Add New
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'end',
                          }}
                        >
                          <button
                            onClick={this.handleAddRow}
                            className="btn btn-sm btn-outline-secondary"
                            style={{
                              marginBottom: '20px',
                              marginTop: '10px',
                            }}
                          >
                            Add A Row
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="row">
                      <h5>Select Raw Materials</h5>
                      {this.state.rows.length > 0 ? (
                        <div className="col-lg-12">
                          <br />
                          <table
                            className="table table-bordered table-hover"
                            id="tab_logic"
                            style={{
                              border: '1px solid #d9d9d9',
                            }}
                          >
                            <thead>
                              <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Unit</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-end">Action</th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.rows.map((item, idx) => (
                                <tr id="addr0" key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>
                                    <select
                                      onChange={this.handleChange(idx)}
                                      className="select-container"
                                      name="material_id"
                                    >
                                      <option>Choose Material</option>
                                      {this.state.products.length > 0 ? (
                                        this.state.products.map(
                                          (item, index) => (
                                            <option
                                              value={item.id}
                                              unit={item.purchase_unit}
                                              current_quantity={
                                                item.current_stock
                                              }
                                            >
                                              {item.inventory_product_name}
                                            </option>
                                          )
                                        )
                                      ) : (
                                        <></>
                                      )}
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name="unit"
                                      value={this.state.rows[idx].unit}
                                      onChange={this.handleChange(idx)}
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name="quantity"
                                      value={
                                        this.state.rows[idx].current_quantity
                                      }
                                      onChange={this.handleChange(idx)}
                                      className="form-control"
                                    />
                                  </td>

                                  <td className="text-end">
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={this.handleRemoveSpecificRow(
                                        idx
                                      )}
                                    >
                                      X
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'end',
                            }}
                          >
                            <button
                              onClick={this.handleAddRow}
                              className="btn btn-outline-secondary"
                              style={{
                                marginBottom: '20px',
                                marginTop: '10px',
                              }}
                            >
                              Add New
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'end',
                          }}
                        >
                          <button
                            onClick={this.handleAddRow}
                            className="btn btn-sm btn-outline-secondary"
                            style={{
                              marginBottom: '20px',
                              marginTop: '10px',
                            }}
                          >
                            Add A Row
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-primary btn-sm">
                        Save Recipe
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  const location = useLocation();
  return (
    <UpdateProductRecipe
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
