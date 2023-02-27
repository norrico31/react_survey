import { PlusIcon } from "@heroicons/react/24/outline";
import { ISurvey } from "../contexts/SurveyContext";
import QuestionEditor from "./QuesitonEditor";

type SurveyQuestionProps = {
    questions: string[]
    onQuestionsUpdate: (surveyId: ISurvey) => void
}

export default function SurveyQuestions({ questions, onQuestionsUpdate }: SurveyQuestionProps) {

    // useEffect(() => {
    //     setMyQuestions(questions)
    //   }, [questions])

    function addQuestion(e: React.MouseEvent) {

    }

    const questionChange = (question) => {
        if (!question) return;
        const newQuestions = questions.map((q) => {
            if (q.id == question.id) {
                return { ...question };
            }
            return q;
        });
        // setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions)
    }

    const deleteQuestion = (question) => {
        const newQuestions = questions.filter((q) => q.id !== question.id);

        // setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions)
    }

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Questions</h3>
                <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                // onClick={() => addQuestion()}
                >
                    <PlusIcon className="w-4 mr-2" />
                    Add question
                </button>
            </div>
            {questions.length ? (
                questions.map((q, ind: number) => (
                    <QuestionEditor
                        key={q.id}
                        index={ind}
                        question={q}
                        questionChange={questionChange}
                        addQuestion={addQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))
            ) : (
                <div className="text-gray-400 text-center py-4">
                    You don't have any questions created
                </div>
            )}
        </>
    )
}
