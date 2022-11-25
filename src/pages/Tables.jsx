import moment from 'moment';
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { AuthContext } from '../AuthContextProvider';

class Tables extends Component {
  static contextType = AuthContext;
  state = {
    userList: [],
    from: new Date(),
    to: new Date(),
  };

  defaultSorted = [
    {
      dataField: 'name',
      order: 'asc',
    },
  ];

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
            this.setState({ userList: [], is_loading: false });
          }
        } else {
          console.log(json.data.data);
          this.setState({ userList: json.data.data });
        }
        this.setState({ is_loading: false });
        return json;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  columns = [
    {
      dataField: 'id',
      text: 'ID',
    },
    {
      dataField: 'time',
      text: 'Time',
    },
    {
      dataField: 'email',
      text: 'User Email',
    },
    {
      dataField: 'company',
      text: 'Company',
    },
    {
      dataField: 'balance',
      text: 'Balance',
      align: 'center',
      headerAlign: 'center',
    },
    {
      dataField: 'age',
      text: 'Age',
      align: 'center',
      headerAlign: 'center',
    },
  ];

  sortableColumn = [
    {
      dataField: 'id',
      text: 'No',
      sort: true,
    },
    {
      dataField: 'created_at',
      text: 'Time',
      sort: true,
    },
    {
      dataField: 'email',
      text: 'User Email',
      sort: true,
    },
    {
      dataField: 'company',
      text: 'Company',
      sort: true,
    },
    {
      dataField: 'balance',
      text: 'Balance',
      sort: true,
      align: 'center',
      headerAlign: 'center',
    },
    {
      dataField: 'age',
      text: 'Age',
      sort: true,
      align: 'center',
      headerAlign: 'center',
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
    totalSize: this.state.userList.length,
  };

  render() {
    let { userList } = this.state;
    let { SearchBar } = Search;

    return (
      <ToolkitProvider
        striped
        keyField="id"
        data={userList}
        columns={this.sortableColumn}
        search
      >
        {(props) => (
          <>
            <div className="d-flex justify-content-end align-items-center">
              <span className="mb-2 me-1">Search:</span>
              <SearchBar {...props.searchProps} className="mb-2" />
            </div>
            <BootstrapTable
              {...props.baseProps}
              bootstrap4
              pagination={paginationFactory(this.paginationOptions)}
              noDataIndication={'Table is empty'}
            />
          </>
        )}
      </ToolkitProvider>
    );
  }
}

export default Tables;
