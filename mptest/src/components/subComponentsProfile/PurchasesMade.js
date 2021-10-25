import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import es from 'timeago.js/lib/lang/es';

export const PurchasesMade = ()=>{
    const [userData, setUserData] = useState(null)
    let [items, setItems] = useState([])
    const { user } = useAuth0()
    timeago.register('es', es);

    useEffect(()=>{
      axios.get(`http://localhost:3001/api/user/UaG/${user.sub.replace('auth0|', '')}`).then(res=> setUserData(res.data.user.shopFeedback))
    }, [])

    useEffect(()=>{
      if(userData!==null){
        userData.map(purchase=>{
          axios.get(`http://localhost:3001/api/mp/getPurchases/${purchase.payment_id}`).then(res =>{
            //items = [...items, res.data.additional_info.items]
            items = [...items, res.data]
            setItems(items)
          })
        })

      }
    }, [userData])

    console.log(userData)
    items.length!==0 && console.log(items)
    return(
      <div className="container">
          <h2 className="text-center">Purchases</h2>
          {
          items.length!==0 && (
            items.map(item=>(
              <div className="row my-2">
                        <div class="card mx-auto" style={{maxWidth: '800px'}}>
                        <div class="row g-0">
                            <div class="col-md-4 d-flex align-content-center flex-wrap">
                              {
                                item.additional_info.items.map(i => (
                                  <img src={i.picture_url} class="img-fluid rounded" style={{maxWidth: '100px', maxHeight: '100px'}} alt="..."/>
                                ))
                              } 
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">Compra <TimeAgo datetime={item.date_approved} locale='es'/></h5>
                                <span class="badge bg-success me-2">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                                <span class="badge bg-warning text-dark">{item.status_detail.charAt(0).toUpperCase() + item.status_detail.slice(1)}</span>
                                <h6 className="mt-1">Products:</h6>
                                {
                                  item.additional_info.items.map(i=>(
                                    <p class="card-text mt-1">- <strong>Title: </strong>{i.title}. - <strong>Quantity: </strong><span class="badge bg-dark">x{i.quantity}</span> - <strong>Description: </strong>{i.description}</p>
                                  ))
                                }
                                <h6>Total Paid Amount: {item.transaction_details.total_paid_amount} - Card: <span class="badge bg-dark">{item.payment_method_id.toUpperCase()}</span> - Last Four Digits: {item.card.last_four_digits} - Installments: <span className="badge bg-warning text-dark">{item.installments}</span></h6>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
              )
            )

          )}
          
      </div>
    )
  }