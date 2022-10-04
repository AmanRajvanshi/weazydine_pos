import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../othercomponent/Header";
import { BiRupee } from "react-icons/bi";

import delete_icon from "../assets/images/icons/delete.svg";
import edit_icon from "../assets/images/icons/edit.svg";
import { AuthContext } from "../AuthContextProvider";
import moment from "moment";

class Orderlist extends Component {
  static contextType = AuthContext;
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      is_loading: true,
      load_data: false,
      page: 1,

    }

  }
  componentDidMount() {
    this.fetch_order(1);
  }
    fetch_order = (page_id) => {

      fetch(global.api + 'get_orders_vendor', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': this.context.token,
          },
          body: JSON.stringify({
              page: page_id

          })
      }).then((response) => response.json())
          .then((json) => {
              if (!json.status) {


              }
              else {
                  // var refresh = setInterval(() => {
                  //     this.fetch_order(1);
                  // }, 20000);
                  this.setState({ data: json.data.data });
                  // if (json.data.data.length >= 0) {
                  //     clearInterval(refresh);
                  // }
                  // this.props.navigation.navigate("More")

              }
              this.setState({ is_loading: false })
              return json;
          }).catch((error) => {
              console.error(error);
          }).finally(() => {
           

          });



  }

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Orders</h4>
              </div>
            </div>
            <div className="comp-sec-wrapper">
              <section className="comp-section">
                <div className="row pb-4">
                  <div className="col-md-12">
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                        >
                          Home
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
            {
              (!this.state.is_loading)?
<div className="card">
  {
    this.state.data.length>0?
             <div className="card-body">
                <div className="table-responsive">
                  <table className="table  datanew">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Order Price</th>
                        <th>Date</th>
                        <th>Order Type</th>
                        <th>Status</th>
                        <th style={{ textAlign: "end" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.data.map((item, index) => (
                          <tr>
                          <Link to="/orderdetails">
                            <td>{item.order_code}</td>
                          </Link>
                          <td>{item.user.name}</td>
                          <td>{item.total_amount}</td>
                          <td>{item.created_at}</td>
                          <td>{ (item.order_type != 'TakeAway' || item.order_type != 'Delivery')?
                          <>Dine-In</>:
                          <>{item.order_type}</>
                        }</td>
                          <td>{item.order_status}</td>
                          <td style={{ display: "flex", justifyContent: "end" }}>
                            View
                          </td>
                        </tr>
                        ))
                      }
                     
                    </tbody>
                  </table>
                </div>
              </div>
              :
              <>no data found</>
                          }
            </div>:
            <>No Loading</>
            }
            
          </div>
        </div>
      </div>
    );
  }
}

export default Orderlist;
