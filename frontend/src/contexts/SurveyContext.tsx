import { createContext, ReactNode, useContext, useState } from 'react'

interface IUserContext {
    surveys: any;
    setSurveys: React.Dispatch<React.SetStateAction<any>>
}

const SurveyContext = createContext<IUserContext>({
    surveys: [],
    setSurveys: () => null,
})

export const useSurveyContext = () => useContext(SurveyContext)

export default function SurveyProvider({ children }: { children: ReactNode }) {
    const [surveys, setSurveys] = useState([])
    return <SurveyContext.Provider value={{ surveys, setSurveys }}>{children}</SurveyContext.Provider>
}