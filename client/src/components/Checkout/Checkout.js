import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Checkout.css';

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state= {}
  }

  cart() {
    const cartItems = [];
    this.props.cart.map((item, i) =>
      cartItems.push(
        <div key={i}>
          <div className="cart-row">
            <div className="cart-item-left">
              <p className="item-quantity">{item.quantity}</p>
              <p className="item-name">{item.details.name}</p>
            </div>
            <div className="cart-item-right">
              <b>{item.details.price}</b>
            </div>
          </div>
          <br />
        </div>
      )
    )
    return cartItems;
  }

  cartTotalPrice() {
    const { cart } = this.props;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity * cart[i].details.price;
    }
    return total;
  }

  render() {
    return(
      <div className="checkout-container">
        <div className="checkout-header">
          <div className="checkout-row">
            <p>Anna Lee</p>
          </div>
          < hr />
          <div className="checkout-row">
            <p>Thanks Anna for shopping with us</p>
          </div>
        </div>
        <div className="checkout-body">
          {this.cart()}
        </div>
        <div className="checkout-footer">
          <div className="cart-row">
            <div className="cart-item-left">
              <p className="item-quantity">Sub-total</p>
            </div>
            <div className="cart-item-right">
              <b>{this.cartTotalPrice()}</b>
            </div>
          </div>
          <div className="pay-button" onClick={() => alert('Transaction Complete')}>
            <p>Pay</p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
