import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useEffect, useState } from "react"

export const PersonalData = ()=>{

    const [dataUser, setDataUser] = useState({})
    const { user } = useAuth0()

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/api/user/UaG/${user.sub.replace('auth0|', '')}`).then(res => setDataUser(res.data.user))
    }, [])

    return(
        <div className="card mt-4">
        <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="mt-1" style={{borderRadius: '50%', width: '250px', height: '250px', marginLeft: 'auto', marginRight: 'auto'}} alt="imgUser"/>
        <div className="card-body d-grid">
          <div className="row">
            <div className="col">
              <p className=""><span className="fw-bold">First Name:</span> {dataUser.name}</p>
            </div>
            <div className="col">
              <p className=""><span className="fw-bold">Last Name:</span> {dataUser.lastname}</p>
            </div>
          </div>
          <div className="row">
          <div className="col">
              <p className=""><span className="fw-bold">Email:</span> {dataUser.email}</p>
            </div>
          </div>
          <div className="row">
          <div className="col">
              <p className=""><span className="fw-bold">Phone:</span> {dataUser.phone}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className=""><span className="fw-bold">DNI:</span> {dataUser.dni}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className=""><span className="fw-bold">Adress:</span> {dataUser.adress}</p>
            </div>
          </div>
        </div>
      </div>
    )
}