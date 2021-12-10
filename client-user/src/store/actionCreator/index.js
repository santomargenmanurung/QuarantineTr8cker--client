export function setMovies(payload) {
  return {
    type: "movies/setMovies",
    payload: payload,
  };
}

export function setIsLogin(payload) {
  return {
    type: "login/setLogin",
    payload: payload,
  };
}

export function setMovieDetail(payload) {
  return {
    type: "movieDetail/setDetail",
    payload: payload,
  };
}
