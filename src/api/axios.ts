import axios from "axios"

export const api = axios.create({
    baseURL: "https://purge-backend.onrender.com",
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("purge_token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("purge_token")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)