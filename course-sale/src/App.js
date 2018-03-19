import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Coursesales from './Coursesales';

class App extends Component {
  render() {

    var courses = [
      {
        name: "Complete IOS",
        price: 199
      },
      {
        name: "Complete pentesting",
        price: 299
      },
      {
        name: "Complete front end dev",
        price: 180
      },
      {
        name: "Big Data",
        price: 190
      }
    ];

    return (
      <div className="App">
        Welcom to Course Purchase
        {/*Pass courses as props to Coursesales Component*/}
        <Coursesales items={courses}/>
      </div>
    );
  }
}

export default App;
