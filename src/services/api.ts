import axios from "axios";

export const api = axios.create({
  baseURL: 'http://172.22.65.54:3333'
});