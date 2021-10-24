import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const Feedback = ()=>{
    const [queries, setQueries] = useState(null)
    const [payment, setPayment] = useState(null)
    const { user } = useAuth0()
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
        
    }, [])

    useEffect(()=>{
        if(queries){
            axios.post(`http://localhost:3001/api/mp/feedback/${user.sub.replace('auth0|', '')}`, {
              payment_id: queries.payment_id,
              preference_id: queries.preference_id,
              status: queries.status,
              payment_type: queries.payment_type,
              merchant_order_id: queries.merchant_order_id
            }).then(res => setPayment(res.data))
          }
    },[queries])

    console.log(payment)
    /* De este payment hay que sacar el payment.additional_info.items para los productos que compro que estan
    en un array, tambien podriamos mostrar informacion de la tarjeta que se pago en card.cardholder.name para
    el titular y card.cardholder.identification. number o type para el num de dni y el tipo de DNI ademas
    del card.cardholder.last_four_digits para los ultimos 4 digitos de la tarjeta, tambien tenemos
    payment.payment_method_id para el tipo de tarjeta (master, visa), payment.payment_type_id para el tipo de
    pago (credit card o otro) y por ultimo el payment.status y el payment.status_detail para el estado del
    pago (aprobado o no) y el otro para detallar que fue acreditado  */

    return(
        <div className="container">
            <h3 className="text-center my-4">Feedback</h3>
        {
            payment!==null &&
                    <div className="row">
                        <div class="card mx-auto" style={{maxWidth: '800px'}}>
                        <div class="row g-0">
                            <div class="col-md-4 d-flex align-content-center flex-wrap">
                                {payment.payment.additional_info.items.map(item => (
                                    <img src={item.picture_url} class="img-fluid rounded" style={{maxWidth: '100px', maxHeight: '100px'}} alt="..." key={item.id}/>
                                ))}
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Payment ID: {payment.payment.id}</h5>
                                <span class="badge bg-success">{payment.payment.status}</span>
                                <span class="badge bg-warning text-dark">{payment.payment.status_detail}</span>
                                <p class="card-text mt-2">Your payment has been credited, you can see your purchases in your profile in the purchases made section.</p>
                                <NavLink to="/" className="btn btn-dark me-2">Go to Home</NavLink>
                                <NavLink to="/profile" className="btn btn-dark me-2">Go to Purchases Made</NavLink>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
        }
        </div>
    )               
}