
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import WeekdaySelection from './components/Mui_day_time_selections';
import MyTheme from './components/MyTheme';


class App extends Component {
  render() {
    return (
      <MyTheme>
        <Router>
          <Routes>
            <Route exact path='/' element={< WeekdaySelection />}></Route>
          </Routes>
        </Router>
      </MyTheme>
    );
  }
}

export default App;

// import React from 'react'
// import './App.css'
// import MyRouter from "./routes";
// const App = () => <><MyRouter /></>
// export default App
