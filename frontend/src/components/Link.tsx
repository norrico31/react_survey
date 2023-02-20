import { ReactNode } from "react"
import { Link as ReactDoMLink } from "react-router-dom"

export default function Link({
    color = 'indigo',
    to,
    circle = false,
    href,
    link = false,
    target = '_blank',
    onClick,
    children
}: TLink) {
    let classes = [
        "flex",
        "items-center",
        "whitespace-nowrap",
        "text-sm",
        "border",
        "border-2",
        "border-transparent",
    ]
    if (link) {
        classes = [...classes, "transition-colors"]
        const objClasses: ObjKeyed = {
            'indigo': [...classes, "text-indigo-500", "focus:border-indigo-500"],
            'red': [...classes, "text-red-500", "focus:border-red-500"]
        }
        classes = objClasses[color]
    } else {
        classes = [...classes, "text-white", "focus:ring-2", "focus:ring-offset-2"]
        const objClasses: ObjKeyed = {
            'indigo': [
                ...classes,
                "bg-indigo-600",
                "hover:bg-indigo-700",
                "focus:ring-indigo-500",
            ],
            'red': [
                ...classes,
                "bg-red-600",
                "hover:bg-red-700",
                "focus:ring-red-500",
            ],
            'green': [
                ...classes,
                "bg-emerald-500",
                "hover:bg-emerald-600",
                "focus:ring-emerald-400",
            ]
        }
        classes = objClasses[color]
    }
    if (circle) {
        classes = [
            ...classes,
            "h-8",
            "w-8",
            "items-center",
            "justify-center",
            "rounded-full",
            "text-sm",
        ]
    } else {
        classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"]
    }
    return <>
        {href && (
            <ReactDoMLink to={href} className={classes.join(" ")} target={target}>
                {children}
            </ReactDoMLink>
        )}
        {to && (
            <ReactDoMLink to={to} className={classes.join(" ")}>
                {children}
            </ReactDoMLink>
        )}
        {!to && !href && (
            <button onClick={(e) => {
                e.stopPropagation()
                onClick?.()
            }} className={classes.join(" ")}>{children}</button>
        )}
    </>
}


type TLink = {
    color?: string
    to?: string
    circle?: boolean
    href?: string
    link?: boolean
    target?: string
    children: ReactNode
    onClick?: () => void
}

type ObjKeyed = { [k: string]: string[] }