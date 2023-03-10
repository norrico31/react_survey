import { ReactNode } from 'react'
import { IQuestion, QuestionOptions } from '../contexts'

type PublicQuestionViewProps = {
    question: IQuestion
    idx: number
    answerChanged: (val: string | string[]) => void
}

export default function PublicQuestionView({ question, idx, answerChanged }: PublicQuestionViewProps) {
    let selectedOptions: string[] = []

    function onCheckboxChange(option: QuestionOptions, evt: React.ChangeEvent<HTMLInputElement>) {
        if (evt.target.checked) selectedOptions.push(option.text)
        else selectedOptions = selectedOptions.filter(op => op != option.text)
        answerChanged(selectedOptions)
    }

    function renderInput(type: string) {
        const inputComponents: Record<string, ReactNode> = {
            'select': <InputSelect options={question?.data?.options ?? []} onChange={answerChanged} />,
            "radio": <InputRadio options={question?.data?.options ?? []} onChange={answerChanged} questionId={question.id} />,
            "checkbox": <InputCheckbox options={question?.data?.options ?? []} onCheckboxChange={onCheckboxChange} />,
            "text": <InputText onChange={answerChanged} />,
            "textarea": <InputTextArea onChange={answerChanged} />
        }
        return inputComponents[type] as ReactNode
    }

    return (
        <>
            <fieldset className="mb-4">
                <div>
                    <legend className="text-base font-medium text-gray-900">
                        {idx + 1}. {question.question}
                    </legend>
                    <p className="text-gray-500 text-sm">{question.description}</p>
                </div>
                <div className="mt-3">
                    {renderInput(question.type)}
                </div>
            </fieldset>
            <hr className="mb-4" />
        </>
    )
}

type InputTypeProps = {
    options: QuestionOptions[];
    onChange: (val: string | string[]) => void
}

function InputSelect({ onChange, options }: InputTypeProps) {
    return (
        <div>
            <select
                onChange={(ev) => onChange(ev.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="">Please Select</option>
                {options?.map((option) => (
                    <option key={option.uuid} value={option.text}>
                        {option.text}
                    </option>
                ))}
            </select>
        </div>
    )
}

function InputRadio({ options, onChange, questionId }: InputTypeProps & { questionId: string }) {
    return (
        <div>
            {options?.map((option) => (
                <div key={option.uuid} className="flex items-center">
                    <input
                        id={option.uuid}
                        name={"question" + questionId}
                        value={option.text}
                        onChange={(ev) => onChange(ev.target.value)}
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                        htmlFor={option.uuid}
                        className="ml-3 block text-sm font-medium text-gray-700"
                    >
                        {option.text}
                    </label>
                </div>
            ))}
        </div>
    )
}

function InputCheckbox({ options, onCheckboxChange }: { options: QuestionOptions[]; onCheckboxChange: (option: QuestionOptions, evt: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            {options?.map((option) => (
                <div key={option.uuid} className="flex items-center">
                    <input
                        id={option.uuid}
                        onChange={ev => onCheckboxChange(option, ev)}
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                        htmlFor={option.uuid}
                        className="ml-3 block text-sm font-medium text-gray-700"
                    >
                        {option.text}
                    </label>
                </div>
            ))}
        </div>
    )
}

function InputText({ onChange }: { onChange: (val: string | string[]) => void }) {
    return (
        <div>
            <input
                type="text"
                onChange={(ev) => onChange(ev.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
        </div>
    )
}

function InputTextArea({ onChange }: { onChange: (val: string | string[]) => void }) {
    return (
        <div>
            <textarea
                onChange={(ev) => onChange(ev.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            ></textarea>
        </div>
    )
}