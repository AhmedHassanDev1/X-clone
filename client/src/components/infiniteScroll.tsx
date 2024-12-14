"use client"

import { DocumentNode, useQuery } from "@apollo/client"
import { cloneElement, useEffect, useState } from "react"

import Loading from "./loading"
import { TweetType } from "@/types/tweet"
type propsType = {
    children: any
    query: DocumentNode
    type?: 'tweet' | 'media'
    initialVariables?: {
        id?: string | undefined
        limit?: number | undefined
        offset?: number | undefined
    }

}

function infiniteScroll({ children, query, initialVariables }: propsType) {
    let { data, loading,  fetchMore } = useQuery(query, {
        variables: initialVariables,
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
        onError:()=>console.log('media')
        
    })
   
    let [Data, setData] = useState<TweetType[]>([])
    let [end, setEnd] = useState(false)
    const limit = 20
    let InfiniteScroll = async () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollY + windowHeight >= documentHeight) {
            if (!end) {
                setEnd(true)
            }
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', InfiniteScroll)

    }, [])
    useEffect(() => {
        setData(data?.data || [])
        
    }, [data])
    useEffect(() => {
        if (loading) return
        if (end) {
            let newData = fetchMore({
                variables: {
                    offset: Data?.length,
                    limit
                }
            }).then((res) => {
                setData([...Data, ...res.data?.data])
                setEnd(false)
            })
        }
    }, [end])


    return (
        <>
            <div
                className="">
                {cloneElement(children, { content: Data })}
            </div>
            <div className=" m-5">
                {loading && <Loading />}
            </div>
        </>
    )
}

export default infiniteScroll