import React from 'react';
import './Menu.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../../Home/Home'
import Sale from '../../Sale/Sale'
import Help from '../../Help/Help'


export default class Menu extends React.Component {


render(){
  return(
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">A SHOPPING SITE</a>
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
