import { ReactNode } from "react";

type CardProps = {
    title: string
    children?: ReactNode
    style: any
    className: string
}

export default function Card({ title, children, style = '', className = '' }: CardProps) {
    className += ' bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down'
    return (
        <div className={className} style={style}>
            {title && <h3 className="text-2xl font-semibold">{title}</h3>}
            {children}
        </div>
    );
}
