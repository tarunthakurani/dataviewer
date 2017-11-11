import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {cyan700} from 'material-ui/styles/colors';
import DataTable from './DataTable';
import CssLoader from './CssLoader';
import fetch from '../fetch';
import './DataForm.css';

const style = {
  margin: 12,
};

class DateForm extends Component {

  constructor() {
    super();
    const today = new Date();
    this.state = {
      from: today,
      to: today,
      data: null,
      isFetchingData: false,
    }
    this.submitData = this.submitData.bind(this);
    this.changeFromDate = this.changeFromDate.bind(this);
    this.changeToDate = this.changeToDate.bind(this);
  }

  submitData() {
    const {to, from} = this.state;
    if(to && from && to.getTime() >= from.getTime()) {
      this.getData(this.getFormatedDate(from), this.getFormatedDate(to));
    }
  }

  getData(from, to) {
    if(!this.state.isFetchingData) {
      this.setState({isFetchingData: true});
      fetch(`http://104.197.128.152/data/adrequests?from=${from}&to=${to}`).then(({data}) => {
        this.setState({isFetchingData: false});
        this.setState({data})
      });
    }
  }

  changeFromDate(e, date) {
    let {to} = this.state;
    if(to.getTime() < date.getTime()) {
      to = date;
    }
    this.setState({from: date, to});
  }


  getFormatedDate(date) {
    return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
  }

  changeToDate(e, date) {
    this.setState({to: date});
  }

  render() {
    return (
      <div className="DataForm-main-container">
        <div className="DataForm-form-container">
          <DatePicker
            className="DataForm-datePicker DataForm-element"
            key="from"
            autoOk
            floatingLabelText='From'
            value={this.state.from}
            onChange={this.changeFromDate}
          />
          <DatePicker
            className="DataForm-datePicker DataForm-element"
            key="to"
            autoOk
            floatingLabelText='To'
            value={this.state.to}
            minDate={this.state.from}
            onChange={this.changeToDate}
          />
          {!this.state.isFetchingData &&
            <RaisedButton
              className={`DataForm-submit DataForm-element ${ this.state.isFetchingData ? 'disable' : ''}`}
              label="SUBMIT"
              onClick={this.submitData}
              primary={true}
            />
          }
        {this.state.isFetchingData && <CssLoader />}
        </div>
        {!this.state.isFetchingData && <DataTable className="DataForm-table" data={this.state.data} />}
      </div>
    );
  }
}

export default DateForm;
