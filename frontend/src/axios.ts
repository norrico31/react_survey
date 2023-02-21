import axios from 'axios'
import { routes } from './routes'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api'
})

axiosClient.interceptors.request.use((config) => {
    const token = '123'
    config.headers.Authorization = 'Bearer ' + token
    return config
})

axiosClient.interceptors.response.use((res) => res, err => {
    if (err.response && err.response.status === 401) {
        routes.navigate('/login')
        return err
    } throw err
})

export default axiosClient