import { createContext, ReactNode, useContext, useState } from 'react'

export interface IUser {
    token: string | null
    user?: {
        name: string;
        email: string;
        imageUrl: string
        created_at: string
        email_verified_at?: string
        id: number
        updated_at: string
    }
}

interface IUserContext {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>
}

const initialState = {
    name: 'Unknown',
    email: 'Unknown',
    imageUrl: '',
    created_at: '',
    email_verified_at: '',
    id: 0,
    updated_at: ''
}

const UserContext = createContext<IUserContext>({
    user: {
        user: undefined,
        token: null
    },
    setUser: () => { },
})

export const useUserContext = () => useContext(UserContext)

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>(() => {
        let token = localStorage.getItem('token')
        if (token != null) {
            token = JSON.parse(token)
            return { token, user: initialState }
        }
        return {
            user: initialState,
            token: null
        }
    })
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}