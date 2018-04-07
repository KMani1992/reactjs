import React from 'react';
import './Help.css';

export default class Help extends React.Component {

constructor(props){
  super(props);
  this.state= {
    secNameVal:'props.match.secName'
  }
}

render(){

  return(
    <div>
      <br />
      <h3>Welcome to PHOTON Help Desk {this.state.secNameVal}</h3>
    </div>
  );
}

}
