import React, { Component } from 'react';

export class Print extends Component {
  render() {
    return (
      <>
        <div id="invoice-POS">
          <center id="top">
            <div className="info">
              <h2>Pyramid Dehradun</h2>
            </div>
            {/*End Info*/}
          </center>
          {/*End InvoiceTop*/}
          <div id="mid">
            <div className="info">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Distinctio dolore adipisci ipsum assumenda laboriosam
                voluptatem!
                <br />
                <span>GST No.: 290348023</span>
                <br />
                <span>VAT No.: 48903570329487</span>
                <br />
              </p>
              <h3 className="new_h3">DineIn</h3>
            </div>
          </div>
          {/* customer-details */}
          <div id="customer_details">
            <h3 className="customer_details_h3">---Customer Details---</h3>
            <div className="name_phone_main">
              <div id="name_phone">
                <div className="phone_email_head">Name</div>
                <div className="phone_email_content">klejhfwlef</div>
              </div>
              <div id="name_phone">
                <div className="phone_email_head">Phone</div>
                <div className="phone_email_content">9845798887</div>
              </div>
            </div>
          </div>
          {/* end-customer-details */}
          {/* customer_order_details */}
          <div id="customer_details">
            <div className="customer_order_details_main">
              <div id="customer_order_details">
                <div className="customer_order_details_head">Order Time</div>
                <div className="customer_order_details_content">
                  12/12/2022 09:45PM
                </div>
              </div>
              <div id="customer_order_details">
                <div className="customer_order_details_head">Order Number</div>
                <div className="customer_order_details_content">jsdfhsdjf</div>
              </div>
              <div id="customer_order_details">
                <div className="customer_order_details_head">Table Number</div>
                <div className="customer_order_details_content">221</div>
              </div>
              <div id="customer_order_details">
                <div className="customer_order_details_head">
                  Payment Method
                </div>
                <div className="customer_order_details_content">COD</div>
              </div>
              <div id="customer_order_details">
                <div className="customer_order_details_head">
                  Pay On Delivery
                </div>
                <div className="customer_order_details_content">1211</div>
              </div>
            </div>
          </div>
          {/* end_customer_order_details */}
          {/*End Invoice Mid*/}
          <div id="bot">
            <h3>---GST Invoice---</h3>
            <div id="table">
              <table>
                <tbody>
                  <tr className="tabletitle">
                    <td className="count">
                      <h2>#</h2>
                    </td>
                    <td className="item">
                      <h2>Item</h2>
                    </td>
                    <td className="Hours">
                      <h2>Qty</h2>
                    </td>
                    <td className="Rate">
                      <h2>Rate</h2>
                    </td>
                    <td className="Amount">
                      <h2>Amount</h2>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <p className="itemtext">1</p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">Butter Roll</p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">5</p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">$375.00</p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext">$375.00</p>
                    </td>
                  </tr>
                  <tr className="tabletitle">
                    <td />
                    <td className="Rate">
                      <h2>Sub Total</h2>
                    </td>
                    <td />
                    <td />
                    <td className="payment">
                      <h2>$222</h2>
                    </td>
                  </tr>
                  <tr className="tabletitle">
                    <td />
                    <td className="Rate">
                      <h2>tax(C.G.S.T)</h2>
                    </td>
                    <td />
                    <td />
                    <td className="payment">
                      <h2>$419.25</h2>
                    </td>
                  </tr>
                  <tr className="tabletitle">
                    <td />
                    <td className="Rate">
                      <h2>tax(S.G.S.T)</h2>
                    </td>
                    <td />
                    <td />
                    <td className="payment">
                      <h2>$419.25</h2>
                    </td>
                  </tr>
                  <tr className="tabletitle">
                    <td />
                    <td className="Rate">
                      <h2>Discount</h2>
                    </td>
                    <td />
                    <td />
                    <td className="payment">
                      <h2>$3,644.25</h2>
                    </td>
                  </tr>
                  <tr className="tabletitle">
                    <td />
                    <td className="Rate">
                      <h2>Grand Total</h2>
                    </td>
                    <td />
                    <td />
                    <td className="payment">
                      <h2>$3,644.25</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/*End Table*/}
            <div id="legalcopy">
              <p className="legal">
                <strong>Thank you for your business!</strong>
              </p>
            </div>
          </div>
          {/*End InvoiceBot*/}
          {/*KOT start*/}
          <div id="legalcopy">
            <p className="kot_dT">Token : #8883 Date: 11/11/11 11:11PM</p>
          </div>
          <div id="bot" className="mt-10">
            <div id="table">
              <table>
                <tbody>
                  <tr className="tabletitle">
                    <td className="count text-center">
                      <h2>#</h2>
                    </td>
                    <td className="item text-center">
                      <h2>Item</h2>
                    </td>
                    <td className="Hours text-center">
                      <h2>Qty</h2>
                    </td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem">
                      <p className="itemtext text-center">1</p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext text-center">Butter Roll</p>
                    </td>
                    <td className="tableitem">
                      <p className="itemtext text-center">5</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/*KOT End*/}
        </div>
        {/*End Invoice*/}
      </>
    );
  }
}

export default Print;
