import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"
import { PlusIcon } from "@heroicons/react/24/outline"
import { IQuestion } from "../contexts/SurveyContext"
import QuestionEditor from "./QuestionEditor"

type SurveyQuestionProps = {
    questions: IQuestion[]
    onQuestionsUpdate: (q: IQuestion[]) => void
}

export default function SurveyQuestions({ questions, onQuestionsUpdate }: SurveyQuestionProps) {
    const [myQuestions, setMyQuestions] = useState<IQuestion[]>([...questions]);

    useEffect(() => {
        setMyQuestions(questions)
    }, [questions])

    function addQuestion(index?: number) {
        index = index !== undefined ? index : myQuestions.length
        myQuestions.splice(index, 0, {
            id: uuidv4(),
            type: "text",
            question: "",
            description: "",
            data: {},
        })
        setMyQuestions([...myQuestions]);
        onQuestionsUpdate(myQuestions)
    }

    const questionChange = (question: IQuestion) => {
        if (!question) return;
        const newQuestions = myQuestions.map((q) => {
            if (q.id == question.id) {
                return { ...question };
            }
            return q;
        });
        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions)
    }

    const deleteQuestion = (question: IQuestion) => {
        const newQuestions = myQuestions.filter((q) => q.id !== question.id);
        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions)
    }
    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Questions</h3>
                <button
                    type="button"
                    className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                    onClick={() => addQuestion()}
                >
                    <PlusIcon className="w-4 mr-2" />
                    Add question
                </button>
            </div>
            {myQuestions.length ? (
                myQuestions.map((q: IQuestion, ind) => (
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
