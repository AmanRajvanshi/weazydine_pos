import React, { Component } from 'react';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
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
    // this.orderDetails();'
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
        <div id="legalcopy">
          <p class="kot_dT" style={{ fontSize: '16px' }}>
            Token For: {this.props.order.order_code}
            <br />
            KOT No: {this.props.kot}
            <br
              style={{
                marginTop: '10px',
                marginBottom: '10px',
              }}
            />
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
            <br
              style={{
                marginTop: '10px',
                marginBottom: '10px',
              }}
            />
            Date:{moment(this.props.order.created_at).format('llll')}
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
                {this.props.order.cart.map((values, index) => {
                  if (values.kot == this.props.kot || this.props.kot == 'all') {
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
                              <span>
                                {' '}
                                | Variant: {values.variant.variants_name}
                              </span>
                            ) : (
                              <></>
                            )}
                            {values.addons.length > 0 ? (
                              <span>
                                <strong> | AddOns: </strong>
                                {values.addons.map((pp) => (
                                  <span> {pp.addon_name}</span>
                                ))}
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
                  }
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
