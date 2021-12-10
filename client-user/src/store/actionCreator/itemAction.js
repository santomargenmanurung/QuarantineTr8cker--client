import {
  ITEMS_LOADING,
  QUARLIST,
  ISLOGIN,
  DELETEMOVIE,
  ADD_MOVIE,
} from "../actionType/itemActionType";
// import swal from "sweetalert";
const axios = require("axios");
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { baseUrl } from "../helper/url";

// export function setIsLogin(payload) {
//   return {
//     type: ISLOGIN,
//     payload,
//   };
// }

// export function setAddMovie(payload) {
//   return {
//     type: ADD_MOVIE,
//     payload,
//   };
// }

function setQuarantineList(payload) {
  return {
    type: QUARLIST,
    payload,
  };
}

// function setDeleteMovie(payload) {
//   return {
//     type: DELETEMOVIE,
//     payload,
//   };
// }

// function itemsLoading(payload) {
//   return {
//     type: ITEMS_LOADING,
//     payload,
//   };
// }

//diperlukan
export function fetchQuarantine() {
  return async function (dispatch, getState) {
    try {
      const value = await AsyncStorage.getItem("access_token");
      let resp = await axios.get(`http://192.168.100.77:3000/quarantines/`, {
        headers: {
          access_token: value,
        },
      });
      // setMyQuarantine(resp.data);
      dispatch(setQuarantineList(resp.data));
    } catch (error) {
      console.log(error);
    }
  };
}

// export function addMovie(payload, payload2) {
//   return function (dispatch, getState) {
//     // dispatch(categoriesLoading());
//     fetch(`${baseUrl}/data`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         access_token: localStorage.access_token,
//       },
//       body: payload,
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error(response.statusText);
//         return response.json();
//       })
//       .then((response1) => {
//         dispatch(setAddMovie(response1));
//         swal(
//           "Movie Added!",
//           `movie named ${payload2.title} has been added`,
//           "success"
//         );
//       })
//       .catch((error) => {
//         console.log(error, "INI ERRORRNYAAAA");
//       });
//   };
// }

// export function removeMovie(payload) {
//   return function (dispatch, getState) {
//     // dispatch(categoriesLoading());
//     fetch(`${baseUrl}/data/${payload}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         access_token: localStorage.access_token,
//       },
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error(response.statusText);
//         return response.json();
//       })
//       .then((response1) => {
//         console.log(response1, "INI HAPUSSS");
//         dispatch(setDeleteMovie(payload));
//         // swal(
//         //   "Movie Added!",
//         //   `movie with id ${payload} has been deleted`,
//         //   "success"
//         // );
//       })
//       .catch((error) => {
//         console.log(error, "INI ERRORRNYAAAA");
//       });
//   };
// }

// export function registerAccount(payload) {
//   return function (dispatch, getState) {
//     fetch(`${baseUrl}/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: payload,
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error(response.statusText);
//         return response.json();
//       })
//       .then((response1) => {
//         console.log(response1, "INI JAWABAN");
//       })
//       .catch((error) => {
//         console.log(error, "INI ERRORRNYAAAA");
//       });
//   };
// }
