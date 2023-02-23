import axios from 'axios'
import { IUser } from './contexts/UserContext'
import { routes } from './routes'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api'
})

axiosClient.interceptors.request.use((config) => {
    let user = localStorage.getItem('user') as any satisfies IUser
    if (user != null) user = JSON.parse(user)
    config.headers.Authorization = 'Bearer ' + user?.token
    return config
})

axiosClient.interceptors.response.use((res) => res, err => {
    if (err.response && err.response.status === 401) {
        routes.navigate('/login')
        return err
    } throw err
})

export default axiosClient