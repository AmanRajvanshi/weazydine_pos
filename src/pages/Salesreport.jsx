import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../othercomponent/Header';
import { BiRupee } from 'react-icons/bi';
import { Bars } from 'react-loader-spinner';
import { AuthContext } from '../AuthContextProvider';
import moment from 'moment';
import no_order from '../assets/images/no_orders.webp';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
  CSVExport,
  ColumnToggle,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

class Salesreport extends Component {
  static contextType = AuthContext;
  state = {
    data: [],
    is_loading: true,
    load_data: false,
    page: 1,
    isOpen: false,
    from: new Date(),
    to: new Date(),
    range: 'today',
    last_page: 1,
    total: 0,
    online: 0,
    cash: 0,
    weazypay: 0,
  };

  handleSelect(ranges) {
  }

  componentDidMount() {
    this.fetch_order(1, '', 'today');
  }

  fetch_order = (page_id, status, range) => {
    fetch(global.api + 'fetch_sales_reports', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page_id,
        range: range,
        start_date: this.state.from,
        end_date: this.state.to,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          if (page_id == 1) {
            this.setState({ data: [], is_loading: false });
          }
        } else {
          this.setState({
            total: json.total_earnning,
            online: json.online,
            cash: json.cashsale,
            weazypay: json.weazypay,
          });
          this.setState({
            data: json.data.data,
            last_page: json.data.last_page,
          });
        }
        this.setState({ is_loading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  defaultSorted = [
    {
      dataField: 'name',
      order: 'asc',
    },
  ];

  columns = [
    {
      dataField: 'id',
      text: 'No',
    },
    {
      dataField: 'created_at',
      text: 'Time',
    },
    {
      dataField: 'txn_amount',
      text: 'Amount',
    },
    {
      dataField: 'txn_method',
      text: 'Method',
    },
    {
      dataField: 'txn_channel',
      text: 'Channel',
    },
    {
      dataField: 'order_code',
      text: 'Order Code',
    },
    {
      dataField: 'payment_txn_id',
      text: 'Payment Txn Id',
    },
    {
      dataField: 'txn_status',
      text: 'Status',
    },
  ];

  sortableColumn = [
    {
      text: 'No',
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => {
        return rowIndex + 1;
      },
      dataField: 'id',
    },
    {
      text: 'Time',
      sort: true,
      formatter: (cell, row) => {
        return moment(row.created_at).format('llll');
      },
      dataField: 'created_at',
    },
    {
      text: 'Amount',
      sort: true,
      formatter: (cell, row) => {
        return '₹ ' + row.txn_amount;
      },
      dataField: 'txn_amount',
    },
    {
      dataField: 'txn_method',
      text: 'Method',
      sort: true,
    },
    {
      dataField: 'txn_channel',
      text: 'Channel',
      sort: true,
    },
    {
      dataField: 'orders.order_code',
      text: 'Order Code',
      sort: true,
    },
    {
      dataField: 'payment_txn_id',
      text: 'Payment Txn Id',
      sort: true,
    },
    {
      dataField: 'txn_status',
      text: 'Status',
      sort: true,
    },
  ];

  paginationOptions = {
    // custom: true,
    paginationSize: 5,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    totalSize: this.state.data.length,
  };

  render() {
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    };
    const { ExportCSVButton } = CSVExport;
    let { data } = this.state;
    let { SearchBar } = Search;
    return (
      <div className="main-wrapper">
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4>Transactions Report</h4>
              </div>
            </div>
            <div
              className="comp-sec-wrapper"
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <section className="comp-section">
                <div className="row pb-4">
                  <div className="col-md-12">
                    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified">
                      <li className="nav-item">
                        <label></label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            if (e.target.value == 'customrange') {
                              this.setState({
                                isOpen: !this.state.isOpen,
                                range: 'custom',
                              });
                            } else {
                              this.setState({
                                isOpen: false,
                                range: e.target.value,
                              });
                            }
                          }}
                          value={this.state.value}
                          style={{ width: '150px', marginRight: '10px' }}
                        >
                          <option value="today">Today</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="thisweek">This Week</option>
                          <option value="lastweek">Last Week</option>
                          <option value="thismonth">This Month</option>
                          <option value="lastmonth">Last Month</option>
                          <option value="lifetime">LifeTime</option>
                          <option value="customrange">Custom Range</option>
                        </select>
                        {this.state.isOpen && (
                          <DateRangePicker
                            isOpen={this.state.isOpen}
                            maxDate={new Date()}
                            onChange={(value) => {
                              this.setState({
                                from: moment(value[0]).format(
                                  'YYYY-MM-DD 00:00:00'
                                ),
                                to: moment(value[1]).format(
                                  'YYYY-MM-DD 23:59:59'
                                ),
                              });
                            }}
                            value={[this.state.from, this.state.to]}
                          />
                        )}
                      </li>
                      <li className="nav-item">
                        <label>Select type</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            this.setState({
                              parent_category_id: e.target.value,
                            });
                          }}
                          style={{ width: '150px', marginRight: '10px' }}
                          // className="select-container"
                        >
                          <option value="all">All</option>
                          <option value="TakeAway">TakeAway</option>
                          <option value="Delivery">Delivery</option>
                          <option value="Dine-In">Dine-In</option>
                        </select>
                      </li>

