import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

type PaginationProps = {
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: never[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
    getSurveys: (page: number) => void
}

export default function Pagination({ meta, getSurveys }: PaginationProps) {
    function handlePage(number: number) {
        return function (evt: React.MouseEvent<HTMLAnchorElement>) {
            evt.stopPropagation()
            evt.preventDefault()
            if (number < 1 || meta.last_page < number) return
            getSurveys(number)
        }
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-4 sm:px-6 shadow-lg">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
                        <span className="font-medium">{meta.total}</span> results
                    </p>
                </div>
                <div>
                    {10 < meta.total && (
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                                href="#"
                                onClick={handlePage(meta.current_page - 1)}
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            <a
                                href="#"
                                onClick={handlePage(meta.current_page + 1)}
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    )
}
