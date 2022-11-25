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

export class Productreport extends Component {
  static contextType = AuthContext;
  state = {
    data: [],
    is_loading: true,
    load_data: false,
    page: 1,
    value: [new Date(), new Date()],
    start_date: new Date(),
    end_date: new Date(),
    range: 'today',
  };
  handleSelect(ranges) {
    console.log(ranges);
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  }
  componentDidMount() {
    this.fetch_order(1, '');
    window.Echo.private(`orderstatus.(order_id)`).listen(
      '.order.status',
      (e) => {
        console.log(e);
      }
    );
  }

  fetch_order = (page_id, status) => {
    fetch(global.api + 'fetch_product_reports', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.context.token,
      },
      body: JSON.stringify({
        page: page_id,
        start_date: this.state.start_date,
        end_date: this.state.end_date,
        range: this.state.range,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          if (page_id == 1) {
            this.setState({ data: [], is_loading: false });
          }
        } else {
          console.log(json.data.data);
          this.setState({ data: json.data.data });
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
      dataField: 'product_name',
      text: 'Product Name',
    },
    {
      dataField: 'price',
      text: 'Price',
    },
    {
      dataField: 'veg/non-veg',
      text: 'Veg/Non-Veg',
    },
    {
      dataField: 'sales count',
      text: 'Sales Count',
    },
    {
      dataField: 'status',
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
    },
    { dataField: 'product_name', text: 'Product Name', sort: true },
    {
      text: 'Price',
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => {
        return '₹ ' + row.market_price;
      },
    },
    {
      text: 'Offer Price',
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => {
        return '₹ ' + row.our_price;
      },
    },
    {
      text: 'Veg/Non-Veg',
      sort: true,
      formatter: (cell, row, rowIndex, extraData) => {
        if (row.is_veg == 1) {
          return 'Veg';
        } else {
          return 'Non-Veg';
        }
      },
    },
    { dataField: 'salesCount', text: 'Sales Count', sort: true },
    // { dataField: 'status', text: 'Status', sort: true },
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
                <h4>Product Report</h4>
              </div>
            </div>
            <div className="comp-sec-wrapper">
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
                          value={this.state.range}
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
                          <option>All</option>
                          <option value={0}>None</option>
                        </select>
                      </li>
                      <li className="nav-item" style={{ paddingTop: 20 }}>
                        <a
                          className="nav-link active mx-4"
                          href="#solid-rounded-justified-tab1"
                          data-bs-toggle="tab"
                          onClick={() => {
                            this.setState({ is_loading: true });
                            this.fetch_order(1, '');
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
                      <h3>No Order Found</h3>
                    </div>
                  </div>
                )}
              </div>
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
                  color="#eda332"
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

export default Productreport;
