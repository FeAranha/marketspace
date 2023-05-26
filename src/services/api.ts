import axios from "axios";
import { AppError } from "@utils/AppError";

export const api = axios.create({
  baseURL: 'http://172.22.65.54:3333'
});

api.interceptors.response.use((response) => response, (error) => {
  if(error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message))
  } else {
    return Promise.reject(error)
  }
})