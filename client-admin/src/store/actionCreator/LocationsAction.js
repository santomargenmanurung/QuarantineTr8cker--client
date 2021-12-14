import { LOCATION_ADD, LOCATION_LOADING, LOCATION_FETCH } from "../actionType/LocationType";
// import Swal from "sweetalert2";
  
  import { baseUrl } from "../helper/url";
  
  function setFetchLocations(payload) {
    return {
      type: LOCATION_FETCH,
      payload,
    };
  }
  
  
  function locationLoading(payload) {
    return {
      type: LOCATION_LOADING,
      payload,
    };
  }
  
  export function fetchLocations(payload) {
    return function (dispatch, getState) {
      dispatch(locationLoading(true));
      fetch(`${baseUrl}/locations?size=20`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            access_token: localStorage.access_token,
          },
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        })
        .then((data) => {
          console.log(data.pageData)
          dispatch(setFetchLocations(data.pageData));
        })
  
        .catch((error) => {
          console.log(error);
        });
    };
  }
