import { useToastContext } from "../contexts/ToastContext"

export default function Toast() {
    const { toast } = useToastContext()
    return toast != undefined ? (
        <div className="w-[300px] py-2 px-3 text-white rounded bg-emerald-500 fixed right-4 top-44 z-50 animate-fade-in-down">
            {toast}
        </div>
    ) : null
}