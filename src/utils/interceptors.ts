import axios, { AxiosResponse } from "axios";

const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  maxDuration: 5,
};

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  ...config,
});

AxiosInstance.interceptors.request.use(async (config ) => {
  const tz = localStorage.getItem("tz");
  config.headers["x-time-zone"] = tz;
  return config;
});
AxiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (error) => {
    console.log(error);
    if (error?.response?.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
