import React, { Component } from 'react';
import { Header } from '../othercomponent/Header';

export class Newtableorder extends Component {
  state = {
    cart: [
      {
        id: 1,
        product: {
          id: 1,
          product_name: 'Chicken Burger',
          product_price: 100,
          product_image: 'https://picsum.photos/200/300',
        },
        product_quantity: 1,
        product_price: 100,
        variant: {
          id: 1,
          variants_name: 'Small',
        },
        addons: [
          {
            id: 1,
            addon_name: 'Cheese',
          },
          {
            id: 2,
            addon_name: 'Tomato',
          },
        ],
      },
    ],
    discount_mode: 'fixed',
  };
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>
                  Table Order{' '}
                  <span className="text-primary">WD-12124234123</span>
                </h4>
              </div>
              <a
                href="javascript:void(0);"
                className="btn btn-primary btn-sm me-2"
              >
                Generate Bill
              </a>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="card-sales-split">
                  <h2>
                    Table Number :{' '}
                    <span className="text-primary font-weight-normal">
                      2212121
                    </span>
                  </h2>
                  <h2>
                    Date :{' '}
                    <span className="text-primary font-weight-normal">
                      Thu, 10 Dec 2020 12:00:00
                    </span>
                  </h2>
                  <h2>
                    Customer Name :{' '}
                    <span className="text-primary font-weight-normal">
                      Thu, 10 Dec 2020 12:00:00
                    </span>
                  </h2>
                  <h2>
                    Customer Number :{' '}
                    <span className="text-primary font-weight-normal">
                      Thu, 10 Dec 2020 12:00:00
                    </span>
                  </h2>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Discount Type</label>
                      <ul className="nav nav-pills">
                        <li className="nav-item me-2">
                          <a
                            className={
                              'nav-link ' +
                              (this.state.discount_mode == 'fixed'
                                ? 'active'
                                : '')
                            }
                            onClick={() => {
                              this.setState({
                                discount_mode: 'fixed',
                              });
                            }}
                          >
                            Fixed
                          </a>
                        </li>
                        <li className="nav-item me-2">
                          <a
                            className={
                              'nav-link ' +
                              (this.state.discount_mode != 'fixed'
                                ? 'active'
                                : '')
                            }
                            onClick={() => {
                              this.setState({
                                discount_mode: 'percentage',
                              });
                            }}
                          >
                            Percentage
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Discount</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Shipping</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Status</label>
                      <select className="select-container">
                        <option>Choose Status</option>
                        <option>Completed</option>
                        <option>Inprogress</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <section
                      className="item-section"
                      style={{
                        padding: '20px 0 0!important',
                      }}
                    >
                      <div className="item_row">
                        <div className="sno_column_heading">No.</div>
                        <div className="item_name_column_heading">Item</div>
                        <div className="price_column_heading">Price</div>
                        <div className="qty_column_heading">Qty.</div>
                        <div className="amount_column_heading">Amt.</div>
                      </div>
                      {this.state.cart.map((item, index) => {
                        return (
                          <div className="single_item_row">
                            <div className="sno_column">{index + 1}</div>
                            <div className="item_name_column">
                              <span
                                style={{
                                  fontWeight: '600px',
                                  marginRight: '10px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  this.setState({
                                    edit_quantity_modal: true,
                                    edit_quantity_name:
                                      item.product.product_name,
                                    edit_quantity_initial:
                                      item.product_quantity,
                                    edit_cart_id: item.id,
                                  });
                                }}
                              >
                                {item.product.product_name}
                              </span>

                              {item.variant != null && (
                                <span>
                                  <strong>Variant</strong> -{' '}
                                  {item.variant.variants_name}
                                </span>
                              )}

                              <div className="media-body-cart">
                                {item.addons.length > 0 && (
                                  <>
                                    <strong>AddOns: </strong>
                                    {item.addons.map((items) => {
                                      return (
                                        <span className="addon_text_order">
                                          {items.addon_name}
                                        </span>
                                      );
                                    })}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="price_column">
                              {item.product_price / item.product_quantity}
                            </div>
                            <div className="qty_column">
                              x {item.product_quantity}
                            </div>
                            <div className="amount_column">
                              {item.product_price}
                            </div>
                          </div>
                        );
                      })}
                    </section>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 ">
                    <div className="total-order w-100 max-widthauto m-auto mb-4">
                      <ul>
                        <li>
                          <h4>Items Total</h4>
                          <h5>$ 0.00 (0.00%)</h5>
                        </li>
                        <li>
                          <h4 className="text-success">
                            Taxes and Other Charges{' '}
                          </h4>
                          <h5>$ 0.00</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="total-order w-100 max-widthauto m-auto mb-4">
                      <ul>
                        <li>
                          <h4 className="text-danger">Discount</h4>
                          <h5>$ 0.00</h5>
                        </li>
                        <li className="total">
                          <h4>Grand Total</h4>
                          <h5>$ 0.00</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Generate Bill
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Newtableorder;
