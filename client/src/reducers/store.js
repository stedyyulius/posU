const initialState = null;

export default (state = initialState, action) => {
  if(action.type === 'store') {
    return action.payload;
  }
  return state;
}
