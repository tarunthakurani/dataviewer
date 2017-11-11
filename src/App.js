import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DateForm from './components/DateForm';
import fetch from './fetch';

class App extends Component {

  constructor() {
    super();
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Get Ads Data Here</h1>
        </header>
        <DateForm onSubmit={this.getData}/>
      </div>
    );
  }
}

export default App;
