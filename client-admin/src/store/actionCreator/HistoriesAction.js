import { ISLOGIN,HISTORIES_FETCH, HISTORIES_DELETE, HISTORIES_LOADING } from "../actionType/HistoriesType";
import { baseUrl } from "../helper/url";


export function historiesLoading(payload) {
  return {
    type: HISTORIES_LOADING,
    payload,
  };
}

export function setLogin(payload) {
  return {
    type: ISLOGIN,
    payload,
  };
}

export function succesFetchHistories(payload) {
  return {
    type: HISTORIES_FETCH,
    payload,
  };
}


export function  fetchHistories() {
  return function (dispatch, getState) {
    // dispatch(historiesLoading(true));
    fetch(`${baseUrl}/histories?size=30`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        console.log(data.pageData);
        dispatch(succesFetchHistories(data.pageData));
      })
      .catch((err) => console.log(err));
  };
}

