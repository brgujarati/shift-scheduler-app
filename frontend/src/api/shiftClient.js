import axios from "axios";

const shiftClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/shifts`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 🔐 Send cookies with every request
});

export default shiftClient;
