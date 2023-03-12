import { useState, useEffect } from 'react'
import { PageContent } from '../components'
import axiosClient from './../axios'
import { Button } from '../components'
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline"
import Card from '../components/Card'
import { IAnswer, ILatestSurvey } from '../contexts'

interface IDashboardState {
    latest_answers: IAnswer[]
    latest_survey: ILatestSurvey
    total_answers: number
    total_surveys: number
}

export default function Dashboard() {
    const [data, setData] = useState<IDashboardState | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        let cleanUp = false;
        axiosClient.get('/dashboard')
            .then((res) => !cleanUp && setData(res.data))
            .finally(() => setLoading(false))
        return function () {
            cleanUp = true
        }
    }, [])

    return (
        <>
            <PageContent title='Dashboard'>
                {loading ? (
                    <div className="flex justify-center">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
                        <Card
                            title="Total Surveys"
                            className="order-1 lg:order-2"
                            style={{ animationDelay: '0.1s' }}
                        >
                            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                                {data?.total_surveys}
                            </div>
                        </Card>
                        <Card
                            title="Total Answers"
                            className="order-2 lg:order-4"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
                                {data?.total_answers}
                            </div>
                        </Card>
                        <Card
                            title="Latest Survey"
                            className="order-3 lg:order-1 row-span-2"
                            style={{ animationDelay: '0.2s' }}
                        >
                            {data?.latest_survey ? (
                                <div>
                                    <img
                                        src={data.latest_survey.image_url}
                                        className="w-[240px] mx-auto"
                                    />
                                    <h3 className="font-bold text-xl mb-3">
                                        {data.latest_survey.title}
                                    </h3>
                                    <div className="flex justify-between text-sm mb-1">
                                        <div>Create Date:</div>
                                        <div>{data.latest_survey.created_at}</div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <div>Expire Date:</div>
                                        <div>{data.latest_survey.expire_date}</div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <div>Status:</div>
                                        <div>{data.latest_survey.status ? "Active" : "Draft"}</div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <div>Questions:</div>
                                        <div>{data.latest_survey.questions}</div>
                                    </div>
                                    <div className="flex justify-between text-sm mb-3">
                                        <div>Answers:</div>
                                        <div>{data.latest_survey.answers}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <Button to={`/surveys/${data.latest_survey.id}`} link>
                                            <PencilIcon className="w-5 h-5 mr-2" />
                                            Edit Survey
                                        </Button>

                                        <Button link>
                                            <EyeIcon className="w-5 h-5 mr-2" />
                                            View Answers
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-600 text-center py-16">
                                    Your don't have surveys yet
                                </div>
                            )}
                        </Card>
                        <Card
                            title="Latest Answers"
                            className="order-4 lg:order-3 row-span-2"
                            style={{ animationDelay: '0.3s' }}
                        >
                            {data?.latest_answers != undefined ? (
                                <div className="text-left">
                                    {(data.latest_answers ?? []).map((answer) => (
                                        <a
                                            href="#"
                                            key={answer.id}
                                            className="block p-2 hover:bg-gray-100/90"
                                        >
                                            <div className="font-semibold">{answer.survey?.title}</div>
                                            <small>
                                                Answer Made at:
                                                <i className="font-semibold">{answer.end_date}</i>
                                            </small>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600 text-center py-16">
                                    Your don't have answers yet
                                </div>
                            )}
                        </Card>
                    </div>
                )}
            </PageContent>
        </>
    )
}
