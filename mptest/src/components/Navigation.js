import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { NavLink } from "react-router-dom";

export const Navigation = ()=>{
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid row">
                <NavLink to="/" className="navbar-brand">Product Store</NavLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/createProduct" className="nav-link">Sell</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/profile" className="nav-link">Profile</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="d-flex justify-content-end">
                    <LoginButton />
                    <LogoutButton />
                </div>
            </div>
        </nav>
    )
}