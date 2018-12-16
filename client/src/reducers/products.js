const initialState = [];

export default (state = initialState, action) => {
  if(action.type === 'products') {
    return action.payload;
  }
  return state;
}
