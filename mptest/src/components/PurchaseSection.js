import { useContext } from "react"
import { Context } from "../App"
import { TYPES } from "../actions/cartAction";

export const PurchaseSection = () => {

    const context = useContext(Context)

    console.log(context.storeState.cart)
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
                          <select class="form-select form-select-sm me-2" style={{width: '100px'}} aria-label=".form-select-sm example">
                            <option selected>{item.quantityAddedInCart}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                          <button className="btn btn btn-dark btn-sm me-2" onClick={()=>{context.storeDispatch({type: TYPES.ADD_ONE_CART, payload: item._id})}}>+</button>
                          <button className="btn btn btn-dark btn-sm me-2" onClick={()=>{context.storeDispatch({type: TYPES.REMOVE_ONE_CART, payload: item._id})}}>-</button>
                        </div>
                        <button className="btn btn-primary mt-2">BOTON DE MERCADO PAGO</button>
                        <button className="btn btn-warning mt-2 ms-2" onClick={()=>{context.storeDispatch({type: TYPES.REMOVE_ITEM_CART, payload: item._id})}}>Remove from cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}         
              
              
  
            </div>
            <div className="col-md-10 offset-md-1 d-grid mb-3">
            <button className="btn btn-primary">Buy All</button>
          </div>
          </div>
        </div>
      </div>
    )
  }