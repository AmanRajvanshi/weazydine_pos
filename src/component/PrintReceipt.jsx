import React, { Component } from 'react';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
export class PrintReceipt extends Component {
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
    // this.orderDetails();
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
            <h2 style={{ textAlign: 'center' }}>
              {this.props.order.vendor.name}
            </h2>
          </div>
          {/* <!-- End Info --> */}
        </center>
        {/* <!-- End InvoiceTop --> */}
        <div id="mid">
          <div class="info">
            {this.props.order.vendor.address != null ? (
              <p>
                <span>{this.props.order.vendor.address}</span>
                <br />
              </p>
            ) : (
              <></>
            )}

            {this.props.order.vendor.gstin != null ? (
              <p>
                <span>
                  <center style={{ textAlign: 'center' }}>
                    GSTIN- {this.props.order.vendor.gstin}{' '}
                  </center>
                </span>
              </p>
            ) : (
              <></>
            )}

            <h3 class="new_h3">
              {this.props.order.order_type != 'TakeAway' &&
              this.props.order.order_type != 'Delivery' ? (
                <span>
                  Dine-In -{' '}
                  {this.props.order.table == null ? (
                    <span>Table Not Assigned</span>
                  ) : (
                    <span>{this.props.order.table.table_name}</span>
                  )}
                </span>
              ) : (
                <span>{this.props.order.order_type}</span>
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
                {this.props.order.user.id == 1 ||
                this.props.order.user.name == '' ? (
                  <span>N/A</span>
                ) : (
                  this.props.order.user.name
                )}
              </div>
            </div>
            <div id="name_phone">
              <div class="phone_email_head">Phone</div>
              <div class="phone_email_content">
                {this.props.order.user.id == 1 ||
                this.props.order.user.name == '' ? (
                  <span>N/A</span>
                ) : (
                  this.props.order.user.contact
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
              <div
                class="customer_order_details_content"
                style={{
                  fontSize: '0.9em',
                }}
              >
                {moment(this.props.order.created_at).format('llll')}
              </div>
            </div>
            <div id="customer_order_details">
              <div class="customer_order_details_head">Order Code</div>
              <div
                class="customer_order_details_content"
                style={{
                  fontSize: '0.9em',
                }}
              >
                {this.props.order.order_code}
              </div>
            </div>
            {/* <!-- <div id="customer_order_details">
                  <div class="customer_order_details_head">Table Number</div>
                  <div class="customer_order_details_content">221</div>
                  </div> --> */}
            <div>
              {this.props.order.transactions == undefined ? (
                <></>
              ) : (
                <div id="customer_order_details">
                  <div class="customer_order_details_head">Method</div>
                  <div
                    class="customer_order_details_content"
                    style={{
                      fontSize: '0.9em',
                    }}
                  >
                    {this.props.order.transactions.length == 1 ? (
                      <span>{this.props.order.transactions[0].txn_method}</span>
                    ) : (
                      this.props.order.transactions.map((tt) => (
                        <span>
                          {tt.txn_method} - {tt.txn_amount}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )}
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
                {this.props.order.cart.map((product, index) => (
                  <tr class="service" style={{ width: '100% !important' }}>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '2mm' }}
                      >
                        {index + 1}
                      </p>
                    </td>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '2mm' }}
                      >
                        {product.product.product_name}
                        {product.variant != null ? (
                          <span>- {product.variant.variants_name}</span>
                        ) : (
                          <></>
                        )}
                        {product.addons.length > 0 ? (
                          <span>
                            <strong> | AddOns: </strong>
                            {product.addons.map((pp) => (
                              <span>
                                {" "}{pp.addon_name} - ₹{pp.addon_price}
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
                        style={{ fontSize: '1em', marginBottom: '2mm' }}
                      >
                        {product.product_quantity}
                      </p>
                    </td>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '2mm' }}
                      >
                        {product.product_price / product.product_quantity}
                      </p>
                    </td>
                    <td class="tableitem">
                      <p
                        class="itemtext"
                        style={{ fontSize: '1em', marginBottom: '2mm' }}
                      >
                        {product.product_price}
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
                    <h2 style={{ fontSize: '2.15em', fontWeight: '300' }}>
                      Sub Total
                    </h2>
                  </td>
                  <td style={{ width: '20%' }}></td>
                  <td class="" style={{ width: '20%' }}>
                    <h2
                      style={{
                        fontSize: '14px',
                        fontWeight: '300',
                        display: 'flex',
                        justifyContent: 'end',
                      }}
                    >
                      {this.props.order.order_amount}
                    </h2>
                  </td>
                </tr>
                {this.props.order.cgst != 0 ? (
                  <tr class="tabletitle">
                    <td class="Rate" style={{ width: '60%' }}>
                      <h2 style={{ fontSize: '2.15em', fontWeight: '300' }}>
                        Tax(C.G.S.T)
                      </h2>
                    </td>
                    <td style={{ width: '20%' }}></td>
                    <td style={{ width: '20%' }}>
                      <h2
                        style={{
                          fontSize: '14px',
                          fontWeight: '300',
                          display: 'flex',
                          justifyContent: 'end',
                        }}
                      >
                        {this.props.order.cgst}
                      </h2>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                {this.props.order.sgst != 0 ? (
                  <tr class="tabletitle">
                    <td class="Rate" style={{ width: '60%' }}>
                      <h2 style={{ fontSize: '2.15em', fontWeight: '300' }}>
                        Tax(S.G.S.T)
                      </h2>
                    </td>
                    <td style={{ width: '20%' }}></td>
                    <td style={{ width: '20%' }}>
                      <h2
                        style={{
                          fontSize: '14px',
                          fontWeight: '300',
                          display: 'flex',
                          justifyContent: 'end',
                        }}
                      >
                        {this.props.order.sgst}
                      </h2>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                {this.props.order.order_discount != 0 ? (
                  <tr class="tabletitle">
                    <td class="Rate" style={{ width: '60%' }}>
                      <h2 style={{ fontSize: '2.15em', fontWeight: '300' }}>
                        Discount
                      </h2>
                    </td>
                    <td style={{ width: '20%' }}></td>
                    <td style={{ width: '20%' }}>
                      <h2
                        style={{
                          fontSize: '14px',
                          fontWeight: '300',
                          display: 'flex',
                          justifyContent: 'end',
                        }}
                      >
                        {this.props.order.order_discount}
                      </h2>
                    </td>
                  </tr>
                ) : (
                  <></>
                )}
                <tr class="tabletitle">
                  <td class="Rate" style={{ width: '60%' }}>
                    <h2 id="grandtotal" style={{ fontSize: '1.1em' }}>
                      Grand Total
                    </h2>
                  </td>
                  <td style={{ width: '15%' }}></td>
                  <td style={{ width: '25%' }}>
                    <h2
                      id="grandtotal"
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'end',
                      }}
                    >
                      ₹ {this.props.order.total_amount}
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
        {/* <div id="legalcopy">
          <p class="kot_dT" style={{fontSize:'16px'}}>
            Token For: {this.state.data.order_code}
            <br />
            Date:{moment(this.state.data.created_at).format('llll')}
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
                          {values.product_quantity}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    );
  }
}

export default PrintReceipt;
