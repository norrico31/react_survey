import { createContext, ReactNode, useContext, useState } from 'react'


const ToastContext = createContext<{ toast: string | undefined; setToast: React.Dispatch<React.SetStateAction<string | undefined>> }>({
    toast: undefined,
    setToast: () => null
})

export const useToastContext = () => useContext(ToastContext)

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<string | undefined>(undefined)
    return (
        <ToastContext.Provider value={{ toast, setToast }}>{children}</ToastContext.Provider>
    )
}