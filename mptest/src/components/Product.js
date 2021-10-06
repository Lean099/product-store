import { useEffect, useState } from "react";
import { useMercadopago } from "react-sdk-mercadopago";
import axios from "axios";


export const Product = ()=>{

    const [preferenceId, setPreferenceId] = useState(null)

    const mercadoPago = useMercadopago.v2('TEST-1bdfd177-b51a-4a59-b2a4-be239ebdb1b8', {
        locale: 'en-US'
    })

    useEffect(()=>{
        axios.post('http://localhost:3001/preferenceId').then(res => setPreferenceId(res.data.body.id))
    }, [])

    useEffect(()=>{
        if(preferenceId){
            console.log(preferenceId)
            mercadoPago.checkout({
                preference: {
                    id: preferenceId
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar'
                }
            })
        }

    }, [preferenceId])


    return(
        <div>
            <div class="cho-container"></div>
        </div>
    )
}