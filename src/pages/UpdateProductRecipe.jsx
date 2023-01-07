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
      semifinishedrecipe: [],
      rawmaterial: [],
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
      is_save_button_loding: false,
      rowsRaw: [
        {
          id: 1,
          name: '',
          quantity: '',
          unit: '',
          material_id: '',
        },
      ],
      rowsSemi: [
        {
          id: 1,
          name: '',
          quantity: '',
          unit: '',
          material_id: '',
        },
      ],
      total: 0,
      product_name: '',
      variant_name: '',
    };
  }

  componentDidMount() {
    this.fetchSemiFinishedRecipe();
    this.fetchRawMaterial();
    this.fetch_product_recipe();
  }

  fetch_product_recipe = () => {
    fetch(global.api + 'fetch_product_recipe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        product_id: this.props.product_id,
        varient_id: this.props.variant_id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          toast.error(msg);
        } else {
          if (json.raw_materials.length > 0) {
            const vari = [];
            json.raw_materials.map((item, index) => {
              var one = {
                id: item.raw_product_id,
                name: 'one',
                quantity: item.raw_product_quantity,
                unit: item.raw_product_unit,
              };
              vari.push(one);
            });

            this.setState({ rowsRaw: vari });
          }
          if (json.semi_dishes.length > 0) {
            const vari = [];
            json.semi_dishes.map((item, index) => {
              var one = {
                id: item.semi_product_id,
                name: 'one',
                quantity: item.semi_product_quantity,
                unit: item.semi_product_unit,
              };
              vari.push(one);
            });

            this.setState({ rowsSemi: vari });
          }
          this.setState({
            // rowsRaw: json.raw_materials,
            // rowsSemi: json.semi_dishes,
            product_name: json.product.product_name,
            variant_name: json.varient.variants_name,
          });
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

  fetchSemiFinishedRecipe = (page) => {
    fetch(global.api + 'fetch_semi_dishes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          if (page == 1) {
            this.setState({ semifinishedrecipe: [] });
          }
        } else {
          if (json.data.length > 0) {
            this.setState({ semifinishedrecipe: json.data });
          }
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

  fetchRawMaterial = (id, page) => {
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
            this.setState({ rawmaterial: [] });
          }
        } else {
          if (json.data.data.length > 0) {
            this.setState({ rawmaterial: json.data.data });
          } else {
            this.setState({ rawmaterial: [] });
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

  handleChangeRaw = (idx) => (e) => {
    const newRows = [...this.state.rowsRaw];

    if (e.target.name == 'material_id') {
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index];
      var option = optionElement.getAttribute('unit');
      newRows[idx]['unit'] = option;
      newRows[idx][e.target.name] = e.target.value;
    }

    this.setState({ rowsRaw: newRows });
    console.log(this.state.rowsRaw);
  };

  handleChangeSemi = (idx) => (e) => {
    const newRows = [...this.state.rowsSemi];

    if (e.target.name == 'material_id') {
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index];
      var option = optionElement.getAttribute('unit');
      newRows[idx]['unit'] = option;
    }

    newRows[idx][e.target.name] = e.target.value;

    this.setState({ rowsSemi: newRows });
  };

  handleAddRowRawMaterial = () => {
    const vari = [
      {
        id: 1,
        name: '',
        quantity: '',
        unit: '',
      },
    ];
    this.setState({ rowsRaw: [...this.state.rowsRaw, ...vari] });
  };

  handleAddRowSemiFinished = () => {
    const vari = [
      {
        id: 1,
        name: '',
        quantity: '',
        unit: '',
      },
    ];
    this.setState({ rowsSemi: [...this.state.rowsSemi, ...vari] });
  };

  handleRemoveSpecificRowRaw = (idx) => () => {
    const rowsRaw = [...this.state.rowsRaw];
    rowsRaw.splice(idx, 1);
    this.setState({ rowsRaw });
  };

  handleRemoveSpecificRowSemi = (idx) => () => {
    const rowsSemi = [...this.state.rowsSemi];
    rowsSemi.splice(idx, 1);
    this.setState({ rowsSemi });
  };

  update_product_recipe = () => {
    this.setState({ is_save_button_loding: true });
    fetch(global.api + 'update_product_recipe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        product_id: this.props.product_id,
        varient_id: this.props.variant_id,
        raw_materials: this.state.rowsRaw,
        semi_dishes: this.state.rowsSemi,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          this.setState({ is_save_button_loding: false });
          this.setState({ is_error: true, error_msg: msg });
        } else {
          this.setState({ is_save_button_loding: false });
          this.setState({ is_success: true, success_msg: json.msg });
        }
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ is_save_button_loding: false });
      });
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
                <div className="page-title">
                  <h4>Update Product Recipe</h4>
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
                          <label>Product Name : </label>
                          <span>{this.state.product_name}</span>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Variant Name : </label>
                          <span>{this.state.variant_name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <h5>Select Raw Materials</h5>
                      {this.state.rowsRaw.length > 0 ? (
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
                              {this.state.rowsRaw.map((item, idx) => (
                                <tr id="addr0" key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>
                                    <select
                                      onChange={this.handleChangeRaw(idx)}
                                      className="select-container"
                                      name="material_id"
                                      value={this.state.rowsRaw[idx].id}
                                    >
                                      <option>Choose Material</option>
                                      {this.state.rawmaterial.length > 0 ? (
                                        this.state.rawmaterial.map(
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
                                      value={this.state.rowsRaw[idx].unit}
                                      onChange={this.handleChangeRaw(idx)}
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name="quantity"
                                      value={this.state.rowsRaw[idx].quantity}
                                      onChange={this.handleChangeRaw(idx)}
                                      className="form-control"
                                    />
                                  </td>

                                  <td className="text-end">
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={this.handleRemoveSpecificRowRaw(
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
                              onClick={this.handleAddRowRawMaterial}
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
                            onClick={this.handleAddRowRawMaterial}
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
                      <h5>Select Semi-Finished Products</h5>
                      {this.state.rowsSemi.length > 0 ? (
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
                              {this.state.rowsSemi.map((item, idx) => (
                                <tr id="addr0" key={idx}>
                                  <td>{idx + 1}</td>
                                  <td>
                                    <select
                                      onChange={this.handleChangeSemi(idx)}
                                      className="select-container"
                                      name="material_id"
                                      value={this.state.rowsSemi[idx].id}
                                    >
                                      <option>Choose Material</option>
                                      {this.state.semifinishedrecipe.length >
                                      0 ? (
                                        this.state.semifinishedrecipe.map(
                                          (item, index) => (
                                            <option
                                              value={item.id}
                                              unit={item.recipe_quantity}
                                              current_quantity={
                                                item.current_stock
                                              }
                                            >
                                              {item.dish_name}
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
                                      value={this.state.rowsSemi[idx].unit}
                                      onChange={this.handleChangeSemi(idx)}
                                      className="form-control"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      name="quantity"
                                      value={this.state.rowsSemi[idx].quantity}
                                      onChange={this.handleChangeSemi(idx)}
                                      className="form-control"
                                    />
                                  </td>

                                  <td className="text-end">
                                    <button
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={this.handleRemoveSpecificRowSemi(
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
                              onClick={this.handleAddRowSemiFinished}
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
                            onClick={this.handleAddRowSemiFinished}
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
                      {this.state.is_save_button_loding ? (
                        <button
                          className="btn btn-primary btn-sm"
                          disabled
                          style={{
                            cursor: 'not-allowed',
                            opacity: '0.8',
                          }}
                        >
                          Saving...
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            this.update_product_recipe();
                          }}
                        >
                          Save Recipe
                        </button>
                      )}
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
