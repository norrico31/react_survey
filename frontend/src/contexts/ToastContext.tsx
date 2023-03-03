import { createContext, ReactNode, useContext, useState } from 'react'


const ToastContext = createContext<{ toast: string | undefined; showToast: (m: string) => void }>({
    toast: undefined,
    showToast: (message: string) => null
})

export const useToastContext = () => useContext(ToastContext)

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<string | undefined>(undefined)
    function showToast(message: string) {
        setToast(message)
        setTimeout(() => setToast(undefined), 5000)
    }
    return (
        <ToastContext.Provider value={{ toast, showToast }}>{children}</ToastContext.Provider>
    )
}