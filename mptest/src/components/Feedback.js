import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Feedback = ()=>{
    const [queries, setQueries] = useState({})
    const {search} = useLocation()

    function onDecodeParams(params){
        const replaceFirstChar = params.replace('?', '')
        const splitkeyvalue = replaceFirstChar.split('&')
        const formattedQueries = {}
        splitkeyvalue.forEach(query => {
            const [key, value] = query.split('=')
            Object.assign(formattedQueries, {
                [key]: value
            })
        })
        setQueries(formattedQueries)
    }

    useEffect(()=>{
        if(search.trim()){
            onDecodeParams(search)
        }
    }, [queries])

    return(
        <div>
            <h1>Feedback</h1>
            {search}
        </div>
    )
}