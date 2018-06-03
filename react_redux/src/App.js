import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Emp from './Emp';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './Home';
import Login from './Login';
//import Loader from './loader';

import {connect }  from 'react-redux'
import {updateUser} from './user-action'



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      txtVal: '',
      data: '',
      empData: [
        { id: 11, name: 'mani', salary: 1000 },
        { id: 12, name: 'kani', salary: 2000 },
        { id: 13, name: 'pani', salary: 3000 },
      ],
      productslist:[
        {name:'A'},{name:'A'},{name:'A'},{name:'A'},
        {name:'A'},{name:'A'},{name:'A'},{name:'A'}
       
        ],
        clasNm:['line-item  reg','line-item  reg','line-item reg']
    };
    this.clickBtn = this.clickBtn.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onUpdateUser=this.onUpdateUser.bind(this);
    this.chgStyl=this.chgStyl.bind(this);


  }

chgStyl(idx){
  console.log(idx)
  const clsNm=this.state.clasNm;
  clsNm.fill('line-item reg');
  clsNm[idx]='line-item chgclr'

  this.setState({clasNm:clsNm});


}
  onUpdateUser(evt){
    this.props.onUpdateUser(evt.target.value);
  }

  updateValue(e) {
    this.setState({ txtVal: e.target.value });
  }


  clickBtn() {
    this.setState({ count: this.state.count + 1 });
    console.log("click called");
    //this.setState({data:''});
    ReactDOM.findDOMNode(this.refs.myText).focus();

  }

  delEmp(record, evt) {
    console.log(evt, "event");
    console.log(record);
    console.log(evt.target.getAttribute("id"));
    const emps = Object.assign([], this.state.empData);
    emps.splice(record, 1);

    this.setState({ empData: emps });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React: {this.props.context}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>Count:{this.state.count}</h2>
        <Content count={this.state.count}></Content>

        <button onClick={this.clickBtn}>Click Me</button>
        <input type="text" ref="myText" />
        <input type="text" onChange={this.updateValue} />
        <h4>{this.state.txtVal}</h4>
        <table style={{ width: '50%', color: 'blue' }}>
          <tbody>
            {
              this.state.empData.map((emp, i) => {

                return (<Emp data={emp.id} salary={emp.salary} key={emp.id}
                  deleteEmp={this.delEmp.bind(this, i)}
                >{emp.name}</Emp>)
              })
            }
          </tbody>
        </table>
        <input type="text" onChange={this.onUpdateUser}/>
        <label>{this.props.user}</label>
        <Router>
          <div>
            <Link to="/login">login</Link>
            <Link to="/home">home</Link>

            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/home" component={Home} />
            </Switch>
          </div>
        </Router>

<div>
    <ul className="line">
      <li key="1" className={this.state.clasNm[0]} onClick={()=>this.chgStyl(0)} >A</li>
      <li key="2" className={this.state.clasNm[1]} onClick={()=>this.chgStyl(1)}>B</li>
      <li key="3" className={this.state.clasNm[2]} onClick={()=>this.chgStyl(2)}>C</li>
     
    </ul>
  </div>
        <div>
          <ul className="popular-list">
            {this.state.productslist.map( (product,i) =>
              <li key={i} className='popular-item'>
                  <div className="box">BOX {product.name}</div>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}


class Content extends Component {



  componentWillMount() {
    console.log("Component will mount called");
  }

  componentDidMount() {
    console.log("Component did mount called");
  }

  componentWillReceiveProps(newProps) {
    console.log("Component will receive property");
  }

  shouldComponentUpdate(newProps, newState) {
    console.log("Component Should update")
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("Component will update");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component did update");
  }

  componentWillUnmount() {
    console.log("Component uill unmount")
  }
  render() {
    return (<h1>{this.props.count}</h1>);
  }
}

const mapStateToProps= state =>{
  return {
    products:state.products,
    user:state.user.user
  };
};

const mapActionsToProps={
  onUpdateUser:updateUser
};

export default connect(mapStateToProps,mapActionsToProps)(App);
