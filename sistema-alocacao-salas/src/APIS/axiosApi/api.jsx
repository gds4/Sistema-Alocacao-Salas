import axios from "axios";

const api = axios.create({
  baseURL:'https://localhost:8082'
});
export default api;