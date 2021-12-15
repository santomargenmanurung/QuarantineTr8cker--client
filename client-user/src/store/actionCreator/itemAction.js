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
