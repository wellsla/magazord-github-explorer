import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_GITHUB_API_URL is not defined inside application environment."
  );
}

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento específico para rate limit do GitHub
    if (error.response?.status === 403) {
      console.log("Rate limit exceeded. Please try again later.");
    }

    // Tratamento para usuários não encontrados
    if (error.response?.status === 404) {
      console.log("User not found. Please check the username and try again.");
    }

    return Promise.reject(error);
  }
);

export default http;
