import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_GITHUB_API_URL não está definida nas variáveis de ambiente."
  );
}

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (r) => {
    return r;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;
