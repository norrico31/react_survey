import axios from 'axios'
import { IUser } from './contexts/UserContext'
import { routes } from './routes'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api'
})

axiosClient.interceptors.request.use((config) => {
    let token = localStorage.getItem('token') as any satisfies IUser
    if (token != null) token = JSON.parse(token)
    config.headers.Authorization = 'Bearer ' + token
    return config
})

axiosClient.interceptors.response.use((res) => res, err => {
    if (err.response && err.response.status === 401) {
        localStorage.clear()
        window.location.reload()
        // routes.navigate('/login')
        return err
    } throw err
})

export default axiosClient