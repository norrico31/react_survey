import { createContext, ReactNode, useContext, useState } from 'react'

const initialQuestionTypesState = ['text', "select", "radio", "checkbox", "textarea"]
interface ISurveyContext {
    surveys: ISurvey[];
    setSurveys: React.Dispatch<React.SetStateAction<any>>
    questionTypes: typeof initialQuestionTypesState
}

interface Questions {
    id: string
    survey_id: string
    type: string
    question: string
    description?: string
    data?: string
}

export interface ISurvey {
    id: number
    image_url?: string | ArrayBuffer | null
    image?: string | ArrayBuffer | null
    title: string
    slug: string
    status: boolean
    description?: string
    created_at: string
    updated_at?: string
    expire_date?: string
    questions?: Questions[]
}

const SurveyContext = createContext<ISurveyContext>({
    surveys: [],
    questionTypes: initialQuestionTypesState,
    setSurveys: () => null,
})

export const useSurveyContext = () => useContext(SurveyContext)

export default function SurveyProvider({ children }: { children: ReactNode }) {
    const [surveys, setSurveys] = useState<ISurvey[]>([...tmpSurveys])
    const [questionTypes] = useState<typeof initialQuestionTypesState>(initialQuestionTypesState)
    return <SurveyContext.Provider value={{ surveys, setSurveys, questionTypes } as const}>{children}</SurveyContext.Provider>
}

const tmpSurveys = [
    {
        "id": 1,
        "image_url": "https:\/\/api.yoursurveys.xyz\/images\/vJutXzn02CDwdOyh.png",
        "title": "TheCodeholic YouTube channel",
        "slug": "thecodeholic-youtube-channel",
        "status": true,
        "description": "My name is Zura.<br>I am Web Developer with 9+ years of experience, free educational content creator, CTO, Lecturer and father of two wonderful daughters.<br><br>The purpose of the channel is to share my several years of experience with beginner developers.<br>Teach them what I know and make my experience as a lesson for others.",
        "created_at": "2022-01-07 13:23:41",
        "updated_at": "2022-01-18 16:34:19",
        "expire_date": "2022-01-23",
        "questions": []
    },
    {
        "id": 2,
        "image_url": "https:\/\/api.yoursurveys.xyz\/images\/gjIHElz4aKrL0nT0.png",
        "title": "React",
        "slug": "react",
        "status": true,
        "description": "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
        "created_at": "2022-01-07 08:50:40",
        "updated_at": "2022-01-07 13:37:37",
        "expire_date": "2022-02-01",
        "questions": []
    },
    {
        "id": 3,
        "image_url": "https:\/\/api.yoursurveys.xyz\/images\/WPfzo0g66huUYYwR.png",
        "title": "Laravel 9",
        "slug": "laravel-9",
        "status": true,
        "description": "Laravel is a web application framework with expressive, elegant syntax. We\u2019ve already laid the foundation \u2014 freeing you to create without sweating the small things.",
        "created_at": "2022-01-07 13:28:56",
        "updated_at": "2022-01-07 13:28:56",
        "expire_date": "2022-01-20",
        "questions": []
    },
]