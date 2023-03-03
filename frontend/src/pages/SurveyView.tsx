import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid"
import { PhotoIcon } from '@heroicons/react/24/outline'
import { IQuestion, ISurvey, useToastContext } from '../contexts'
import { Button, PageContent } from '../components'
import axiosClient from '../axios'
import SurveyQuestions from '../components/SurveyQuestions'

const initSurveyState = {
    title: "",
    slug: "",
    status: false,
    description: "",
    image: '',
    image_url: '',
    expire_date: "",
    created_at: '',
    questions: [],
    updated_at: '',
    id: 0
}

export default function SurveyView() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { showToast } = useToastContext()
    const [survey, setSurvey] = useState<ISurvey>(() => initSurveyState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [errors, setErrors] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        if (id != undefined) {
            axiosClient.get('/surveys/' + id)
                .then(({ data }) => {
                    setSurvey(data.data)
                    setLoading(false)
                })
        } else setLoading(false)
    }, [])

    const onImageChoose = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0]!;
        const reader = new FileReader();
        reader.onload = (evt: ProgressEvent<FileReader>) => {
            setSurvey({
                ...survey,
                image: evt?.target?.result!,
                image_url: reader?.result!,
            });

            ev.target.value = "";
        }
        reader.readAsDataURL(file);
    }

    function addQuestion() {
        survey.questions.push({
            id: uuidv4(),
            type: "text",
            question: "",
            description: "",
            data: {},
        })
        setSurvey({ ...survey })
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null)
        setErrors(null)
        const { image_url, ...payload } = survey

        if (payload['image']) payload['image'] = image_url!

        const result = id != undefined ? axiosClient.put('/surveys/' + id, payload) : axiosClient.post('/surveys', payload)

        result.then(() => {
            showToast(id ? 'Update survey successfully!' : 'Create survey successfully!')
            setSurvey({ ...initSurveyState })
            navigate('/surveys')
        }).catch(err => {
            console.log(err.response.data)
            if (err && err.response.data.message) {
                setError(err.response.data.message)
            } else if (err && err.response.data.errors) {
                setErrors(err.response.data.errors)
            } else throw Error('Errorrrrr')
            return err
        })

    }

    return (
        <PageContent title={id == undefined ? 'Create Survey' : 'Update Survey'}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <form method='post' onSubmit={onSubmit} autoComplete='off'>
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            {error != null && (
                                <div className="bg-red-500 text-white py-3 px-3">
                                    {error}
                                </div>
                            )}
                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Photo
                                </label>
                                <div className="mt-1 flex items-center">
                                    {survey.image_url && (
                                        <img
                                            src={survey.image_url + ''}
                                            alt=""
                                            className="w-32 h-32 object-cover"
                                        />
                                    )}
                                    {!survey.image_url && (
                                        <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                            <PhotoIcon className="w-8 h-8" />
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <input
                                            type="file"
                                            className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                                            onChange={onImageChoose}
                                        />
                                        Upload Image
                                    </button>
                                </div>
                            </div>
                            {/* Image */}
                            {/*Title*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Survey Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete='off'
                                    value={survey.title}
                                    onChange={(ev) =>
                                        setSurvey({ ...survey, title: ev.target.value })
                                    }
                                    placeholder="Survey Title"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            {/*Title*/}

                            {/*Description*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                {/* <pre>{ JSON.stringify(survey, undefined, 2) }</pre> */}
                                <textarea
                                    name="description"
                                    id="description"
                                    autoComplete='off'
                                    value={survey.description || ""}
                                    onChange={(ev) =>
                                        setSurvey({ ...survey, description: ev.target.value })
                                    }
                                    placeholder="Describe your survey"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>
                            {/*Description*/}

                            {/*Expire Date*/}
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="expire_date"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Expire Date
                                </label>
                                <input
                                    type="date"
                                    name="expire_date"
                                    id="expire_date"
                                    value={survey.expire_date}
                                    onChange={(ev) =>
                                        setSurvey({ ...survey, expire_date: ev.target.value })
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            {/*Expire Date*/}

                            {/*Active*/}
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="status"
                                        name="status"
                                        type="checkbox"
                                        checked={survey.status}
                                        onChange={(ev) =>
                                            setSurvey({ ...survey, status: ev.target.checked })
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="status"
                                        className="font-medium text-gray-700"
                                    >
                                        Active
                                    </label>
                                    <p className="text-gray-500">
                                        Whether to make survey publicly available
                                    </p>
                                </div>
                            </div>
                            {/*Active*/}

                            <button type="button" onClick={addQuestion}>
                                Add question
                            </button>
                            <SurveyQuestions
                                questions={survey?.questions ?? []}
                                onQuestionsUpdate={(questions: IQuestion[]) => setSurvey({ ...survey, questions })}
                            />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                            <Button type='submit'>{id == undefined ? 'Save' : 'Update'}</Button>
                        </div>
                    </div>
                </form>
            )}
        </PageContent>
    )
}
