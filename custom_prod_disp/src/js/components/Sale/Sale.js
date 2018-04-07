import React from 'react';
import './Sale.css'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import TextField from 'material-ui/TextField';

export default class Sale extends React.Component
{

  constructor(props) {
    super(props);
    this.callProductDet = this.callProductDet.bind(this);
    this.searchProd=this.searchProd.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

searchProd(){
  console.log("search val");
  this.callProductDet(this.state.searchTerm);
}

  state = {
    amountPayable:0,
    totalItems:0,
    stsMsg:null,
    stsCode:1,
    products:[],
    searchTerm:'shampoo'

  }

  componentDidMount() {
    console.log("inside comp did mount");
      this.callProductDet(this.state.searchTerm);
      return 0;
  }


 callProductDet(searchTerm){

  console.log("inside callProductDet")
  console.log(searchTerm);

  axios.post(`http://localhost:8080/wag/gcps/search`,
      {
        query: this.state.searchTerm ? this.state.searchTerm : 'shampoo'
      }
    ).then(res => {
      console.log("response returned");
      const products=res.data.products;
      this.setState({products});
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



handleChange(e){
  this.setState({searchTerm:e.target.value});
}
  render(){

    return(


        <div>
          <div className="search-bar">
            <div  className="search-term">
              <TextField hintText="Search for products, brands and more" fullWidth={true} onChange={this.handleChange} />
            </div>
            <div   className="search-hit">
              <RaisedButton label="Search" onClick={this.searchProd}/>
            </div>
          </div>

         {!this.state.stsCode ? <div  className="alert alert-success" role="alert">{this.state.stsMsg}</div> :
         <div className="alert alert-danger" role="alert">{this.state.stsMsg}</div> }

        <div>
          <ul className="popular-list">
            {this.state.products.map( product =>
              <li key={product.productInfo.productDisplayName} className='popular-item'>
                <a className="productcard-link" target="_blank" href={'https://www.walgreens.com' + product.productInfo.productURL}>
                  <Card className="prod-card">
                    <CardHeader
                      title={product.productInfo.beautyCategoryName}
                    />
                    <CardMedia overlay={<CardTitle title={'$' + product.productInfo.unitPrice}/>}>
                      <img className='avathar'
                      src={product.productInfo.imageUrl}
                      alt={'avatar for ' + product.productInfo.productDisplayName} />
                    </CardMedia>
                    <CardTitle title={product.productInfo.productDisplayName}/>
                    <CardText>
                      <ul className='space-list-items'>
                        <li>{product.productInfo.reviewHoverMessage}</li>
                        <li>{product.productInfo.storeInv}</li>
                      </ul>
                    </CardText>
                    <CardActions>
                      <RaisedButton label="ADD TO CART" primary={true} onClick={this.handleAddtoCart} className="prod-card-button"/>
                      <RaisedButton label="FIND AT A STORE" secondary={true} className="prod-card-button" />
                    </CardActions>
                  </Card>
                </a>
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
