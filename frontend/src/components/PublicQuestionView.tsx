import { IQuestion } from '../contexts'

type PublicQuestionViewProps = {
    question: IQuestion
    idx: number
}

export default function PublicQuestionView({ question, idx }: PublicQuestionViewProps) {
    return (
        <div>PublicQuestionView</div>
    )
}
