// src/api/authClient.js
import axios from "axios";

const authClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 🔐 Send cookies with every request
});

export default authClient;
