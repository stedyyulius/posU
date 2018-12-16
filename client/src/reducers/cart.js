const initialState = [];

export default (state = initialState, action) => {
  if(action.type === 'cart') {
    console.log(action);
    return action.payload;
  }
  return state;
}
