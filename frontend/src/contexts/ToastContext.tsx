import { createContext, ReactNode, useContext, useState } from 'react'


const ToastContext = createContext<{ toast: string | undefined; setToast: (m: string) => void }>({
    toast: undefined,
    setToast: (message: string) => null
})

export const useToastContext = () => useContext(ToastContext)

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, _setToast] = useState<string | undefined>(undefined)
    function setToast(message: string) {
        _setToast(message)
        setTimeout(() => _setToast(undefined), 5000)
    }
    return (
        <ToastContext.Provider value={{ toast, setToast }}>{children}</ToastContext.Provider>
    )
}