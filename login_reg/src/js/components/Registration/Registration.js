import React from 'react';
import './Registration.css';
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
export default class Registration extends React.Component{

  render(){

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
          textStyle:{
            marginLeft:2
          }
        };

    return(
      <div className="login-card">
        <Card>
          <CardTitle>
            <div className="sign-in-header">
              <h3>Create a new account</h3>
              <Divider/>
            </div>
          </CardTitle>

          <CardText>
            <TextField hintText="First name" style={styles.textStyle} underlineShow={false} fullWidth={true} />
            <Divider />
            <TextField hintText="Last name" style={styles.textStyle} underlineShow={false}  fullWidth={true}  />
            <Divider />
            <TextField hintText="Phone" style={styles.textStyle} underlineShow={false}  fullWidth={true}  />
            <Divider />
            <TextField hintText="Email address" style={styles.textStyle} underlineShow={false}  fullWidth={true}  />
            <Divider />
            <TextField hintText="Password" style={styles.textStyle} underlineShow={false} type="password" fullWidth={true} />
            <Divider />
            <TextField hintText="Confirm password" style={styles.textStyle} underlineShow={false} type="password" fullWidth={true}  />
            <Divider />
          </CardText>

          <CardActions className="login-action-bar">
              <RaisedButton label="Create" primary={true} style={styles.loginBtn}  className="sign-in-btn" />
              <RaisedButton label="Reset" secondary={true} style={styles.loginBtn}  className="sign-in-btn" />
              <div className="forgot-password">
                <br />
                <Link to="login">Sign in</Link>
              </div>
          </CardActions>
          <p className="exist-acc"> <span className="exist-acc-lbl">or sign up using</span> </p>
          <CardActions className="login-action-bar">
            <FloatingActionButton
              mini={true}
              style={styles.googleBtn}
              href="https://accounts.google.com/signin/v2/identifier?hl=en&cont&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
              target="_blank"
              secondary={true}
              >
              <FaGoogle/>
            </FloatingActionButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}
