import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5174", // sua API aqui
  timeout: 10000,                   // segurança: evita travar
});

// Interceptador opcional (para tokens JWT)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
