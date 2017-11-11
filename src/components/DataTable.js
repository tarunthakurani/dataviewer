import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class DataTable extends Component {
  render() {
    const {data} = this.props;
    if(Array.isArray(data) && data.length) {
      return (
        <ReactTable
          data={data}
          columns={[
            {Header: "Date", accessor: 'date'},
            {Header: "Ads", accessor: 'adrequest'}
          ]}
        />
      );
    } else if(Array.isArray(data) && !data.length) {
      return (<p>No Records found.</p>)
    }
    return null;
  }
}

export default DataTable;
