import React from 'react';
import './Sale.css'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu from '../Menu/Menu';

export default class Sale extends React.Component
{

  constructor(props) {
    super(props);
    this.callProductDet = this.callProductDet.bind(this);
    this.searchProd=this.searchProd.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.updateProdCard=this.updateProdCard.bind(this);
  }

searchProd(evt){
  if(evt.charCode===13){
    console.log("search val" );
    this.setState({searchQry:true});
    this.callProductDet(this.state.searchTerm);
  }
}

  state = {
    amountPayable:0,
    totalItems:0,
    stsMsg:null,
    stsCode:1,
    products:[],
    searchTerm:'shampoo',
    searchQry:false,
    compUpdate:true
  }

componentDidUpdate(newProps){
console.log("comp did update");

if (this.props.match.params.id === newProps.match.params.id
  && this.props.match.params.tier === newProps.match.params.tier) {

  }else{
    this.search_field.value ="";
    this.setState({searchQry:false,products:[],searchTerm:''});
    this.updateProdCard();
  }
}


updateProdCard(){
  this.setState({searchQry:false});
  console.log('Component WILL RECIEVE PROPS!')
  console.log(this.props.match.params.tier,"url param tier");
  console.log(this.props.match.params.id,"url param");
  axios.post(`http://localhost:3000/photon/ecommerce/svc/api/v1.0.0/search/products`,
      {
        cat_pos: this.props.match.params.tier,
        cat_id: this.props.match.params.id
      }
    ).then(function(res) {
      console.log("response returned",res.data);
      const products=res.data;
      this.setState({products});
    }.bind(this));
}



   componentDidMount() {
      console.log('Component DID MOUNT!')
      console.log(this.props.match.params.tier,"url param tier");
      console.log(this.props.match.params.id,"url param");
      this.updateProdCard();
   }

   shouldComponentUpdate(newProps, newState) {
      return this.state.compUpdate;
   }


 callProductDet(searchTerm) {
  console.log("inside callProductDet")
  console.log(searchTerm,this.state.searchQry);
  axios.post(`http://localhost:3000/photon/ecommerce/svc/api/v1.0.0/search`,
      {
        query: this.state.searchTerm ? this.state.searchTerm : 'massage'
      }
    ).then(res => {
      console.log("response returned",res.data);
      const products=res.data;
      console.log(searchTerm,this.state.searchQry,"2 time");
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
          <Menu />
          <div className="search-bar">
            <div >
              <Paper className="search-term" zDepth={2}  >
                  <TextField ref={el => this.search_field = el}
                    hintText="Search for products, brands and more"
                    onChange={this.handleChange}
                    fullWidth={true}
                    underlineShow={false}
                    onKeyPress={this.searchProd}
                  />
             </Paper>

            </div>
          </div>
          <div className="disp-none">
            {!this.state.stsCode ? <div  className="alert alert-success" role="alert">{this.state.stsMsg}</div> :
            <div className="alert alert-danger" role="alert">{this.state.stsMsg}</div> }
          </div>
        <div>
          <div>{this.state.searchQry}</div>
          {this.state.searchQry ?
          <ul className="popular-list">
            {this.state.products.map( (product,i) =>
              <li key={i} className='popular-item'>
                <a className="productcard-link" target="_blank" href={'https://www.walgreens.com' + product._source.product_seo_url}>
                  <Card className="prod-card">
                    <CardHeader
                      title={product._source.product_type}
                    />
                    <CardMedia overlay={<CardTitle title={'$' + product._source.spc_price_d}/>}>
                      <img className='avathar'
                      src={product._source.image_url}
                      alt={'avatar for ' + product._source.product_name} />
                    </CardMedia>
                    <CardTitle title={product._source.brand_name}/>
                    <CardText>
                      <ul className='space-list-items'>
                        <li>{product._source.product_name}</li>
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
            :
            <div>
              <ul className="popular-list">
                {this.state.products.map( productcatalog =>
                    productcatalog.inner_hits.productsku.hits.hits.map( (product,i) =>
                      <li key={i} className='popular-item'>
                        <a className="productcard-link" target="_blank" href={'https://www.walgreens.com' + product._source.product_seo_url}>
                          <Card className="prod-card">
                            <CardHeader
                              title={product._source.product_type}
                            />
                            <CardMedia overlay={<CardTitle title={'$' + product._source.spc_price_d}/>}>
                              <img className='avathar'
                              src={product._source.image_url}
                              alt={'avatar for ' + product._source.product_name} />
                            </CardMedia>
                            <CardTitle title={product._source.brand_name}/>
                            <CardText>
                              <ul className='space-list-items'>
                                <li>{product._source.product_name}</li>
                              </ul>
                            </CardText>
                            <CardActions>
                              <RaisedButton label="ADD TO CART" primary={true} onClick={this.handleAddtoCart} className="prod-card-button"/>
                              <RaisedButton label="FIND AT A STORE" secondary={true} className="prod-card-button" />
                            </CardActions>
                          </Card>
                        </a>
                      </li>
                    )

                  )}

                </ul>
              </div>
            }
            <Card className="order-summary">
              <CardHeader  title="Shopping Cart" subtitle="Order Summary" avatar="../../images/shopping_cart_icon.jpg" />
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
