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
import Helmet from 'react-helmet';

export class Addproduct extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      images: [],
      variants_addons_div: false,
      newaddon: false,
      new_category_name: '',
      category: [],
      product_show: true,
      product_id: 0,
      name: '',
      c_id: '',
      our_price: '',
      description: '',
      type: 'product',
      is_veg: 1,
      save_and_continue: false,
      add_category_loading: false,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    fetch(global.api + 'fetch_vendor_category', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data.length == 0) {
          this.setState({ open: true });
        }
        this.setState({ category: json.data });
        this.setState({ is_loding: false });
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  uploadImage = async (e) => {
    let image = this.state.images;
    image.push(e.target.files[0]);
    this.setState({ images: image });
  };

  add = () => {
    if (this.state.new_category_name != '') {
      this.setState({ add_category_loading: true });
      fetch(global.api + 'create_category_vendor', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          category_name: this.state.new_category_name,
          status: 'active',
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            var msg = json.msg;
            toast.error(msg);
          } else {
            this.setState({
              open: false,
              new_category_name: '',
            });
            toast.success(json.msg);
            this.fetchCategories();
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ add_category_loading: false });
        });
    } else {
      toast.error('Please add Category first!');
    }
  };

  create = () => {
    let numberValidation = /^[0-9]+$/;
    let isnumValid = numberValidation.test(this.state.our_price);
    if (
      this.state.name == '' ||
      this.state.images == '' ||
      this.state.our_price == '' ||
      this.state.description == ''
    ) {
      toast.error('All fields are required !');
    } else if (this.state.category == '') {
      toast.error('Add category first !');
    } else if (this.state.c_id == '') {
      toast.error('Category is required !');
    } else if (!isnumValid) {
      toast.error('Price contains digits only!');
    } else if (!isnumValid) {
      toast.error('Price contains digits only!');
    } else if (this.state.description == '') {
      toast.error('Description is required !');
    } else {
      this.setState({ save_and_continue: true, isLoading: true });

      var form = new FormData();
      form.append('product_name', this.state.name);
      // form.append("token",global.token);
      form.append('vendor_category_id', this.state.c_id);
      form.append('price', this.state.our_price);
      form.append('description', this.state.description);
      form.append('type', this.state.type);

      if (this.state.images.length > 0) {
        this.state.images.map((item, index) => {
          form.append('product_img', item);
        });
      }

      form.append('is_veg', this.state.is_veg);
      fetch(global.api + 'vendor_add_product', {
        method: 'POST',
        body: form,
        headers: {
          Authorization: this.context.token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            var msg = json.msg;
            toast.error(msg);
          } else {
            toast.success(json.msg);
            this.setState({ product_show: false, product_id: json.data.id });
          }
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.setState({ isLoading: false, save_and_continue: false });
        });
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Add Product in Menu</title>
        </Helmet>
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            {this.state.product_show ? (
              <div className="content">
                <div className="page-header">
                  <div className="page-title">
                    <h4>Product Add</h4>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Product Name</label>
                          <input
                            type="text"
                            onChange={(e) => {
                              this.setState({ name: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <div className="d-flex align-items-center justify-content-between">
                            <label>Category</label>
                            <div className="page-btn">
                              <a
                                className="btn btn-added  d-flex align-items-center pt-0"
                                onClick={() => {
                                  this.setState({ open: true });
                                }}
                              >
                                <img
                                  src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/plus.svg"
                                  alt="img"
                                  className="me-1"
                                />
                                Add
                              </a>
                            </div>
                          </div>
                          <select
                            onChange={(e) => {
                              this.setState({ c_id: e.target.value });
                              // alert(e.target.value);
                            }}
                            className="select-container"
                          >
                            <option>Choose Category</option>
                            {this.state.category.length > 0 ? (
                              this.state.category.map((item, index) => (
                                <option value={item.id}>{item.name}</option>
                              ))
                            ) : (
                              <></>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label>Price</label>
                          <input
                            onChange={(e) => {
                              this.setState({ our_price: e.target.value });
                            }}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>VEG/NON-VEG</label>
                          <RadioGroup
                            value={this.state.is_veg}
                            onChange={(e) => {
                              this.setState({ is_veg: e });
                            }}
                            horizontal
                          >
                            <RadioButton
                              value="1"
                              pointColor="#f3c783"
                              iconSize={20}
                              rootColor="#065f0a"
                              iconInnerSize={10}
                              padding={10}
                            >
                              VEG
                            </RadioButton>
                            <RadioButton
                              value="0"
                              pointColor="#f3c783"
                              iconSize={20}
                              rootColor="#bf370d"
                              iconInnerSize={10}
                              padding={10}
                            >
                              NON-VEG
                            </RadioButton>
                          </RadioGroup>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Product/Combos</label>
                          <select
                            onChange={(e) => {
                              this.setState({ type: e.target.value });
                            }}
                            value={this.state.type}
                            className="select-container"
                          >
                            <option value="product">Product</option>
                            <option value="package">Combos</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="form-group">
                          <label>Description</label>
                          <input
                            type="text"
                            onChange={(e) => {
                              this.setState({ description: e.target.value });
                            }}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label> Product Image</label>
                          <div
                            className="image-upload"
                            style={{
                              width: 'max-content',
                            }}
                          >
                            {this.state.images.length > 0 ? (
                              <></>
                            ) : (
                              <input
                                type={'file'}
                                accept=".png, .jpg, .jpeg,.svg,.webp"
                                className="upload"
                                onChange={(e) => {
                                  this.uploadImage(e);
                                }}
                              />
                            )}

                            {this.state.images.length > 0 &&
                              this.state.images.map((item, index) => {
                                return (
                                  <img
                                    id="target"
                                    src={URL.createObjectURL(item)}
                                    style={{
                                      width: '200px',
                                      height: '200px',
                                    }}
                                  />
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      {this.state.variants_addons_div ? (
                        <>
                          <h3 className="mb-3 py-2 underline">
                            Variants and Addons
                          </h3>
                          <h2 className="mb-3 py-2 underline">Variants</h2>
                          <div className="row">
                            <div className="col-mg-12">
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
                                    <th className="text-center">
                                      Market Price
                                    </th>
                                    <th className="text-center">Offer Price</th>
                                    <th className="text-end">Action</th>
                                    <th />
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.rows.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                      <td>{idx}</td>
                                      <td>
                                        <input
                                          type="text"
                                          name="name"
                                          value={this.state.rows[idx].name}
                                          onChange={this.handleChange(idx)}
                                          className="form-control"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="offer_price"
                                          value={
                                            this.state.rows[idx].offer_price
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
                                          Remove
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
                                  className="btn btn-primary"
                                  style={{
                                    marginBottom: '20px',
                                    marginTop: '10px',
                                  }}
                                >
                                  Add Row
                                </button>
                              </div>
                            </div>
                          </div>
                          <h2 className="mb-3 py-2 underline">Addons</h2>
                          <div className="row">
                            <div className="col-mg-12">
                              {this.state.add_data.length > 0 ? (
                                this.state.add_data.map((item, index) => {
                                  return (
                                    <div className="checkbox_addon">
                                      <input
                                        type="checkbox"
                                        id={'addon' + item.id}
                                        name="addon"
                                        value={item.id}
                                        onChange={this.handleAddon}
                                        className="form-check-input new_checkbox mr-4"
                                      />
                                      <label for={'addon' + item.id}>
                                        {item.addon_name} - <BiRupee />{' '}
                                        {item.addon_price}
                                      </label>
                                    </div>
                                  );
                                })
                              ) : (
                                <>No Addon Found</>
                              )}

                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'end',
                                }}
                              >
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    this.setState({
                                      newaddon: true,
                                    });
                                  }}
                                  style={{
                                    marginBottom: '20px',
                                    marginTop: '10px',
                                  }}
                                >
                                  Add New Addon
                                </button>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <a
                                className="btn btn-primary btn-sm  me-2"
                                onClick={() => this.add()}
                              >
                                Submit
                              </a>
                              <a
                                href="https://dreamspos.dreamguystech.com/html/template/productlist.html"
                                className="btn btn-cancel"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="col-lg-12">
                          {this.state.save_and_continue ? (
                            <button
                              className="btn btn-primary btn-sm  me-2"
                              style={{
                                pointerEvents: 'none',
                                opacity: '0.8',
                              }}
                            >
                              <span
                                class="spinner-border spinner-border-sm me-2"
                                role="status"
                              ></span>
                              Saving
                            </button>
                          ) : (
                            <a
                              onClick={() => {
                                this.create();
                              }}
                              className="btn btn-primary btn-sm  me-2"
                            >
                              Save and continue
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Variants
                product_id={this.state.product_id}
                navigate={this.props.navigate}
              />
            )}
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
                      <label>Category Name</label>
                      <input
                        type="text"
                        onChange={(e) => {
                          this.setState({ new_category_name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    {this.state.add_category_loading ? (
                      <button
                        className="btn btn-primary btn-sm  me-2"
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
                        className="btn btn-primary btn-sm  me-2"
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
      </>
    );
  }
}

class Variants extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      add_data: [],
      addon_name: '',
      addon_price: '',
      object: [],
      add_on_loading: false,
      add_on_dataLoading: true,
      newaddon: false,
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
        } else {
          this.setState({ add_data: json.data });
        }
        this.setState({ add_on_dataLoading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  update_product_variant = () => {
    this.setState({ add_on_loading: true });
    const add = [];
    this.state.object.map((item, index) => {
      if (item) {
        add.push(index);
      }
    });

    fetch(global.api + 'vendor_update_product_options', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        variants: this.state.rows,
        addons: add,
        product_id: this.props.product_id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          toast.error(json.msg);
        } else {
          toast.success(json.msg);
          this.props.navigate('/productlist');
        }
        this.setState({ isLoading2: false, add_on_loading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleChange = (idx) => (e) => {
    const newRows = [...this.state.rows];
    newRows[idx][e.target.name] = e.target.value;

    this.setState({
      rows: newRows,
    });
  };
  handleAddRow = () => {
    const vari = [
      {
        id: 1,
        variants_name: '',
        variants_price: '',
        variants_discounted_price: '',
      },
    ];
    this.setState({ rows: [...this.state.rows, ...vari] });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows];
    rows.splice(idx, 1);
    this.setState({ rows });
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
              newaddon: false,
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

  handleAddon = (e) => {
    // to find out if it's checked or not; returns true or false
    const checked = e.target.checked;
    // to get the checked value
    const checkedValue = e.target.value;

    if (this.state.object[checkedValue]) {
      const object = this.state.object;
      object[checkedValue] = false;
      this.setState({ object });
    } else {
      const object = this.state.object;
      object[checkedValue] = true;
      this.setState({ object });
    }

    //then you can do with the value all you want to do with it
  };

  render() {
    return (
      <>
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Varients & Addons</h4>
              <h6>Create Product Varients & Addons</h6>
            </div>
            <div>
              <Link to="/productlist" className="btn btn-cancel btn-sm mx-2">
                No, This product has no variants or addons
              </Link>
              {this.state.add_on_loading ? (
                <button
                  className="btn btn-primary btn-sm  mx-2"
                  style={{
                    pointerEvents: 'none',
                    opacity: '0.8',
                  }}
                >
                  <span
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Saving
                </button>
              ) : (
                <a
                  className="btn btn-primary btn-sm  mx-2"
                  onClick={() => this.update_product_variant()}
                >
                  Save Now
                </a>
              )}
            </div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <h3 className="mb-3 py-2 underline">Variants</h3>
            {this.state.rows.length > 0 ? (
              <div className="row">
                <div className="col-mg-12">
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
                        <th className="text-center">Market Price</th>
                        <th className="text-center">Offer Price</th>
                        <th className="text-end">Action</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.rows.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                          <td>{idx}</td>
                          <td>
                            <input
                              type="text"
                              name="variants_name"
                              value={this.state.rows[idx].name}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="variants_discounted_price"
                              value={this.state.rows[idx].offer_price}
                              onChange={this.handleChange(idx)}
                              className="form-control"
                            />
                          </td>
                          <td className="text-end">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSpecificRow(idx)}
                            >
                              Remove
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
                      className="btn btn-primary btn-sm "
                      style={{
                        marginBottom: '20px',
                        marginTop: '10px',
                      }}
                    >
                      Add New Varient
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={this.handleAddRow}
                  className="btn btn-primary btn-sm "
                  style={{
                    marginBottom: '20px',
                    marginTop: '10px',
                  }}
                >
                  Add New Varient
                </button>
              </div>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div className="d-flex align-items-center">
                <h6 className="py-2 underline">Addons</h6>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    this.setState({
                      newaddon: true,
                    });
                  }}
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  Add New Addon
                </button>
              </div>
              <div className="d-flex align-items-center">
                <h6 className="py-2 underline">Maximum Addons Count</h6>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    this.setState({
                      max_product_addons: e.target.value,
                    });
                  }}
                >
                  <option>Select Maximum Addons Count</option>
                  <option value="0">
                    Unlimited (User can select any number of addons)
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-mg-12">
                {this.state.add_on_dataLoading ? (
                  <Skeletonloader height={43} count={3} />
                ) : this.state.add_data.length > 0 ? (
                  this.state.add_data.map((item, index) => {
                    return (
                      <div className="checkbox_addon">
                        <input
                          type="checkbox"
                          id={'addon' + item.id}
                          name="addon"
                          value={item.id}
                          onChange={this.handleAddon}
                          className="form-check-input new_checkbox mr-4"
                        />
                        <label for={'addon' + item.id}>
                          {item.addon_name} - <BiRupee /> {item.addon_price}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <>No Addon Found</>
                )}
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={this.state.newaddon}
          onClose={() => this.setState({ newaddon: false })}
          center
          classNames={{
            modal: 'customModal',
          }}
        >
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Add Addon</h4>
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
                  </div>
                  <div className="col-lg-12">
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
                        className="btn btn-primary btn-sm  me-2"
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
                        onClick={() => {
                          this.create_addon();
                        }}
                        href="javascript:void(0);"
                        className="btn btn-primary btn-sm  me-2"
                      >
                        Add New Addon
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

function Navigate(props) {
  const abcd = useNavigate();
  const location = useLocation();
  return (
    <Addproduct
      {...props}
      {...useParams()}
      navigate={abcd}
      location={location}
    />
  );
}

export default (props) => <Navigate {...props} />;
