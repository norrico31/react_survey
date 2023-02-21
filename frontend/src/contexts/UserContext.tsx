import { createContext, ReactNode, useContext, useState } from 'react'

interface IUser {
    token: string | null
    user?: {
        name: string;
        email: string;
        imageUrl: string
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
    const [user, setUser] = useState<IUser>({
        user: initialState,
        token: null
    })
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}