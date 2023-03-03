import { useState, useEffect } from 'react'
import { Button, PageContent, Pagination } from '../components/'
import { ISurvey } from '../contexts'
import SurveyListItem from '../components/SurveyListItem'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import axiosClient from '../axios'

export default function Surveys() {
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
                setLoading(false)
            })
    }

    function deleteSurvey(id: number) {
        axiosClient.delete('/surveys/' + id)
            .then(() => {
                if (window.confirm(`Are you sure you want to delete this survey?`)) {
                    getSurveys(meta.current_page)
                }
            })
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
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                            {surveys.map((survey: any) => <SurveyListItem survey={survey} key={survey.id} onClick={deleteSurvey} />)}
                        </div>
                        <Pagination meta={meta} getSurveys={getSurveys} />
                    </div>
                )}
            </PageContent>
        </>
    )
}
