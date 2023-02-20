import { ArrowTopRightOnSquareIcon, TrashIcon, PencilIcon } from '@heroicons/react/20/solid'
import Link from './Link';

export default function SurveyListItem({ survey, onClick }: { survey: any; onClick?: (id: string) => void }) {
    function handleClick() {
        onClick?.(survey.id)
    }
    return (
        <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
            <img src={survey.image_url} alt={survey.title} className="w-full h-48 object-cover" />
            <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
            <div dangerouslySetInnerHTML={{ __html: survey.description }} className="overflow-hidden flex-1" />
            <div className="flex justify-between items-center mt-3">
                <Link to={`/surveys/${survey.id}`}>
                    <PencilIcon className="w-5 h-5 mr-2 " />
                    Edit
                </Link>
                <div className="flex items-center">
                    <Link href={`/view/survey/${survey.slug}`} circle link>
                        <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    </Link>

                    {survey.id && (
                        <Link onClick={handleClick} circle link color="red">
                            <TrashIcon className="w-5 h-5" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