                      <li className="nav-item">
                        <label>Order Status</label>
                        <select
                          className="form-control"
                          onChange={(e) => {
                            this.setState({
                              parent_category_id: e.target.value,
                            });
                          }}
                          style={{ width: '150px', marginRight: '10px' }}
                          // className="select-container"
                        >
                          <option value="all">All</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in_process">In process</option>
                          <option value="processed">Processed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </li>
                      <li className="nav-item" style={{ paddingTop: 20 }}>
                        <a
                          className="nav-link active mx-4"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                          onClick={() => {
                            this.setState({ is_loading: true });
                            this.fetch_order(1, '', this.state.range);
                          }}
                        >
                          Search
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
            {!this.state.is_loading ? (
              <>
                <div className="row mt-4">
                  <div className="col-lg-3 col-sm-3 col-12">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h5>
                          <BiRupee />
                          <span className="counters">
                            {this.state.total.toFixed(2)}
                          </span>
                        </h5>
                        <h6>Total Sales</h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-3 col-12">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h5>
                          <BiRupee />
                          <span className="counters">
                            {this.state.online.toFixed(2)}
                          </span>
                        </h5>
                        <h6>Online Sales</h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-3 col-12">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h5>
                          <BiRupee />
                          <span className="counters">
                            {this.state.cash.toFixed(2)}
                          </span>
                        </h5>
                        <h6>Cash Sales</h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-3 col-12">
                    <div className="dash-widget dash1">
                      <div className="dash-widgetimg">
                        <span>
                          <img
                            src="https://dreamspos.dreamguystech.com/html/template/assets/img/icons/dash2.svg"
                            alt="img"
                          />
                        </span>
                      </div>
                      <div className="dash-widgetcontent">
                        <h5>
                          <BiRupee />
                          <span className="counters">
                            {this.state.weazypay.toFixed(2)}
                          </span>
                        </h5>
                        <h6>Weazy Pay</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  {this.state.data.length > 0 ? (
                    <div className="card-body">
                      <ToolkitProvider
                        striped
                        keyField="id"
                        data={this.state.data}
                        columns={this.sortableColumn}
                        search
                        exportCSV
                      >
                        {(props) => (
                          <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <ExportCSVButton {...props.csvProps}>
                                Export CSV!!
                              </ExportCSVButton>
                              <SearchBar {...props.searchProps} />
                            </div>
                            <BootstrapTable
                              {...props.baseProps}
                              bootstrap4
                              pagination={paginationFactory(
                                this.paginationOptions
                              )}
                              noDataIndication={() => {
                                return (
                                  <div className="text-center">
                                    <h5>No Records Found</h5>
                                  </div>
                                );
                              }}
                            />
                          </>
                        )}
                      </ToolkitProvider>
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
                        <h3>No Records Found</h3>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                className="main_loader"
                style={{
                  height: '60vh',
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
      </div>
    );
  }
}

export default Salesreport;
