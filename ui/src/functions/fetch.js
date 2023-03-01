import { API_HOST } from "../utils/constants";

export const apiConnect = async (path, params, method) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  const options = {
    method: method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (params) {
    options.body = JSON.stringify(params);
  }
  if (user && user?.token) {
    options.headers.Authorization = `Bearer ${user?.token}`;
  }

  try {
    const response = await fetch(API_HOST + path, options);
    return await response.json();
  } catch (error) {
    throw error;
  }
};
