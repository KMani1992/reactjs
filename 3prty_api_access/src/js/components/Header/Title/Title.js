import React from 'react';
import './Title.css';

export default class Title extends React.Component {

  render(){
    return(
      <header className="App-header">
        <a href="/" className="homelink"><img src="images/logo.png" className="App-logo" alt="logo" /></a>
      </header>
    );
  }
}
