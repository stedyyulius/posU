import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AddProducts.css'
import {
  getProducts,
  addProduct,
  stockProduct
} from '../../actions';

class AddProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      truck: [],
      product: {},
    }
  }

  componentWillMount() {
    this.props.getProducts();
  }

  changeState(state, input) {
    const newProduct = this.state.product;
    newProduct[state] = input;
    this.setState({
      product: newProduct
    });
  }

  saveProduct(product) {
    const productToStore = this.state.truck;
    productToStore.push(product)
    this.setState({
      truck: productToStore,
    })
  }

  products() {
    const allProducts = [];
    this.props.products.map((product, i) =>
      allProducts.push(
        <div key={i}>
          <p>{product.name}</p>
          <button onClick={() => this.saveProduct(product)}>Add product</button>
        </div>
      )
    )
    return allProducts;
  }

  truckPayload() {
    const payload = [];
    this.state.truck.map((product, i) =>
      payload.push(
        <div className="truck-row" key={i}>
          <p>{product.name}</p>
        </div>
      )
    )
  return payload;
  }

  render() {
    return (
      <div className="addProductPage">
        <h1>Add Product Page</h1>
        <div>
          <p>Product Name</p>
          <input type="text" onChange={(e) => this.changeState('name', e.target.value)} />
          <br />
          <p>Price</p>
          <input type="text" onChange={(e) => this.changeState('price', e.target.value)}/>
          <br />
          <p>Category</p>
          <input type="text" onChange={(e) => this.changeState('category', e.target.value)}/>
          <br />
          <p>Barcode</p>
          <input type="text" onChange={(e) => this.changeState('barcode', e.target.value)}/>
          <br />
        </div>
        <br />
        <button onClick={() => this.props.addProduct(this.state.product)}>Submit</button>
        <hr />
          <h4>Truck</h4>
          {this.truckPayload()}
        <hr />
        <div>
          {this.products()}
          <button onClick={() => this.props.stockProduct(1, this.state.truck)}>Submit Products</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.products);
  return {
    products: state.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(getProducts()),
    addProduct: (product) => dispatch(addProduct(product)),
    stockProduct: (storeId, products) => dispatch(stockProduct(storeId, products)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);
