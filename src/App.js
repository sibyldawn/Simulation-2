import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Component/Dashboard/Dashboard';
import Header from './Component/Header/Header';
import Wizard from './Component/Wizard/Wizard';
import {Route,Link,Switch} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        
        <Switch>
          <Route exact path = '/' component = {Header}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/wizard' component={Wizard}/>
        </Switch> 
      </div>
    );
  }
}

export default App;
