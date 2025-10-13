import axios from 'axios'

const baseURL = "http://192.168.100.6:8000"

const instance = axios.create({
    baseURL: baseURL,
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access")
    config.headers.Authorization = `Bearer ${token}`;
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refresh = localStorage.getItem("refresh")
      try {
        const res = await axios.post(`${baseURL}api/user/token/refresh/`, { refresh })
        const access = res.data.access
        localStorage.setItem("access", access)

        // retry original request with new token
        error.config.headers["Authorization"] = `Bearer ${access}`
        return axios(error.config)
      } catch (err) {
        document.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

export default instance;
