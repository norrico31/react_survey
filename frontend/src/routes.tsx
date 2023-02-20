import { createBrowserRouter, Navigate } from "react-router-dom";
import { GuestLayout, DefaultLayout } from "./components";
import { Dashboard, Login, Signup, Surveys } from './pages/'

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to='/' />
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: 'surveys',
                element: <Surveys />
            },
            {
                path: 'surveys/create',
                element: <Surveys />
            },
        ]
    },
    {
        path: '/surveys',
        element: <Surveys />
    },
    {
        path: '/',
        element: <GuestLayout />, // use <Outlet /> to render the children
        children: [
            {
                path: 'signup',
                element: <Signup />
            },
            {
                path: 'login',
                element: <Login />
            },
        ]
    },
])