import { HeaderContent, MainContent } from '../components/'
import { useSurveyContext } from '../contexts'
import SurveyListItem from '../components/SurveyListItem'

export default function Surveys() {
    const { surveys } = useSurveyContext()

    function deleteSurvey(id: number) {

    }

    return (
        <>
            <HeaderContent title='Surveys' />
            <MainContent>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {surveys.map((survey: any) => <SurveyListItem survey={survey} key={survey.id} onClick={deleteSurvey} />)}
                </div>
            </MainContent>
        </>
    )
}
