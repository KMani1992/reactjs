import React, { Component } from 'react';
import './App.css';
import Layout from './js/components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// module.exports =function(){
//   return 'hello';
// }

class App extends Component {

constructor(props){
  super(props);
  this.sayHello = this.sayHello.bind(this);
}

sayHello(){
  return 'Hello';
}

  render() {

    return (
        <MuiThemeProvider>
          <Layout />
        </MuiThemeProvider>
    );
  }
}

export default App;
