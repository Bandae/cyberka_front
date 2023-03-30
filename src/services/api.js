import axios from "axios";
import { useAuthStore } from "@/stores/auth_store.js";
// 3000
export default (
  url = 'http://localhost:8000/',
  withCredentials = false,
  headers = {'Content-Type': 'application/json'}) => {

  return axios.create({
    baseURL: url,
    withCredentials: withCredentials,
    headers: headers
  });
};
