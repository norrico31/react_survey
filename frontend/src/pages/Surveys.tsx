import { useState, useEffect } from 'react'
import { Button, PageContent } from '../components/'
import { useSurveyContext, ISurvey } from '../contexts'
import SurveyListItem from '../components/SurveyListItem'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import axiosClient from '../axios'

export default function Surveys() {
    // const { surveys } = useSurveyContext()
    const [surveys, setSurveys] = useState<Array<ISurvey>>([])

    useEffect(function fetchSurveys() {
        axiosClient.get('/surveys')
            .then(({ data: { data } }) => {
                setSurveys(data)
            })
    }, [])

    function deleteSurvey(id: number) {
        console.log('delete survey: ', id)
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
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {surveys.map((survey: any) => <SurveyListItem survey={survey} key={survey.id} onClick={deleteSurvey} />)}
                </div>
            </PageContent>
        </>
    )
}
