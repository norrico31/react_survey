import { createBrowserRouter, Navigate } from "react-router-dom";
import { GuestLayout, DefaultLayout } from "./components";
import { Dashboard, Login, Signup, SurveyPublic, Surveys, SurveyView, _Dashboard } from './pages/'

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
                element: <_Dashboard />
            },
            {
                path: 'surveys',
                element: <Surveys />
            },
            {
                path: 'surveys/:id',
                element: <SurveyView />
            },
            {
                path: 'surveys/create',
                element: <SurveyView />
            },
        ]
    },
    {
        path: '/surveys',
        element: <Surveys />
    },
    {
        path: '/',
        element: <GuestLayout />,
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
    {
        path: '/survey/public/:slug',
        element: <SurveyPublic />
    }
])