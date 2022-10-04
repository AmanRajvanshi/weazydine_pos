import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";
import delete_icon from "../assets/images/icons/delete.svg";
import edit_icon from "../assets/images/icons/edit.svg";
import { AuthContext } from "../AuthContextProvider";
import { Bars } from "react-loader-spinner";

export class Productlist extends Component {
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
    this.fetchProducts(0, 1);
  }

  active_cat = (id) => {
    this.setState({ active_cat: id, product_loding: true });
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
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ is_loding: false });
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

        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  render() {
    return (
      <div className="main-wrapper">
        <Header />

        {this.state.is_loding ? (
          <div className="main_loader">
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
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Product List</h4>
                  <h6>Manage your products</h6>
                </div>
                <div className="page-btn">
                  <Link to="/addproduct" className="btn btn-added">
                    <img
                      src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/plus.svg"
                      alt="img"
                      className="me-1"
                    />
                    Add New Product
                  </Link>
                </div>
              </div>
              <Category
                category={this.state.category}
                fetch_product={this.active_cat}
              />
              <div className="card">
                {this.state.products.length > 0 ? (
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table  datanew">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Market Price</th>
                            <th>Our Price</th>
                            <th>Category</th>
                            <th>Veg/NonVeg</th>
                            <th>Status</th>
                            <th style={{ textAlign: "end" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.products.map((item, index) => {
                            return (
                              <tr>
                                <td className="productimgname">
                                  <Link
                                    to="/productdetails/1"
                                    className="product-img"
                                  >
                                    <img src={item.product_img} alt="product" />
                                  </Link>
                                  <Link to="/productdetails/1">
                                    {item.product_name}
                                  </Link>
                                </td>
                                <td>
                                  <BiRupee />
                                  {item.market_price}
                                </td>
                                <td>
                                  <BiRupee />
                                  {item.our_price}
                                </td>
                                <td>{item.category.name}</td>
                                <td>
                                  {item.is_veg ? <>Veg</> : <> Non-Veg</>}
                                </td>

                                <td>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="status_1"
                                      className="check"
                                      isChecked
                                    />
                                    <label
                                      htmlFor="status_1"
                                      className="checktoggle"
                                    ></label>
                                  </div>
                                </td>
                                <td style={{ textAlign: "end" }}>
                                  <a className="me-3">
                                    <img src={edit_icon} alt="img" />
                                  </a>
                                  <a
                                    className="confirm-text"
                                    href="javascript:void(0);"
                                  >
                                    <img src={delete_icon} alt="img" />
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <h4>No Products Found</h4>
                )}
              </div>
            </div>
          </div>
        )}
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
                    <h6>
                      {item.name}({item.products_count}){" "}
                    </h6>
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

export default Productlist;
