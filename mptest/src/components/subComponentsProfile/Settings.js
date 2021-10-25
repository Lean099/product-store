import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const Settings = ()=>{

    const { user, logout } = useAuth0()
    const history = useHistory()

    const sendDelete = (e)=>{
        e.preventDefault()
        axios.post(`http://localhost:3001/api/user/deleteUser/${user.sub.replace('auth0|', '')}`).then(res=>{
            logout({returnTo: 'http://localhost:3000/feedbackDelete'})
        })
    }

    return(
        <div className="cotainer">
            
            <h3 className="text-center my-4">Settings</h3>
            <div className="card text-center">
                <div className="card-header">
                User Setting
                </div>
                <div className="card-body">
                <h5 className="card-title">Delete Account</h5>
                <p className="card-text">Deleting your account will delete your personal data, purchases, sales and photos.</p>
                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Delete
                </button>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Confirmation</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure to delete all your personal data, purchases and sales made, as well as your photos?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" onClick={sendDelete} data-bs-dismiss="modal" className="btn btn-danger">I'm sure</button>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}