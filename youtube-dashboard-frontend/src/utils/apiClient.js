import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL + "/api/";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
