const axios = require("axios");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../../assets/baseUrl";

//*************** */
export function setToken(token) {
  return (dispatch) => {
    dispatch({
      type: "user/set",
      payload: token,
    });
  };
}
//   const isLogin = useSelector((state) => state.isLogin);

//diperlukan
export function fetchQuarantine() {
  return async function (dispatch, getState) {
    try {
      const value = await AsyncStorage.getItem("access_token");
      let resp = await axios.get(`${baseUrl}/quarantines/`, {
        headers: {
          access_token: value,
        },
      });
      // setMyQuarantine(resp.data);
      setToken(value);
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
