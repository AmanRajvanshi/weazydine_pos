import React, { Component } from 'react';
import { AuthContext } from '../AuthContextProvider';

export class PrintKot extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      vendor: [],
      user: [],
      cart: [],
      transactions: [],
    };
  }

  componentDidMount() {
    this.orderDetails();
  }

  orderDetails = () => {
    fetch(global.api + 'get_orders_details_vendor', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        order_code: this.props.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
        } else {
          this.setState({
            data: json.data[0],
            cart: json.data[0].cart,
            user: json.data[0].user,
            vendor: json.data[0].vendor,
            transactions: json.data[0].transactions,
          });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };
  render() {
    return (
      <div id="invoice-POS">
        <center id="top">
          <div class="info">
            <h2 style={{ textAlign: 'center' }}>{this.state.vendor.name}</h2>
          </div>
          {/* <!-- End Info --> */}
        </center>
        {/* <!-- End InvoiceTop --> */}
        <div id="mid">
          <div class="info">
            {this.state.vendor.address != null ? (
              <p>
                <span>{this.state.vendor.address}</span>
                <br />
              </p>
            ) : (
              <></>
            )}

            {this.state.vendor.gstin != null ? (
              <p>
                <span>
                  <center style={{ textAlign: 'center' }}>
                    GSTIN- {this.state.vendor.gstin}{' '}
                  </center>
                </span>
              </p>
            ) : (
              <></>
            )}

            <h3 class="new_h3">
              {this.state.order_type != 'TakeAway' &&
              this.state.order_type != 'Delivery' ? (
                <span> Dine In</span>
              ) : (
                this.state.order_type
              )}
            </h3>
          </div>
        </div>

        {/* <!-- {/ customer-details /} --> */}
        <div id="customer_details">
          <h3 class="customer_details_h3">------Customer Details------</h3>
          <div class="name_phone_main">
            <div id="name_phone">
              <div class="phone_email_head">Name</div>
              <div class="phone_email_content">
                {this.state.user.id == 1 || this.state.user.name == '' ? (
                  <span>N/A</span>
                ) : (
                  this.state.user.name
                )}
              </div>
            </div>
            <div id="name_phone">
              <div class="phone_email_head">Phone</div>
              <div class="phone_email_content">
                {this.state.user.id == 1 || this.state.user.name == '' ? (
                  <span>N/A</span>
                ) : (
                  this.state.user.contact
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- {/ end-customer-details /} --> */}
        {/* <!-- {/ customer_order_details /} --> */}
        <div id="customer_details">
          <div class="customer_order_details_main">
            <div id="customer_order_details">
              <div class="customer_order_details_head">Order Time</div>
              <div class="customer_order_details_content">
                {this.state.data.created_at}
              </div>
            </div>
            <div id="customer_order_details">
              <div class="customer_order_details_head">Order Code</div>
              <div class="customer_order_details_content">
                {this.state.data.order_code}
              </div>
            </div>
            {/* <!-- <div id="customer_order_details">
                  <div class="customer_order_details_head">Table Number</div>
                  <div class="customer_order_details_content">221</div>
                  </div> --> */}
            <div>
              <div id="customer_order_details">
                <div class="customer_order_details_head">Method</div>
                <div class="customer_order_details_content">
                  {this.state.transactions.length == 1 ? (
                    <span>{this.state.transactions[0].txn_method}</span>
                  ) : (
                    this.state.transactions.map((tt) => (
                      <span>
                        {tt.txn_method} - {tt.txn_amount}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end_customer_order_details  --> */}
        {/* <!-- End Invoice Mid --> */}
        <div id="bot">
          {/* <!-- if gst!=null --> */}
          {/* <!-- <h3>---GST Invoice---</h3> --> */}
          <h3 class="invoice_heading">---Invoice---</h3>
          <div id="table">
            <table>
              <tbody>
                <tr class="tabletitle" style={{ width: '100% !important' }}>
                  <td class="count" style={{ width: '5%' }}>
                    <h4 class="table_data">#</h4>
                  </td>
                  <td class="item" style={{ width: '50%' }}>
                    <h4 class="table_data">Item</h4>
                  </td>
                  <td class="Hours" style={{ width: '15%' }}>
                    <h4 class="table_data">Qty</h4>
                  </td>
                  <td class="Rate" style={{ width: '15%' }}>
                    <h4 class="table_data">Rate</h4>
                  </td>
                  <td class="Amount" style={{ width: '15%' }}>
                    <h4 class="table_data">Amt.</h4>
                  </td>
                </tr>
                {this.state.cart.map((product, index) => (
                  <tr class="service" style={{ width: '100% !important' }}>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '5mm' }}
                      >
                        {index + 1}
                      </p>
                    </td>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '5mm' }}
                      >
                        {product.product.product_name}
                        {product.variant != null ? (
                          <span>- {product.variant.variants_name}</span>
                        ) : (
                          <></>
                        )}
                        {product.addons.length > 0 ? (
                          <span>
                            <strong>AddOns: </strong>
                            {product.addons.map((pp) => (
                              <span>
                                {pp.addon_name} - {pp.addon_price}
                              </span>
                            ))}
                          </span>
                        ) : (
                          <></>
                        )}
                      </p>
                    </td>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '5mm' }}
                      >
                        {product.quantity}
                      </p>
                    </td>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '5mm' }}
                      >
                        {product.product.product_price}
                      </p>
                    </td>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '5mm' }}
                      >
                        {product.product.product_price * product.quantity}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="table">
            <table>
              <tbody>
                <tr class="tabletitle">
                  <td class="Rate" style={{ width: '60%' }}>
                    <h2 style={{ fontSize: '1.05em', fontWeight: '300' }}>
                      Sub Total
                    </h2>
                  </td>
                  <td style={{ width: '20%' }}></td>
                  <td class="payment" style={{ width: '20%' }}>
                    <h2 style={{ fontSize: '1.05em', fontWeight: '300' }}>
                      {this.state.data.order_amount}
                    </h2>
                  </td>
                </tr>
                {this.state.data.cgst != 0 ? (
                  <tr class="tabletitle">
                    <td class="Rate" style={{ width: '60%' }}>
                      <h2 style={{ fontSize: '1.05em', fontWeight: '300' }}>
                        Tax(C.G.S.T)
                      </h2>
                    </td>
                    <td style={{ width: '20%' }}></td>
                    <td class="payment" style={{ width: '20%' }}>
                      <h2 style={{ fontSize: '1.05em', fontWeight: '300' }}>
                        {this.state.data.cgst}
                      </h2>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                {this.state.data.sgst != 0 ? (
                  <tr class="tabletitle">
                    <td class="Rate" style={{ width: '60%' }}>
                      <h2 style={{ fontSize: '1.05em', fontWeight: '300' }}>
                        Tax(S.G.S.T)
                      </h2>
                    </td>
                    <td style={{ width: '20%' }}></td>
                    <td class="payment" style={{ width: '20%' }}>
                      <h2 style={{ fontSize: '1.05em', fontWeight: '300' }}>
                        {this.state.data.sgst}
                      </h2>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                {this.state.data.discount != 0 ? (
                  <tr class="tabletitle">
                    <td class="Rate" style={{ width: '60%' }}>
                      <h2 style={{ fontSize: '1.05em', fontWeight: '300' }}>
                        Discount
                      </h2>
                    </td>
                    <td style={{ width: '20%' }}></td>
                    <td class="payment" style={{ width: '20%' }}>
                      <h2 style={{ fontSize: '1.05em', fontWeight: '300' }}>
                        {this.state.data.discount}
                      </h2>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                <tr class="tabletitle">
                  <td class="Rate" style={{ width: '60%' }}>
                    <h2 id="grandtotal" style={{ fontSize: '1.2em' }}>
                      Grand Total
                    </h2>
                  </td>
                  <td style={{ width: '15%' }}></td>
                  <td class="payment" style={{ width: '25%' }}>
                    <h2
                      id="grandtotal"
                      style={{ fontSize: '1.2em', fontWeight: 'bold' }}
                    >
                      ₹ {this.state.data.total_amount}
                    </h2>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!-- End Table --> */}
          <div id="legalcopy">
            <p class="legal">Thank's Visit Again!</p>
          </div>
        </div>
        <div id="legalcopy">
          <p class="kot_dT kot_heading">
            Token For: {this.state.data.order_code}
            <br />
            Date:{this.state.data.created_at}
          </p>
        </div>
        <div id="bot" class="mt-10">
          <div id="table">
            <table>
              <tbody>
                <tr class="tabletitle">
                  <td class="count text-center">
                    <h4 class="table_data">#</h4>
                  </td>
                  <td class="item text-center">
                    <h4 class="table_data">Item</h4>
                  </td>
                  <td class="Hours text-center">
                    <h4 class="table_data">Qty</h4>
                  </td>
                </tr>
                {this.state.cart.map((values, index) => {
                  return (
                    <tr class="service">
                      <td
                        class="tableitem"
                        style={{
                          textAlign: 'center',
                          width: '20%',
                        }}
                      >
                        <p class="itemtext" style={{ fontSize: '1em' }}>
                          {index + 1}
                        </p>
                      </td>
                      <td
                        class="tableitem"
                        style={{
                          textAlign: 'center',
                          width: '60%',
                        }}
                      >
                        <p class="itemtext" style={{ fontSize: '1em' }}>
                          {values.product.product_name}
                          {values.variant != null ? (
                            <span>- {values.variant.variants_name}</span>
                          ) : (
                            <></>
                          )}
                          {values.addons.length > 0 ? (
                            <span>
                              <strong>AddOns:</strong>
                              {values.addons.map((value) => {
                                return <span>{value.addons_name}</span>;
                              })}
                            </span>
                          ) : (
                            <></>
                          )}
                        </p>
                      </td>
                      <td
                        class="tableitem"
                        style={{
                          textAlign: 'center',
                          width: '20%',
                        }}
                      >
                        <p class="itemtext" style={{ fontSize: '1em' }}>
                          {values.quantity}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PrintKot;
