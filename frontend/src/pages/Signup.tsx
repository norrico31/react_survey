import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import axiosClient from './../axios';
import { useUserContext } from '../contexts';

export default function Signup() {
    const { setUser } = useUserContext()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [error, setError] = useState({ __html: "" })

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError({ __html: '' })
        axiosClient.post('/signup', {
            name: fullName,
            email,
            password,
            password_confirmation: passwordConfirmation,
        }).then(({ data }) => {
            localStorage.setItem('token', JSON.stringify(data.token))
            setUser({ user: data.user, token: data.token })
        }).catch(({ response }) => {
            const errors = Object.values(response?.data?.errors)?.reduce((acc: any, err: any) => [...acc, ...err], []) as string[]
            setError({ __html: errors.join('<br>') })
        })
    }

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up for free
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Login with your account
                </Link>
            </p>
            {error.__html && (
                <div className="bg-red-500 rounded py-2 px-3 text-white text-center" dangerouslySetInnerHTML={error} />
            )}
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="full-name" className="sr-only">
                            Full Name
                        </label>
                        <input
                            id="full-name"
                            name="Name"
                            type="text"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(evt) => setFullName(evt.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password-confirmation" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password-confirmation"
                            name="password_confirmation"
                            type="password"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password Confirmation"
                            value={passwordConfirmation}
                            onChange={(evt) => setPasswordConfirmation(evt.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                        </span>
                        Signup
                    </button>
                </div>
            </form>
        </>
    )
}
