import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import Home from './Home/Home';
import Shop from './Sale/Sale';
import Help from './Help/Help';
import Registration from './Registration/Registration';
import Menu from './Menu/Menu';
import Layout from './Layout';
import Login from './Login/Login';

export default class Routercomp extends React.Component
{

  constructor(props){
    super(props);
    this.loggedIn=this.loggedIn.bind(this);
    window.localStorage.setItem('auth_key',"search")
  }

loggedIn() {
  return (
    !window.localStorage.getItem('auth_key')
  );
}

render(){

  return(
      <Router>
        <div>
          <Route exact path="/login" render={() => (
            this.loggedIn() ? (
              <Login/>
            ) : (
              <div>
                <Redirect to="/home"/>
              </div>
            )
            )} />
          <Route exact path="/"  render={() => (
            this.loggedIn() ? (
              <Login/>
            ) : (
              <div>
                <Redirect to="/home"/>
              </div>
            )
            )} />
          <Route path="/home"   render={() => (
            this.loggedIn() ? (
              <Login/>
            ) : (
              <div>
                <Menu />
                <Home />
              </div>
            )
            )} />

          <Route path="/shop/:tier/:id"  component={Shop} loggedIn={this.loggedIn} />

          <Route path="/help"  render={() => (
            <div>
              <Menu />
              <Help/>
            </div>
          )}  />
          <Route path="/create" component={Registration} />
          <Route path="/logout" render={() => (
            window.localStorage.removeItem('auth_key')?
            (<Redirect to="/login"/>):(<Redirect to="/login"/>)
          )} />
        </div>
      </Router>
    );
}
}
