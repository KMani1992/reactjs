import React from 'react';
import './Sale.css'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export default class Sale extends React.Component
{

  state = {
    repos: [],
    amountPayable:0,
    totalItems:0,
    stsMsg:null,
    stsCode:1
  }

  componentDidMount() {
    axios.get(`https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories`)
      .then(res => {
        const repos = res.data.items;
        this.setState({ repos });
      })
  }

  handleAddtoCart = event => {
      event.preventDefault();
      const cartRequestDTO = {
      cartId: "401db2d7b36f4cc4b0c6e0fc375569db",
      cartItems: [
        {
          deliveryOption: "SHIP",
          productId: 1,
          quantity: 1,
          selectedFrequency: 0,
          skuId: "7508411",
          type: "CD"
        }
      ]
    };

      axios.post(`http://localhost:9001/photon/ecommerce/svc/v1.0.0/carts`,   cartRequestDTO)
        .then(res => {
          const stsCode=res.data.stsCode;
          const stsMsg=res.data.stsMsg;
          this.setState({stsCode})
          this.setState({stsMsg})
          const totalItems=res.data.cartItems.totalCartQty;
          const amountPayable=res.data.cartItems.orderTotal;
          this.setState({totalItems})
          this.setState({amountPayable})
        })
    }

  render(){
    return(
      <div >
         {!this.state.stsCode ? <div class="alert alert-success" role="alert">{this.state.stsMsg}</div> :
         <div class="alert alert-danger" role="alert">{this.state.stsMsg}</div> }
        <div>
          <ul className="popular-list">
            {this.state.repos.map( repo =>
              <li key={repo.name} className='popular-item'>
                <Card className="prod-card">
                  <CardHeader
                    title={repo.name}
                  />
                  <CardMedia
                    overlay={<CardTitle title={'#' + repo.id}/>}
                    >
                    <img className='avathar'
                    src={repo.owner.avatar_url}
                    alt={'avatar for ' + repo.owner.login} />
                  </CardMedia>
                  <CardTitle title={repo.name}/>
                  <CardText>
                    <ul className='space-list-items'>
                      <li><a target="_blank" href={repo.html_url}>{repo.name}</a></li>
                      <li>@{repo.owner.login}</li>
                      <li>Rs. {repo.stargazers_count}</li>
                    </ul>
                  </CardText>
                  <CardActions>
                    <RaisedButton label="ADD TO CART" primary={true} onClick={this.handleAddtoCart}/>
                    <RaisedButton label="FIND AT A STORE" secondary={true}/>
                  </CardActions>
                </Card>
              </li>
              )}
            </ul>

            <Card className="order-summary">
              <CardHeader  title="Shopping Cart" subtitle="Order Summary" avatar="images/shopping_cart_icon.jpg" />
              <CardMedia>
                <ul className="order-price-detail">
                  <li className="order-det-item">Total Items: {this.state.totalItems}</li>
                  <li className="order-det-item">Amount Payable: Rs. {this.state.amountPayable}</li>
                </ul>
              </CardMedia>
              <CardActions>
                <RaisedButton label="PLACE ORDER" primary={true} className="place-order" />
                <RaisedButton label="VIEW ORDER DETAIL" className="place-order" />
              </CardActions>
            </Card>
          </div>
      </div>
    );
  }
}
