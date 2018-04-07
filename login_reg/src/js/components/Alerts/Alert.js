import React from 'react';

export default class Alerts extends React.Component{

  constructor(props){
    super(props)


  }


handleKeyEvent(evt1){
  console.log(evt1.target.value);
}

showAlert(data){
  alert(data);
}

  render(){
    return (
      <div>
        <h1>{this.props.alertMsg}</h1>
        <button onClick={() => this.props.callParAlert(4567)}>Call Parent From Child</button>
        <input onChange={this.props.callPar}/>
      </div>
    );
  }
}
