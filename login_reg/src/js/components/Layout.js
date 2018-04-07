import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './Layout.css';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Routercomp from './Routercomp';

export default class Layout extends React.Component {

  render(){
    return(
      <div className="App">
        <Header />
        <Routercomp />
        <Footer />
      </div>
    );
  }
}
