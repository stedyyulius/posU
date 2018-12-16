import React, { Component }  from 'react';
import { connect } from 'react-redux';

import './Home.css';

import Checkout from '../../components/Checkout/Checkout';

import { getStore, modifyCart } from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state= {}
  }

  componentWillMount() {
    this.props.getStore(1);
  }

  addToCart(newItem) {
    let cart = this.props.cart;
    let added = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].barcode === newItem.barcode) {
        cart[i].quantity += 1;
        added = true;
      }
    }
    if (!added) {
      newItem.quantity = 1;
      cart.push(newItem);
    }
    cart = [ ...cart ];
    this.props.modifyCart(cart);
  }

  products() {
    const cards = [];
    if (this.props.store) {
      this.props.store.products.map((product, i) => {
        const pr = JSON.parse(product);
          cards.push(
            <div className="card" key={i} onClick={() => this.addToCart(pr)}>
              <div className="card-header"></div>
              <h1>{pr.details.name}</h1>
              <p>{pr.details.name}</p>
            </div>
          )
        }
      )
    }
    return cards;
  }

  render() {
    return (
      <div className="home-page">
        <div className="card-row">
          {this.products()}
        </div>
        <Checkout />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.store,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStore: (storeId) => dispatch(getStore(storeId)),
    modifyCart: (cart) => dispatch(modifyCart(cart)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
