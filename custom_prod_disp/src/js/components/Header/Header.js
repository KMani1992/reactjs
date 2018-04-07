import React from 'react';
import Title from './Title/Title';
import Menu from './Menu/Menu';
import './Header.css';

export default class Header extends React.Component {

  render(){
    return(
      <div>
        <Title />
        <Menu />
      </div>
    );
  }

}
