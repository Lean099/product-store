import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { ShoppingCart } from "./ShoppingCart";
import { NavLink, Link } from "react-router-dom";

export const Navigation = ()=>{

    const {user, isAuthenticated} = useAuth0()
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to='/'>Product Store</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {isAuthenticated ? <SectionLogged/> : <SectionLogout/>}
                    {isAuthenticated ? <NavLogout name={user.name}/> : <NavLogin/>}
                </div>
            </div>
        </nav>
    )
}

const NavLogout = ({name})=>{
    return(
        <div className='d-flex' id="navbarNav">
            <ShoppingCart />
            <span className="navbar-text text-center me-3">
                Signed in as: <Link to='/profile'>{name}</Link>
            </span>
            <LogoutButton/>
      </div>
    )
}

const NavLogin = ()=>{
    return(
        <div className='d-flex' id="navbarNav">
            <LoginButton />
        </div>
    )
}

const SectionLogout = ()=>{
    return(
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink to='/' exact className='nav-link'>Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/createProduct' className='nav-link disabled'>Sell</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/profile' className='nav-link disabled'>Profile</NavLink>
            </li>
      </ul>
    )
}

const SectionLogged = ()=>{
    return(
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink to='/' exact className='nav-link'>Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/createProduct' className='nav-link'>Sell</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/profile' className='nav-link'>Profile</NavLink>
            </li>
      </ul>
    )
}

