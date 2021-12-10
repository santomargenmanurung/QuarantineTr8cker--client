import {
  CATEGORIES_LOADING,
  SET_GENRES,
  ADD_GENRE,
  DELETE_GENRE,
} from "../actionType/catActionType";
import { baseUrl } from "../helper/url";

export function setGenres(payload) {
  return {
    type: SET_GENRES,
    payload,
  };
}

export function addGenres(payload) {
  return {
    type: ADD_GENRE,
    payload,
  };
}
export function categoriesLoading(payload) {
  return {
    type: CATEGORIES_LOADING,
    payload,
  };
}

export function deleteGenre(payload) {
  return {
    type: DELETE_GENRE,
    payload,
  };
}

export function fetchCategories() {
  return function (dispatch, getState) {
    dispatch(categoriesLoading(true));
    fetch(`${baseUrl}/genres`, {
      method: "get",
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        dispatch(setGenres(data));
      })
      .catch((err) => dispatch(console.log(err, "INI ERRORRNYAAAA")));
  };
}

export function addGenre(payload) {
  return function (dispatch, getState) {
    dispatch(categoriesLoading(true));
    fetch(`${baseUrl}/genres`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: payload,
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        if (response1) {
          dispatch(addGenres(response1));
        }
      })
      .catch((error) => {
        console.log(error, "INI ERRORRNYAAAA");
      });
  };
}

export function deleteCategory(payload) {
  return function (dispatch, getState) {
    dispatch(categoriesLoading(true));
    fetch(`${baseUrl}/genres/${payload}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((response1) => {
        console.log(response1, "INI HAPUSSS");
        dispatch(deleteGenre(payload));
        // if (response1) window.location.reload();
      })
      .catch((error) => {
        console.log(error, "INI ERRORRNYAAAA");
      });
  };
}
