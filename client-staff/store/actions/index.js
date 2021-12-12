export function setToken(token){
  return(dispatch) => {
    dispatch({
      type: 'user/set',
      payload: token
    })
  }
}

export function clearToken(){
  return(dispatch) => {
    dispatch({
      type: 'user/set',
      payload: ''
    })
  }
}