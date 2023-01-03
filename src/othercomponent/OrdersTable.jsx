import moment from 'moment';
import React, { Component } from 'react';
import { BiRupee } from 'react-icons/bi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export class OrdersTable extends Component {
  render() {
    return (
      <InfiniteScroll
        dataLength={this.props.data.length}
        next={() => {
          this.props.fetch_order(this.props.page + 1, this.props.status);
          this.setState({
            // page: this.state.page + 1,
            loadMore: true,
          });
        }}
        hasMore={this.props.next_page !== null && this.props.data.length > 0}
        loader={
          <div className="d-flex align-items-center justify-content-center w-full">
            <Circles height="40" width="40" color="#5bc2c1" />
          </div>
        }
      >
        <table className="table  datanew">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Order Price</th>
              <th>Date</th>
              <th>Order Type</th>
              <th>Status</th>
              <th style={{ textAlign: 'end' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.order_code}</td>
                <td>{item.user.name != null ? item.user.name : 'N/A'}</td>
                <td>
                  <BiRupee />
                  {item.total_amount}
                </td>
                <td>
                  {moment(item.created_at).format('llll')}
                  {}
                </td>
                <td>
                  {item.order_type != 'TakeAway' &&
                  item.order_type != 'Delivery' ? (
                    <>Dine-In</>
                  ) : (
                    <>{item.order_type}</>
                  )}
                </td>
                <td>
                  {item.order_status == 'placed' ? (
                    <span
                      style={{
                        // color: {item.order_status == "Pending"?"red":{item.order_status == "Pending"?}"green"},
                        color: '#5BC2C1',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.order_status}
                    </span>
                  ) : item.order_status == 'ongoing' ? (
                    <span
                      style={{
                        color: '#5BC2C1',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.order_status}
                    </span>
                  ) : item.order_status == 'processed' ? (
                    <span
                      style={{
                        color: '#5BC2C1',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.order_status}
                    </span>
                  ) : item.order_status == 'completed' ? (
                    <span
                      style={{
                        color: 'green',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.order_status}
                    </span>
                  ) : (
                    <span
                      style={{
                        color: 'red',
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.order_status}
                    </span>
                  )}
                </td>
                <td
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  <Link target="_blank" to={'/orderdetails/' + item.order_code}>
                    <button
                      className="btn btn-primary"
                      style={{
                        marginRight: '10px',
                        padding: '2px 6px',
                      }}
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    );
  }
}

export default OrdersTable;
