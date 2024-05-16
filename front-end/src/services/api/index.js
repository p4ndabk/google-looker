import axios from "axios";
import { readStorage, removeStorage } from "@/utils/authentication";

// Cria uma instância do Axios configurada
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Authorization: "",
    },
  });

  // Interceptor para requisições
  instance.interceptors.request.use((config) => {
    const token = readStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Interceptor para respostas
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        removeStorage();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const api = createAxiosInstance();


const ping = async () => {
  return api.get("/ping");
};

const getData = async (content) => {
  return api.post("/looker/data", content).then((response) => response.data?.data);
};

const getDashboardFilters = async (content) => {
  return api
    .post("/looker/dashboard/filters", content)
    .then((response) => response.data?.filters);
};

export { ping, getData, getDashboardFilters };
