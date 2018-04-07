import React from 'react';
import './Menu.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../../Home/Home'
import Sale from '../../Sale/Sale'
import Help from '../../Help/Help'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {greenA200,blue500} from 'material-ui/styles/colors';

export default class Menu extends React.Component {

render(){
  return(
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="#">A SHOPPING SITE</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sale">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/help">Help</Link>
              </li>
            </ul>
            <input class="form-control mr-sm-2 search-box" type="search" placeholder="Search for products, brands and more" aria-label="Search" />
            <RaisedButton label="Search" hoverColor={greenA200} />
          </div>

        </nav>

        <Route exact path="/" component={Home} />
        <Route path="/sale" component={Sale} />
        <Route path="/help" component={Help} />
      </div>
    </Router>
  );
}

}
