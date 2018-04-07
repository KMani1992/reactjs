import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './Layout.css';
export default class Layout extends React.Component {

  render(){
    return(
      <div className="App">
        <Header />
        <Footer />
      </div>
    );
  }
}
