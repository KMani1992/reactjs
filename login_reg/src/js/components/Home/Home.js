import React from 'react';
import './Home.css'
import Menu from '../Menu/Menu';
import Paper from 'material-ui/Paper';
import Alerts from '../Alerts/Alert'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  tr,
  td,
} from 'material-ui/Table';



export default class Home extends React.Component
{

  constructor(props){
    super(props);

    this.valueChange = this.valueChange.bind(this);
    this.childCall =this.childCall.bind(this);
    this.parCallArg=this.parCallArg.bind(this);
  }

componentDidMount(){


  return 0;
}

parCallArg(data){
  alert(data)
}

childCall(evt){
  console.log(evt.target.value);
}

valueChange(evt){
  this.refs.child.handleKeyEvent(evt);
}

  render(){

    this.state={
      userData:window.localStorage.getItem("auth_key")
    }

    return(
      <div className="app-Home">
        <img src="../../images/home.png" alt="company logo" className="home-img" />
        <Alerts alertMsg="Welcome to shopping cart" ref="child" callPar={this.childCall} callParAlert={this.parCallArg} />
        <button onClick={() => this.refs.child.showAlert(12345)}>Call Child From Parent</button>
        <input onChange={this.valueChange} type="text" />
        <table className="user-data-table">
          <tr>
            <td><b>User Name</b></td>
            <td>{this.state.userData}</td>
          </tr>
          <tr>
            <td>Randal White</td>
            <td>Unemployed</td>
          </tr>
          <tr>

            <td>Stephanie Sanders</td>
            <td>Employed</td>
          </tr>
          <tr>
            <td>Steve Brown</td>
            <td>Employed</td>
          </tr>
          <tr>
            <td>Christopher Nolan</td>
            <td>Unemployed</td>
          </tr>
        </table>
      </div>

    );
  }
}
