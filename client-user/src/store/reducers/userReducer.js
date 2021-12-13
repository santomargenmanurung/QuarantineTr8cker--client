const initializeState = {
  access_token: "",
  isLoading: true,
  error: null,
};

export default function userReducer(state = initializeState, action) {
  console.log(action, "INI ADLAH ACTIONYA");
  switch (action.type) {
    case "user/set":
      console.log(action.payload, "INI DI USER REDUCER");
      return {
        ...state,
        access_token: action.payload,
        isLoading: false,
      };
    case "user/loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "user/error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
