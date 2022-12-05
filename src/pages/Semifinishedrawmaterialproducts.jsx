import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import delete_icon from '../assets/images/icons/delete.svg';
import edit_icon from '../assets/images/icons/edit.svg';
import eye_icon from '../assets/images/icons/eye.svg';
import { AuthContext } from '../AuthContextProvider';
import { Bars } from 'react-loader-spinner';
import { Toggle } from '../othercomponent/Toggle';
import Skeletonloader from '../othercomponent/Skeletonloader';
import no_img from '../assets/images/no_products_found.png';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class Semifinishedrawmaterialproducts extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = (id, page) => {
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
        console.warn(json);
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

  delete_product = (id) => {
    fetch(global.api + 'delete_inventory_product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        product_id: id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // console.warn("delete_product",json)
        if (!json.status) {
          var msg = json.msg;
          // Toast.show(msg);
          toast.success(msg);
        } else {
          toast.success('Product Deleted Successfully');
          this.fetchProducts(this.state.active_cat, 1);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isloading: false });
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
                  <h4>Semi Finished Raw Material Products</h4>
                </div>
                <div className="page-btn">
                  <Link to="/addsemifinishedrawmaterialproducts">
                    <a className="btn btn-added">
                      <img
                        src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/plus.svg"
                        alt="img"
                        className="me-1"
                      />
                      Add New Product
                    </a>
                  </Link>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table  datanew">
                      <thead>
                        <tr>
                          <th>S.no</th>
                          <th>Product Name</th>
                          <th>Current Stock</th>
                          <th>Expiry</th>
                          <th style={{ textAlign: 'end' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Product Name</td>
                          <td>12</td>
                          <td>1 Day</td>
                          <td style={{ textAlign: 'end' }}>
                            <img
                              src={eye_icon}
                              alt="img"
                              className="mx-2 cursor_pointer"
                              onClick={() => {
                                this.setState({
                                  openedit: true,
                                });
                              }}
                            />
                            <Link to="/editsemifinishedrawmaterialproducts/1">
                              <img
                                src={edit_icon}
                                alt="img"
                                className="mx-2 cursor_pointer"
                              />
                            </Link>
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
                                  confirmButtonText: 'Yes, delete it!',
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    // this.delete_product(item.id);
                                  }
                                })
                              }
                            >
                              <img src={delete_icon} alt="img" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Semifinishedrawmaterialproducts;
