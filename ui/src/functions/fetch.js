export const API_HOST = "http://localhost:8000";

export async function apiConnect(route, params = null, method = "GET") {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const url = `${API_HOST}${route}`;
    const options = {
      method,
      headers: {},
    };
    if (user?.token) {
      options.headers["x-access-token"] = `Bearer ${user?.token}`;
    }
    if (params) {
      options.body = JSON.stringify(params);
    }
    const response = await fetch(url, options);
    if (response?.status !== 200) {
      throw new Error("response not 200");
    }
    return await response.json();
  } catch (error) {
    console.error(error || "เกิดข้อผิดพลาด");
    return null;
  }
}
