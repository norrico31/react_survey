import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login, Signup, Surveys } from './pages/'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/surveys',
        element: <Surveys />
    },
])