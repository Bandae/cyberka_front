import axios from "axios";
import { useAuthStore } from "@/stores/auth_store.js";
// 3000
export default (
  withCredentials = false,
  headers = {'Content-Type': 'application/json'},
  url = 'http://localhost:8000/'
  ) => {

  return axios.create({
    withCredentials: withCredentials,
    headers: headers,
    baseURL: url
  });
};
