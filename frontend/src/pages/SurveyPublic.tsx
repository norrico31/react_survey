import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios'
import { PublicQuestionView } from '../components/';
import { ISurvey } from './../contexts/SurveyContext';

export default function SurveyPublic() {
    const { slug } = useParams()
    const [survey, setSurvey] = useState<ISurvey | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let cleanUp = false;
        setLoading(true)
        axiosClient.get('/survey/get-by-slug/' + slug)
            .then((res) => {
                if (!cleanUp) {
                    setSurvey(res.data.data)
                }
            }).finally(() => setLoading(false))
        return function () {
            cleanUp = true
        }
    }, [])

    function onSubmit(e: React.FormEvent) {

    }

    return (
        <>
            {loading ? <div className="flex justify-center">Loading..</div> : (
                <form onSubmit={onSubmit} className="container mx-auto p-4">
                    <div className="grid grid-cols-6">
                        <div className="mr-4">
                            <img src={survey?.image_url + ''} alt="" />
                        </div>

                        <div className="col-span-5">
                            <h1 className="text-3xl mb-3">{survey?.title}</h1>
                            <p className="text-gray-500 text-sm mb-3">
                                Expire Date: {survey?.expire_date}
                            </p>
                            <p className="text-gray-500 text-sm mb-3">{survey?.description}</p>
                        </div>
                    </div>
                    {surveyFinished ? (
                        <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
                            Thank you for participating in the survey
                        </div>
                    ) : (
                        <>
                            <div>
                                {(survey?.questions ?? []).map((question, index) => (
                                    <PublicQuestionView
                                        key={question.id}
                                        question={question}
                                        idx={index}
                                        answerChanged={(val) => answerChanged(question, val)}
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </>
                    )}
                </form>
            )}
        </>
    )
}
