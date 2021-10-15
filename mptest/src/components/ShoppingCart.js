import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from "react-router-dom";

export const ShoppingCart = ()=>{
  return(
    <div class="collapse navbar-collapse me-2" id="navbarNavDarkDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <FontAwesomeIcon icon={faShoppingCart} />
          </a>
          <ul class="dropdown-menu dropdown-menu-light" style={{width: 'auto'}} aria-labelledby="navbarDarkDropdownMenuLink">
            <li className="pt-1"><div class="d-flex justify-content-around">
              <img 
              src="https://http2.mlstatic.com/D_Q_NP_897670-MLA47135994890_082021-AB.webp"
              className="img-fluid rounded" style={{height: '50px', width: '50px'}} 
              alt="imgProduct"
              />
              <div className="d-flex align-items-center me-3"><span style={{ verticalAlign: 'middle' }}>Product Title</span></div>
              </div>
            </li>
            <li className="pt-1"><div class="d-flex justify-content-around">
              <img 
              src="https://http2.mlstatic.com/D_Q_NP_897670-MLA47135994890_082021-AB.webp"
              className="img-fluid rounded" style={{height: '50px', width: '50px'}} 
              alt="imgProduct"
              />
              <div className="d-flex align-items-center me-3" style={{ textAlign: 'center' }}><span style={{ verticalAlign: 'middle' }}>Product Title</span></div>
              </div>
            </li>
            <li className="pt-1"><div class="d-flex justify-content-around">
              <img 
              src="https://http2.mlstatic.com/D_Q_NP_897670-MLA47135994890_082021-AB.webp"
              className="img-fluid rounded" style={{height: '50px', width: '50px'}} 
              alt="imgProduct"
              />
              <div className="d-flex align-items-center me-3" style={{ textAlign: 'center' }}><span style={{ verticalAlign: 'middle' }}>Product Title</span></div>
              </div>
            </li>
            <li className="pt-1"><div className="d-grid"><NavLink to="/purchaseSection" className="btn btn-primary btn-sm mx-2">Buy</NavLink></div></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}