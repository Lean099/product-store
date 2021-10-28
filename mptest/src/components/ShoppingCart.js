import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../App';
import { TYPES } from "../actions/cartAction";

export const ShoppingCart = ()=>{

  const context = useContext(Context)

  return(
    <div class="dropdown me-3">
      <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
        <FontAwesomeIcon icon={faShoppingCart} />
        <span class="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
            {context.storeState.cart.length}
        </span>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{minWidth: '15rem', maxWidth: '17rem'}}>

        {context.storeState.cart.map(item=>

          (<li key={item._id} class="pt-1">
            <div class="d-flex flex-row align-items-center">

                <div class="flex-shrink-0">
                  <img 
                    src={item.image}
                    class="img-fluid rounded p-1" style={{height: '50px', width: '50px'}} 
                    alt="imgProduct"
                  />
                </div>
                <div class="" style={{width: 'max-content'}}>
                  <span class="me-2" style={{ verticalAlign: 'middle' }}>{item.title}</span>
                </div>
                <div class="">
                  <span class="badge bg-dark me-1 text-center">x{item.quantityAddedInCart}</span>
                </div>
               
                <div class="">
                  <button class="btn btn-primary btn-sm me-1" onClick={()=>{context.storeDispatch({type: TYPES.ADD_ONE_CART, payload: item._id})}}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <div class="">
                  <button class="btn btn-danger btn-sm me-1" onClick={()=>{context.storeDispatch({type: TYPES.REMOVE_ONE_CART, payload: item._id})}}><FontAwesomeIcon icon={faMinus} /></button>
                </div>
              </div>
            </li>

          ))}
          <li class="pt-1">
            <div class="d-grid"><NavLink to="/purchaseSection" id="buy" className="btn btn-primary btn-sm mx-2">Buy</NavLink></div>
          </li>
      </ul>
    </div>
  )
}