import authClient from "../api/authClient";

export const loginUser = (data) => authClient.post("/login", data);
export const registerUser = (data) => authClient.post("/register", data);
export const forgotPassword = (data) =>
  authClient.post("/forgotpassword", data); // adjust endpoint if needed
export const logoutUser = (data) => authClient.post("/logout", data);
