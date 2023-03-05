import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSurveyContext, IQuestion, QuestionOptions } from "../contexts";

type QuestionEditorProps = {
    index: number
    question: IQuestion
    addQuestion: (i?: number) => void
    deleteQuestion: (q: IQuestion) => void
    questionChange: (q: IQuestion) => void
}

export default function QuestionEditor({
    index = 0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}: QuestionEditorProps) {
    const [model, setModel] = useState({ ...question })
    const { questionTypes } = useSurveyContext()

    useEffect(() => {
        questionChange(model);
    }, [model])

    function onTypeChange(ev: React.ChangeEvent<HTMLSelectElement>) {
        const newModel = {
            ...model,
            type: ev.target.value,
        }
        if (!shouldHaveOptions(model.type, model.type) && shouldHaveOptions(ev.target.value, model.type)) {
            if (!model.data?.options) {
                newModel.data = {
                    options: [{ uuid: uuidv4(), text: "" }],
                }
            }
        }
        setModel(newModel);
    }

    function addOption() {
        model.data.options?.push({
            uuid: uuidv4(),
            text: "",
        });
        setModel({ ...model })
    }

    function deleteOption(op: any) {
        model.data.options = model.data.options?.filter((option: any) => option.uuid != op.uuid)
        setModel({ ...model })
    }

    return (
        <>
            <div>
                <div className="flex justify-between mb-3">
                    <h4>
                        {index + 1}. {model.question}
                    </h4>
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                            onClick={() => addQuestion(index + 1)}
                        >
                            <PlusIcon className="w-4" />
                            add
                        </button>
                        <button
                            type="button"
                            className="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600 font-semibold
          "
                            onClick={() => deleteQuestion(question)}
                        >
                            <TrashIcon className="w-4" />
                            Delete
                        </button>
                    </div>
                </div>
                <div className="flex gap-3 justify-between mb-3">
                    {/* Question Text */}
                    <div className="flex-1">
                        <label
                            htmlFor="question"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Question
                        </label>
                        <input
                            type="text"
                            name="question"
                            id="question"
                            value={model.question}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setModel({ ...model, [ev.target.name]: ev.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Question Text */}

                    {/* Question Type */}
                    <div>
                        <label
                            htmlFor="questionType"
                            className="block text-sm font-medium text-gray-700 w-40"
                        >
                            Question Type
                        </label>
                        <select
                            id="questionType"
                            name="questionType"
                            value={model.type}
                            onChange={onTypeChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            {questionTypes.map((type) => (
                                <option value={type} key={type}>
                                    {upperCaseFirst(type)}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Question Type */}
                </div>

                {/*Description*/}
                <div className="mb-3">
                    <label
                        htmlFor="questionDescription"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        name="questionDescription"
                        id="questionDescription"
                        value={model?.description ?? ''}
                        onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setModel({ ...model, description: ev.target.value })
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                {/*Description*/}

                <div>
                    {shouldHaveOptions(model.type, model.type) && (
                        <div>
                            <h4 className="text-sm font-semibold mb-1 flex justify-between items-center ">
                                Options
                                <button
                                    onClick={addOption}
                                    type="button"
                                    className="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                                >
                                    Add
                                </button>
                            </h4>

                            <div>
                                {(model.data.options != undefined) && model.data.options?.length > 0 ? (
                                    model.data.options.map((option: QuestionOptions, idx: number) => (
                                        <div key={option.uuid} className="flex items-center mb-1">
                                            <span className="w-6 text-sm">{idx + 1}.</span>
                                            <input
                                                type="text"
                                                value={option.text}
                                                onInput={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                                    option.text = ev.target.value;
                                                    setModel({ ...model });
                                                }}
                                                className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
                                            />
                                            <button
                                                onClick={() => deleteOption(option)}
                                                type="button"
                                                className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100"
                                            >
                                                <TrashIcon className="w-3 h-3 text-red-500" />
                                            </button>
                                        </div>
                                    ))

                                ) : (
                                    <div className="text-xs text-gray-600 text-center py-3">
                                        You don't have any options defined
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* {model.type === "select" && <div></div>} */}
            </div>
            <hr />
        </>
    );
}

function upperCaseFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function shouldHaveOptions(type: string, modelType: string) {
    type ||= modelType;
    return ["select", "radio", "checkbox"].includes(type);
}