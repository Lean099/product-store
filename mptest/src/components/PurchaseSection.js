import { useContext, useEffect, useState } from "react"
import { Context } from "../App"
import { TYPES } from "../actions/cartAction";
import { MpButton } from "./MpButton";
import axios from "axios";

export const PurchaseSection = () => {

    const [preferenceId, setPreferenceId] = useState(null)
    const context = useContext(Context)

    useEffect(()=>{
      let payload = {
        cart: context.storeState.cart
      }
      axios.post('http://localhost:3001/api/mp/preferenceId', payload).then(res => setPreferenceId(res.data.body.id))
    }, [])

    console.log(context.storeState.cart)
    console.log(preferenceId)
    return (
      <div className="container">
        <div className="col-md-8 offset-md-2 bg-secondary d-grid">
          <div className="row">
            <div className="col-md-10 offset-md-1">
          
              {context.storeState.cart.map(item=>(
                  <div className="card my-2">
                  <div className="row">
                    <div className="col-md-4">
                      <img src={item.image} className="img-fluid rounded-start" alt="product" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h4 className="card-title">{item.title}</h4>
                        <p className="card-text">{item.description}</p>
                        <h5>Precio: ${item.price}</h5>
                        <div className="d-flex">
                          <label className="me-2">Quantity:</label>
                          <input class="form-control me-2" type="text" style={{width: '37px'}} value={item.quantityAddedInCart} aria-label="Disabled input example" disabled readonly/>
                          <button className="btn btn btn-dark btn-sm me-2" onClick={()=>{context.storeDispatch({type: TYPES.ADD_ONE_CART, payload: item._id})}}>+</button>
                          <button className="btn btn btn-dark btn-sm me-2" onClick={()=>{context.storeDispatch({type: TYPES.REMOVE_ONE_CART, payload: item._id})}}>-</button>
                        </div>
                        
                        <button className="btn btn-warning mt-2 ms-2" onClick={()=>{context.storeDispatch({type: TYPES.REMOVE_ITEM_CART, payload: item._id})}}>Remove from cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}         
              
            </div>
            <div className="col-md-10 offset-md-1 d-grid mb-3">
              {preferenceId ? <MpButton preferenceId={preferenceId}/> : <MpButton />}
            </div>
          </div>
        </div>
      </div>
    )
  }