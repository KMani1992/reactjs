import React from 'react';
import './Menu.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../Home/Home'
import Shop from '../Sale/Sale'
import Help from '../Help/Help'
import Login from '../Login/Login'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import axios from 'axios';

export default class Menu extends React.Component {

constructor(props){
  super(props);
  this.displayMenu=this.displayMenu.bind(this);
  this.state={
    displayPopUp:false,
    open: false,
    shoppingMenuBuck:[],
  }
}
  componentDidMount() {
    console.log("inside comp did mount");

    axios.post(`http://localhost:3000/photon/ecommerce/svc/get-category-hierarchy`, {})
   .then(function(response){

     console.log(response.data);
     const shoppingMenuBuck=response.data.category1.buckets;

     console.log(shoppingMenuBuck,"shoppingMenuBuck");
     this.setState({shoppingMenuBuck});

   }.bind(this));

  }

handleClick = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

displayMenu()
{
  return <h3>Hello</h3>;
}

render(){

  const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


  return(
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">A SHOPPING SITE</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item" onClick={this.handleClick}>
                <Link className="nav-link" to="#">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/help">Help</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Popover
             open={this.state.open}
             anchorEl={this.state.anchorEl}
             anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
             targetOrigin={{horizontal: 'left', vertical: 'top'}}
             onRequestClose={this.handleRequestClose}
             animation={PopoverAnimationVertical}
           >
            <Tabs className="shopMenuTabs">
              {
                this.state.shoppingMenuBuck.map( cat1Bucket =>
                  cat1Bucket.key === "null||null" ? ""  :
                  <Tab label={cat1Bucket.key.substring(cat1Bucket.key.indexOf("||") + 2)}  >
                    <div>
                      <Link to={'/shop/1/' + cat1Bucket.key.substring(0,cat1Bucket.key.indexOf("||"))}>
                      <Subheader>{cat1Bucket.key.substring(cat1Bucket.key.indexOf("||") + 2)}</Subheader></Link>
                      <Divider />
                      <List>
                        { cat1Bucket.category2.buckets.map( (cat2Bucket,i) =>

                            <ListItem key={i}
                              initiallyOpen={true}
                              nestedItems={[
                               cat2Bucket.category3.buckets.map( (cat3Bucket,j) =>
                               [
                                <ListItem key={j} ><Link to={'/shop/3/' + cat3Bucket.key.substring(0,cat3Bucket.key.indexOf("||"))}>{cat3Bucket.key.substring(cat3Bucket.key.indexOf("||") + 2)}</Link></ListItem>,
                               ]
                               )
                             ]}>
                             <Link to={'/shop/2/' + cat2Bucket.key.substring(0,cat2Bucket.key.indexOf("||"))}>{cat2Bucket.key.substring(cat2Bucket.key.indexOf("||") + 2)}</Link>
                            </ListItem>,
                        )}
                      </List>
                    </div>
                  </Tab>
                )}
           </Tabs>
         </Popover>
      </div>
  );
}
}
