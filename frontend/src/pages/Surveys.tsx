import { useState, useEffect } from 'react'
import { Button, PageContent, Pagination } from '../components/'
import { ISurvey } from '../contexts'
import SurveyListItem from '../components/SurveyListItem'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import axiosClient from '../axios'
import { useToastContext } from '../contexts/ToastContext'

export default function Surveys() {
    const { showToast } = useToastContext()
    const [surveys, setSurveys] = useState<Array<ISurvey>>([])
    const [loading, setLoading] = useState(false)
    const [meta, setMeta] = useState({
        current_page: 0,
        from: 0,
        last_page: 0,
        links: [],
        path: "",
        per_page: 0,
        to: 0,
        total: 0,
    })

    useEffect(function fetchSurveys() {
        let cleanUp = false;
        !cleanUp && getSurveys(1)
        return function () {
            cleanUp = true
        }
    }, [])

    function getSurveys(pageNumber: number) {
        setLoading(true)
        axiosClient.get(pageNumber > 1 ? `/surveys?page=${pageNumber}` : '/surveys')
            .then(({ data }) => {
                setSurveys(data.data)
                setMeta(data.meta)
            })
            .finally(() => setLoading(false))
    }

    function deleteSurvey(id: number) {
        if (window.confirm(`Are you sure you want to delete this survey?`)) {
            axiosClient.delete('/surveys/' + id)
                .then(() => {
                    showToast('Delete survey successfully!')
                    getSurveys(meta.current_page)
                })
        }
    }

    return (
        <>
            <PageContent
                title='Surveys'
                button={(
                    <Button color='green' to='/surveys/create'>
                        <PlusCircleIcon className='h-6 w-6 mr-2' />
                        Create Survey
                    </Button>
                )}
            >
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {!surveys.length ? (
                            <div className="py-8 text-center text-gray-700">You don't have surveys created</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                                {surveys.map((survey: any) => <SurveyListItem survey={survey} key={survey.id} onClick={deleteSurvey} />)}
                            </div>
                        )}
                        {surveys.length > 0 && <Pagination meta={meta} getSurveys={getSurveys} />}
                    </div>
                )}
            </PageContent>
        </>
    )
}
