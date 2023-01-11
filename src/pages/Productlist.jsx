import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import delete_icon from '../assets/images/icons/delete.svg';
import edit_icon from '../assets/images/icons/edit.svg';
import { AuthContext } from '../AuthContextProvider';
import { Bars, Circles } from 'react-loader-spinner';
import { Toggle } from '../othercomponent/Toggle';
import { QRToggle } from '../othercomponent/QRToggle';
import Skeletonloader from '../othercomponent/Skeletonloader';
import no_img from '../assets/images/no_products_found.png';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet';

export class Productlist extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      products: [],
      active_cat: 0,
      is_loding: true,
      category_loding: true,
      type: 'product',
      next_page: '',
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProducts(0, this.state.type, 1);
  }

  active_cat = (id) => {
    this.setState({ is_loding: true });
    this.setState({ active_cat: id, product_loding: true });
    this.fetchProducts(id, this.state.type, 1);
  };

  fetchProducts = (category_id, type, page) => {
    fetch(global.api + 'vendor_get_vendor_product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        vendor_category_id: category_id,
        product_type: type,
        page: page,
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
          this.setState({
            next_page: json.data.next_page_url,
          });
          if (page == 1) {
            this.setState({ products: json.data.data });
          } else {
            {
              this.state.next_page
                ? this.setState({
                    products: [...this.state.products, ...json.data.data],
                    page: this.state.page + 1,
                  })
                : this.setState({
                    products: json.data.data,
                  });
            }
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
        if (json.status) {
          this.setState({ category: json.data });
        } else {
          this.setState({ category: [] });
        }

        return json;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ category_loding: false });
      });
  };

  delete_product = (id) => {
    fetch(global.api + 'update_status_product_offer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        action_id: id,
        type: 'product',
        status: 'delete',
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          var msg = json.msg;
          // Toast.show(msg);
          toast.success(msg);
        } else {
          toast.success('Product Deleted Successfully');
          this.fetchProducts(this.state.active_cat, this.state.type, 1);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
      });
  };

  search = (e) => {
    if (e.target.value.length > 1) {
      this.setState({ products: [], is_loding: true });
      fetch(global.api + 'search_product', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.context.token,
        },
        body: JSON.stringify({
          search_query: e.target.value,
          status: 'all',
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            var msg = json.msg;
            toast.success(msg);
            this.setState({ products: [] });
          } else {
            this.setState({ products: json.data });
          }
          this.setState({ is_loding: false });
          return json;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    } else {
      this.fetchProducts(this.state.active_cat, this.state.type, 1);
    }
  };

  render() {
    return (
      <>
        <Helmet>
          <title>Product List | Weazy Dine</title>
        </Helmet>
        <div className="main-wrapper">
          <Header />
          <div className="page-wrapper">
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>Product List</h4>
                </div>
                <div className="page-btn">
                  <Link to="/addproduct" className="btn btn-added">
                    Add New Product
                  </Link>
                </div>
              </div>
              {this.state.category_loding ? (
                <Skeletonloader count={1} height={50} />
              ) : (
                <Category
                  category={this.state.category}
                  active_cat={this.state.active_cat}
                  fetch_product={this.active_cat}
                />
              )}

              <div className="comp-sec-wrapper mt-20">
                <section className="comp-section">
                  <div className="row pb-4">
                    <div className="col-md-9">
                      <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({ is_loading: true });
                              this.fetchProducts(
                                this.state.active_cat,
                                'product',
                                1
                              );
                            }}
                          >
                            Product
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#solid-rounded-justified-tab1"
                            data-bs-toggle="tab"
                            onClick={() => {
                              this.setState({ is_loading: true });
                              this.fetchProducts(
                                this.state.active_cat,
                                'package',
                                1
                              );
                            }}
                          >
                            Combos
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-3">
                      <input
                        type={'text'}
                        className={'form-control'}
                        onChange={(e) => {
                          this.search(e);
                        }}
                        placeholder={'Search Product'}
                      />
                    </div>
                  </div>
                </section>
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
                <>
                  {this.state.products.length > 0 ? (
                    <>
                      <div className="card">
                        <div className="card-body">
                          <div className="table-responsive">
                            <InfiniteScroll
                              dataLength={this.state.products.length}
                              next={() => {
                                this.fetchProducts(
                                  this.state.active_cat,
                                  this.state.type,
                                  this.state.page + 1
                                );
                                this.setState({
                                  // page: this.state.page + 1,
                                  loadMore: true,
                                });
                              }}
                              hasMore={
                                this.state.next_page !== null &&
                                this.state.products.length > 0
                              }
                              loader={
                                <div className="d-flex align-items-center justify-content-center w-full mt-xl">
                                  <Circles
                                    height="40"
                                    width="40"
                                    color="#5bc2c1"
                                  />
                                </div>
                              }
                            >
                              <table className="table  datanew">
                                <thead>
                                  <tr>
                                    <th>S.no</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Veg/NonVeg</th>
                                    <th>QR Enable</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'end' }}>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.products.map((item, index) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td className="productimgname">
                                          <Link
                                            to={'/productdetails/' + item.id}
                                            className="product-img"
                                          >
                                            <img
                                              src={item.product_img}
                                              alt="product"
                                              className="product-img"
                                            />
                                          </Link>
                                          <Link
                                            to={'/productdetails/' + item.id}
                                          >
                                            {item.product_name}
                                          </Link>
                                        </td>
                                        <td>
                                          <BiRupee />
                                          {item.our_price}
                                        </td>
                                        <td>{item.category.name}</td>
                                        <td>{item.type}</td>
                                        <td>
                                          {item.is_veg ? (
                                            <>Veg</>
                                          ) : (
                                            <> Non-Veg</>
                                          )}
                                        </td>

                                        <td>
                                          <Toggle
                                            id={index + 'one'}
                                            status={item.qr_enable}
                                            product_id={item.id}
                                            action_type="qr"
                                          />
                                        </td>

                                        <td>
                                          <Toggle
                                            id={index + 'two'}
                                            status={item.status}
                                            product_id={item.id}
                                            action_type="product"
                                          />
                                        </td>
                                        <td style={{ textAlign: 'end' }}>
                                          <Link
                                            target={'_blank'}
                                            to={'/editproduct/' + item.id}
                                            className="me-3"
                                          >
                                            <img src={edit_icon} alt="img" />
                                          </Link>
                                          <a
                                            className="confirm-text"
                                            // onClick={() => {
                                            //   this.delete_product(item.id);
                                            // }}
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
                                                  this.delete_product(item.id);
                                                }
                                              })
                                            }
                                          >
                                            <img src={delete_icon} alt="img" />
                                          </a>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </InfiniteScroll>
                          </div>
                        </div>
                      </div>
                    </>
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
                      <h4>No Products Found</h4>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

class Category extends Component {
  render() {
    return (
      <>
        {this.props.category.length > 0 && (
          <ul className="tabs horizontal_scroll">
            <li
              onClick={() => {
                this.props.fetch_product(0);
              }}
            >
              <div
                className={
                  'product-details' +
                  (this.props.active_cat == 0 ? ' active' : '')
                }
                href="#solid-rounded-justified-tab1"
                data-bs-toggle="tab"
              >
                <h6>All</h6>
              </div>
            </li>
            {this.props.category.map((item, index) => {
              return (
                <li
                  onClick={() => {
                    this.props.fetch_product(item.id);
                  }}
                >
                  <div
                    className={
                      'product-details' +
                      (this.props.active_cat == item.id ? ' active' : '')
                    }
                    href="#solid-rounded-justified-tab1"
                    data-bs-toggle="tab"
                  >
                    <h6>
                      {item.name}({item.products_count}){' '}
                    </h6>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }
}

export default Productlist;
