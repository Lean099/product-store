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

    return(
        <div className="container">
            <h3 className="text-center my-4">Feedback</h3>
        {
            payment!==null &&
                    <div className="row">
                        <div className="card mx-auto" style={{maxWidth: '800px'}}>
                        <div className="row g-0">
                            <div className="col-md-4 d-flex align-content-center flex-wrap">
                                {payment.payment.additional_info.items.map(item => (
                                    <img src={item.picture_url} className="img-fluid rounded" style={{maxWidth: '100px', maxHeight: '100px'}} alt="..." key={item.id}/>
                                ))}
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Payment ID: {payment.payment.id}</h5>
                                <span className="badge bg-success">{payment.payment.status}</span>
                                <span className="badge bg-warning text-dark">{payment.payment.status_detail}</span>
                                <p className="card-text mt-2">Your payment has been credited, you can see your purchases in your profile in the purchases made section.</p>
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