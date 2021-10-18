import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartPlus, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../App';
import { TYPES } from "../actions/cartAction";

export const ShoppingCart = ()=>{

  const context = useContext(Context)

  return(
    <div class="collapse navbar-collapse me-2" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
          <FontAwesomeIcon icon={faShoppingCart} />
          </a>
          
          <ul class="dropdown-menu dropdown-menu-light" style={{width: 'auto'}} aria-labelledby="navbarDarkDropdownMenuLink">

            {context.storeState.cart.map(item=>(
              <li className="pt-1"><div class="d-flex justify-content-around">
                <img 
                src={item.image}
                className="img-fluid rounded" style={{height: '50px', width: '50px'}} 
                alt="imgProduct"
                />
                <div className="d-flex align-items-center me-3">
                  <span style={{ verticalAlign: 'middle' }}>{item.title}</span>
                  <span className="badge bg-dark me-1">x{item.quantityAddedInCart}</span>
                  <button className="btn btn-primary btn-sm me-1" onClick={()=>{context.storeDispatch({type: TYPES.ADD_ONE_CART, payload: item._id})}}><FontAwesomeIcon icon={faPlus} /></button>
                  <button className="btn btn-danger btn-sm me-1" onClick={()=>{context.storeDispatch({type: TYPES.REMOVE_ONE_CART, payload: item._id})}}><FontAwesomeIcon icon={faMinus} /></button>
                </div>
              </div>
            </li>
            ))}
            
            <li className="pt-1"><div className="d-grid"><NavLink to="/purchaseSection" className="btn btn-primary btn-sm mx-2">Buy</NavLink></div></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}