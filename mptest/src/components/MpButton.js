import { useEffect } from "react";
import { useMercadopago } from "react-sdk-mercadopago";

export const MpButton = (props)=>{

    const mercadoPago = useMercadopago.v2(process.env.REACT_APP_MP_PUBLIC_KEY, {
        locale: 'es-AR'
    })

    useEffect(()=>{
        if(props.preferenceId){
            console.log(props.preferenceId)
            mercadoPago.checkout({
                preference: {
                    id: props.preferenceId
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar con Mercado Pago'
                }
            })
        }

    }, [props.preferenceId])

    return(
            <div className="cho-container d-grid"></div>
    )
}