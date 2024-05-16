import axios from 'axios';

export const login = formdata => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    // const { data } = await axios.post(
    //   `http://localhost:4000/api/v1/login`,
    //   { email, password },
    //   {
    //     headers: {
    //       'Content-type': 'application/json',
    //     },

    //     withCredentials: true,
    //   }
    // );

    const res = await fetch("/api/v1/login", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();
    console.log(data);

    if(data.success==false){
      dispatch({ type: 'loginFail', payload: data.message });
      return;
    }

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.message });
  }
};

export const register = formdata => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    console.log(formdata);

    // const { data } = await axios.post("/api/v1/register", formdata, {
    //   headers: {
    //     'Content-type': 'multipart/form-data',
    //   },

    //   withCredentials: true,
    // });

    // console.log(data);

    const res = await fetch("/api/v1/register", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await res.json();

    console.log(data);

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const res=await fetch("/api/v1/getProfile");
    const data=await res.json();

    console.log(data);

    
    if(data.success==false){
      dispatch({ type: 'loadUserFail', payload: data.message });
      return;
    }

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.message });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    // const { data } = await axios.get(`/api/v1/logout`, {
    //   withCredentials: true,
    // });

    const res=await fetch("/api/v1/logout");
    const data=await res.json();

    if(data.success==false){
      dispatch({ type: 'logoutFail', payload: data.message });
      return;
    }

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};