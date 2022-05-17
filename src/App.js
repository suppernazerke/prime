import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Details from './components/Details';
import Default from './components/Default';
import Store from './components/Store';
import Orders from './components/Orders';
import Login from './components/Login';

function App() {
  return (
    <React.Fragment>
      <Navbar/>       
      <Switch>
      <Route exact path="/" component={Login}/>
        <Route path="/products" component={Details}/>
        <Route path="/store" component={Store}/>
        <Route path="/orders" component={Orders}/>
        <Route component={Default}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
