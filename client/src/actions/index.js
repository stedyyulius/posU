import axios from 'axios';
import ep from '../config';

const api = ep;

export const getProducts = () => {
  return(dispatch) => {
    axios.get(`${api}/products`)
    .then(products => {
      dispatch({
        type: 'products',
        payload: products.data,
      })
    })
  }
}

export const addProduct = (product) => {
  return(dispatch) => {
    axios.post(`${api}/products`, product)
    .then(res => {
      console.log(res);
      alert(`${product.name} Added`)
    })
    .catch(err => {
      alert(err)
    })
  }
}

export const stockProduct = (storeId, products) => {
  const body = {
    products
  };
  return(dispatch) => {
    axios.put(`${api}/store/stockProduct/${storeId}`, body)
    .then(store => {
      dispatch({
        type: 'store',
        payload: store.data,
      })
    })
  }
}

export const getStore = () => {
  return(dispatch) => {
    axios.get(`${api}/store`)
    .then(store => {
      dispatch({
        type: 'store',
        payload: store.data[0],
      })
    })
  }
}

export const buyProduct = (storeId) => {
  return(dispatch) => {
    axios.put(`${api}/store/buyProduct/${storeId}`)
    .then(res => {
      if (res.code === 200) {
        alert('Transaction Completed')
      }
    })
    .catch(err => {
      alert(err)
    })
  }
}

export const modifyCart = (cart) => {
  return {
    type: 'cart',
    payload: cart,
  }
}
