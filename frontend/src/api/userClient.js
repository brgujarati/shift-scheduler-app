import axios from "axios";

const userClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/users`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 🔐 Send cookies with every request
});

export default userClient;
