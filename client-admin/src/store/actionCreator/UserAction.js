import { USER_ADD,USER_FETCH,USER_LOADING } from "../actionType/UserTypes";
// import swal from "sweetalert";

import { baseUrl } from "../helper/url";


function successFetchUser(payload) {
  return {
    type: USER_FETCH,
    payload,
  };
}


function userLoading(payload) {
  return {
    type: USER_LOADING,
    payload,
  };
}

export function fetchUser(payload) {
  return function (dispatch, getState) {
    console.log(payload,'reducer');
    dispatch(userLoading(true));
    fetch(`${baseUrl}/users?role=${payload?payload.role:''}&size=20`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        dispatch(successFetchUser(data.pageData));
      })

      .catch((error) => {
        console.log(error,'masuk eror');
      });
  };
}
