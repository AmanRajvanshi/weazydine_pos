import React, { Component } from "react";
import Header from "../othercomponent/Header";
import { AuthContext } from "../AuthContextProvider";
class Pos extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      products: [],
      active_cat: 0,
      is_loding: true,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  active_cat = (id) => {
    this.setState({ active_cat: id });
    this.fetchProducts(id, 1);
  };

  fetchProducts = (category_id, page) => {
    fetch(global.api + "vendor_get_vendor_product", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        vendor_category_id: category_id,
        product_type: "product",
        page: page,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        //  console.warn(json);
        if (!json.status) {
          var msg = json.msg;
          if (page == 1) {
            this.setState({ products: [] });
          }
        } else {
          if (json.data.length > 0) {
            this.setState({ products: json.data });
          }
        }
        this.setState({ isloading: false, load_data: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
  };

  fetchCategories = () => {
    fetch(global.api + "fetch_vendor_category", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.context.token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn(json.data)
        this.setState({ category: json.data });
        this.fetchProducts(0, 1);
        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <>
        <div className="main-wrappers">
          <Header />
          <div className="page-wrapper" id="sidebar">
            <div className="content">
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search Here...."
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    padding: "0 10px",
                    position: "relative",
                    margin: "10px 0 30px",
                  }}
                />
              </div>
              <Category
                category={this.state.category}
                fetch_product={this.active_cat}
              />
              <div className="row">
                <div className="col-lg-8 col-sm-12 tabs_wrapper">
                  <Products data={this.state.products} />
                </div>

                <div className="col-lg-4 col-sm-12 sidebar_scroll">
                  <PosAdd />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class PosAdd extends React.Component {
  render() {
    return (
      <>
        <div className="order-list">
          <div className="orderid">
            <h4>Order List</h4>
            {/* <h5>Transaction id : #65565</h5> */}
          </div>
          <div className="actionproducts">
            <ul>
              <li>
                <a href="javascript:void(0);" className="deletebg confirm-text">
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                    alt="img"
                  />
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0);"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="dropset"
                >
                  <img
                    src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/ellipise1.svg"
                    alt="img"
                  />
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                  data-popper-placement="bottom-end"
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      Action
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Another Action
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item">
                      Something Elses
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="card card-order">
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <a
                  href="javascript:void(0);"
                  className="btn btn-adds"
                  data-bs-toggle="modal"
                  data-bs-target="#create"
                >
                  <i className="fa fa-plus me-2" />
                  Add Customer
                </a>
              </div>
              <div className="col-lg-12">
                <div className="select-split">
                  <div className="select-group w-100">
                    <select className="select-container">
                      <option>Walk-in Customer</option>
                      <option>Chris Moris</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="split-card" />
          <div className="card-body pt-0">
            <div className="totalitem">
              <h4>Total items : 4</h4>
              <a href="javascript:void(0);">Clear all</a>
            </div>
            <div className="product-table">
              <ul className="product-lists">
                <li>
                  <div className="productimg">
                    <div className="productimgs">
                      <img
                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product30.jpg"
                        alt="img"
                      />
                    </div>
                    <div className="productcontet">
                      <h4>
                        Pineapple
                        <a
                          href="javascript:void(0);"
                          className="ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit"
                        >
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-5.svg"
                            alt="img"
                          />
                        </a>
                      </h4>
                      <div className="productlinkset">
                        <h5>PT001</h5>
                      </div>
                      <AddDelete />
                    </div>
                  </div>
                </li>
                <li>3000.00</li>
                <li>
                  <a className="confirm-text" href="javascript:void(0);">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                      alt="img"
                    />
                  </a>
                </li>
              </ul>
              <ul className="product-lists">
                <li>
                  <div className="productimg">
                    <div className="productimgs">
                      <img
                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product34.jpg"
                        alt="img"
                      />
                    </div>
                    <div className="productcontet">
                      <h4>
                        Green Nike
                        <a
                          href="javascript:void(0);"
                          className="ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit"
                        >
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-5.svg"
                            alt="img"
                          />
                        </a>
                      </h4>
                      <div className="productlinkset">
                        <h5>PT001</h5>
                      </div>
                      <AddDelete />
                    </div>
                  </div>
                </li>
                <li>3000.00</li>
                <li>
                  <a className="confirm-text" href="javascript:void(0);">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                      alt="img"
                    />
                  </a>
                </li>
              </ul>
              <ul className="product-lists">
                <li>
                  <div className="productimg">
                    <div className="productimgs">
                      <img
                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product35.jpg"
                        alt="img"
                      />
                    </div>
                    <div className="productcontet">
                      <h4>
                        Banana
                        <a
                          href="javascript:void(0);"
                          className="ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit"
                        >
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-5.svg"
                            alt="img"
                          />
                        </a>
                      </h4>
                      <div className="productlinkset">
                        <h5>PT001</h5>
                      </div>
                      <AddDelete />
                    </div>
                  </div>
                </li>
                <li>3000.00</li>
                <li>
                  <a className="confirm-text" href="javascript:void(0);">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                      alt="img"
                    />
                  </a>
                </li>
              </ul>
              <ul className="product-lists">
                <li>
                  <div className="productimg">
                    <div className="productimgs">
                      <img
                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/product/product31.jpg"
                        alt="img"
                      />
                    </div>
                    <div className="productcontet">
                      <h4>
                        Strawberry
                        <a
                          href="javascript:void(0);"
                          className="ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#edit"
                        >
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/edit-5.svg"
                            alt="img"
                          />
                        </a>
                      </h4>
                      <div className="productlinkset">
                        <h5>PT001</h5>
                      </div>
                      <AddDelete />
                    </div>
                  </div>
                </li>
                <li>3000.00</li>
                <li>
                  <a className="confirm-text" href="javascript:void(0);">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/delete-2.svg"
                      alt="img"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="split-card" />
          <div className="card-body pt-0 pb-2">
            <div className="setvalue">
              <ul>
                <li>
                  <h5>Subtotal</h5>
                  <h6>55.00$</h6>
                </li>
                <li>
                  <h5>Tax</h5>
                  <h6>5.00$</h6>
                </li>
                <li className="total-value">
                  <h5>Total</h5>
                  <h6>60.00$</h6>
                </li>
              </ul>
            </div>
            <div className="setvaluecash">
              <ul>
                <li>
                  <a href="javascript:void(0);" className="paymentmethod">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/cash.svg"
                      alt="img"
                      className="me-2"
                    />
                    Cash
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="paymentmethod">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/debitcard.svg"
                      alt="img"
                      className="me-2"
                    />
                    Debit
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="paymentmethod">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/scan.svg"
                      alt="img"
                      className="me-2"
                    />
                    Scan
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-totallabel">
              <h5>Checkout</h5>
              <h6>60.00$</h6>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class AddDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <div className="increment-decrement">
        <div className="input-groups">
          <input
            type="button"
            defaultValue="-"
            className="button-minus dec button"
            onClick={() => {
              this.setState({ count: this.state.count - 1 });
            }}
          />
          <input
            type="text"
            name="child"
            value={this.state.count}
            className="quantity-field"
          />
          <input
            type="button"
            defaultValue="+"
            className="button-plus inc button"
            onClick={() => {
              this.setState({ count: this.state.count + 1 });
            }}
          />
        </div>
      </div>
    );
  }
}

class Category extends Component {
  render() {
    return (
      <div className="row">
        <ul className="tabs horizontal_scroll">
          <li
            onClick={() => {
              this.props.fetch_product(0);
            }}
          >
            <div className="product-details">
              <h6>All</h6>
            </div>
          </li>

          {this.props.category.length > 0 ? (
            this.props.category.map((item, index) => {
              return (
                <li
                  onClick={() => {
                    this.props.fetch_product(item.id);
                  }}
                >
                  <div className="product-details">
                    <h6>{item.name}</h6>
                  </div>
                </li>
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
    );
  }
}

class Products extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tabs_container">
        <div className="tab_content active" data-tab="fruits">
          <div className="row">
            {this.props.data.length > 0 ? (
              this.props.data.map((item, index) => {
                return (
                  <div className="col-lg-3 d-flex" index={index}>
                    <div className="productset flex-fill">
                      <div className="productsetimg">
                        <img
                          src={item.product_img}
                          alt="img"
                          className="product_image"
                        />
                        {/* <h6>Qty: 5</h6> */}
                        <div className="check-product">
                          <i className="fa fa-check" />
                        </div>
                      </div>
                      <div className="productsetcontent">
                        <div>
                          <h4>{item.product_name}</h4>
                          <h6>Starting from {item.our_price}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Pos;
