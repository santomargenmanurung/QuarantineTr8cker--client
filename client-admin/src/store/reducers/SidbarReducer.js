const initialState = {
  sidebarShow: true,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      console.log( state, 'masuk set');
      return { ...state, ...rest }
    default:
      return state
  }
}
export default changeState