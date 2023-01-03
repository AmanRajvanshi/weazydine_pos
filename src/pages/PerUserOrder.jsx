import React, { Component } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import { Bars } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
import no_order from '../assets/images/no_orders.webp';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import OrdersTable from '../othercomponent/OrdersTable';

class PerUserOrder extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      is_loading: true,
      load_data: false,
      page: 1,
      value: [new Date(), new Date()],
      start_date: new Date(),
      end_date: new Date(),
      user_data: [],
      last_order_date: '',
    };
  }

  componentDidMount() {
    this.fetch_order(1, '');
  }

  fetch_order = (page_id, status) => {
    fetch(global.api + 'get_order_user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page_id,
        user_uu_id: this.props.id,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          if (page_id == 1) {
            this.setState({
              data: [],
              is_loading: false,
              user_data: [],
              last_order_date: '',
            });
          }
        } else {
          this.setState({
            next_page: json.data.next_page_url,
            user_data: json.user,
          });
          if (page_id == 1) {
            this.setState({
              data: json.data.data,
              last_order_date: moment(json.data.data[0].created_at).format(
                'lll'
              ),
            });
          } else {
            {
              this.state.next_page
                ? this.setState({
                    data: [...this.state.data, ...json.data.data],
                    page: this.state.page + 1,
                  })
                : this.setState({
                    data: json.data.data,
                  });
            }
          }
        }
        this.setState({ is_loading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          {!this.state.is_loading ? (
            <div className="content">
              <div className="page-header">
                <div className="page-title">
                  <h4>
                    Order Details for :{' '}
                    <span
                      style={{
                        textTransform: 'capitalize',
                      }}
                    >
                      {this.state.user_data.name}{' '}
                    </span>
                    <span
                      className="text-muted"
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      ({this.state.user_data.contact})
                    </span>
                  </h4>
                </div>
                <div className="page-btn">
                  <h4>
                    Last Order was{' '}
                    {moment(this.state.last_order_date).fromNow()}
                  </h4>
                </div>
              </div>
              <div className="card">
                {this.state.data.length > 0 ? (
                  <div className="card-body">
                    <div className="table-responsive">
                      <OrdersTable
                        fetch_order={this.fetch_order}
                        next_page={this.state.next_page}
                        page={this.state.page}
                        status={this.state.status}
                        data={this.state.data}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="page-wrapper">
                    <div
                      className="content"
                      style={{
                        height: '60vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        margin: '40px 0',
                      }}
                    >
                      <img src={no_order} alt="" />
                      <h3>No Customer Found</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className="main_loader"
              style={{
                height: '80vh',
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
          )}
        </div>
      </div>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  return <PerUserOrder {...props} {...useParams()} navigate={abcd} />;
}

export default Navigate;
