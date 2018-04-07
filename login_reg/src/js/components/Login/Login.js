import React from 'react';
import './Login.css';
import {Card, CardActions, CardHeader, CardText,CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {orange500, blue500,grey500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FaGoogle from 'react-icons/lib/fa/google';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Link } from "react-router-dom";
import {Redirect} from 'react-router-dom';

export default class Login extends React.Component
{

  constructor(props){
    super(props);
    this.signIn=this.signIn.bind(this);
    this.updateUserName=this.updateUserName.bind(this);
    this.hotSignIn=this.hotSignIn.bind(this);
  }

updateUserName(evt){

  this.setState({"userName":evt.target.value})
}

hotSignIn(evt){
  if(evt.charCode===13){
      this.signIn();
  }
}

signIn(){
  window.localStorage.setItem("auth_key","mani");
  this.setState({authenticated:true})
  //browserHistory.push("/home/11")
}



state ={
  userName:''
}

  render(){

    if (this.state.authenticated === true) {
      return <Redirect to="/home" />
    }

    const styles = {
      errorStyle: {
        color: grey500
      },
      underlineStyle: {
        borderColor: grey500,
      },
      floatingLabelStyle: {
        color: grey500,
      },
      floatingLabelFocusStyle: {
        color: blue500,
      },
      loginBtn : {
        margin: 2
      },
      googleBtn : {
        margin: 2
      },
      smallIcon: {
        width: 36,
        height: 36,
      },
      mediumIcon: {
        width: 48,
        height: 48,
      },
      largeIcon: {
        width: 60,
        height: 60,
      },
      small: {
        width: 72,
        height: 72,
        padding: 16,
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24,
      },
      large: {
        width: 120,
        height: 120,
        padding: 30,
      },
    };

    return(
      <div className="login-card">
        <Card>
          <CardText>
            <div className="sign-in-header">
              <h3>Sign in</h3>
            </div>
            <TextField
               floatingLabelText="Email or phone"
               floatingLabelStyle={styles.floatingLabelStyle}
               floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
               className="full-wid"
               fullWidth={true}
               onChange={this.updateUserName}
               value={this.state.userName}
             />
             <TextField
              floatingLabelText="Enter your password"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              className="full-wid"
              fullWidth={true}
              type="password"
              onKeyPress={this.hotSignIn}
            />
          </CardText>
          <CardActions className="login-action-bar">
              <RaisedButton
                label="Sign in"
                primary={true}
                style={styles.loginBtn}
                className="sign-in-btn"
                onClick={this.signIn}
              />
              <div className="forgot-password">
                <a href="#">Forgot your password?</a>
                <br/>
                <Link  to="/create">Create a new account</Link>
              </div>
          </CardActions>
          <p className="exist-acc"> <span className="exist-acc-lbl">or sign in with your existing account</span> </p>
          <CardActions className="login-action-bar">

            <FloatingActionButton
              mini={true}
              style={styles.googleBtn}
              href="https://accounts.google.com/signin/v2/identifier?hl=en&cont&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
              target="_blank"
              secondary={true}
              className="google-auth"
              >
              <FaGoogle/>
            </FloatingActionButton>

          </CardActions>
        </Card>
      </div>
    );
  }
}
