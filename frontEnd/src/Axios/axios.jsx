import axios from "axios";
import { BASE_URL, TOKEN } from "../Constants/constant";
import { nav } from "../Constants/routes";


const instance = axios.create({
  baseURL: BASE_URL,
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem(TOKEN)}`;
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = nav.HOME;
    }
  }
);
export default instance;
