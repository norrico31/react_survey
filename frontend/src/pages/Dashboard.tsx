import { useState, useEffect } from 'react'
import { PageContent } from '../components'
import axiosClient from './../axios'
import { Button } from '../components'
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline"

export default function Dashboard() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        let cleanUp = false;
        axiosClient.get('/dashboard')
            .then((res) => setData(res.data))
            .finally(() => setLoading(false))
        return function () {
            cleanUp = true
        }
    }, [])

    console.log(data)
    return (
        <>
            <PageContent title='Dashboard'>
                Dashboard
            </PageContent>
        </>
    )
}
