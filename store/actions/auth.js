export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (username, token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, username: username, token: token });
  };
};

export const signup = (username, email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://192.168.42.93:8000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const message = "Something Went Wrong";
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.user.username, resData.token));
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://192.168.42.93:8000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const message = "Something Went Wrong";
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(authenticate(resData.user.username, resData.token));
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
