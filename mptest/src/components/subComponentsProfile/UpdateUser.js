import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useState } from "react"

export const UpdateUser = ()=>{

    const { user } = useAuth0()

    const [datos, setDatos] = useState({
      name: '',
      lastname: '',
      phone: '',
      dni: '',
      adress: ''
    })

    const handleInputChange = (e)=>{
      setDatos({
        ...datos,
        [e.target.name]: e.target.value
      })
    }

    const disableInput = (e)=>{
      e.preventDefault()
      switch (e.target.name) {
        case "file":
          const inputFile = document.getElementById('formFile').disabled
          if(inputFile){
            document.getElementById('formFile').disabled = false
          }else{
            document.getElementById('formFile').disabled = true
          }
          break;
        case "emailbtn":
          const inputEmail = document.getElementById('email').disabled
          if(inputEmail){
            document.getElementById('email').disabled = false
          }else{
            document.getElementById('email').disabled = true
          }
          break;
        case "passbtn":
          const inputPass = document.getElementById('password').disabled
          if(inputPass){
            document.getElementById('password').disabled = false
          }else{
            document.getElementById('password').disabled = true
          }
          break;
        default:
          break;
        
      }
    }

    const sendData = (e)=>{
      e.preventDefault()
      axios.post(`http://localhost:3001/api/user/UaG/${user.sub.replace('auth0|', '')}`, {
        name: datos.name,
        lastname: datos.lastname,
        phone: datos.phone,
        dni: datos.dni,
        adress: datos.adress
      })
      setDatos({
        name: '',
        lastname: '',
        phone: '',
        dni: '',
        adress: ''
      })
    }

    return(
        <div className="container">
          <h2 className="text-center">Update your data</h2>
          <form className="d-grid">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input type="text" className="form-control" onChange={handleInputChange} value={datos.name} name="name" id="fisrtName" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input type="text" className="form-control" onChange={handleInputChange} value={datos.lastname} name="lastname" id="lastName" />
                </div>
              </div>
            </div>
            {/* -------------------------------------------------- */}
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="d-flex">
                    <input type="email" className="form-control" id="email" />
                    <button onClick={disableInput} name="emailbtn" className="btn btn-dark">X</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="d-flex">
                    <input type="password" className="form-control" id="password" />
                    <button onClick={disableInput} name="passbtn" className="btn btn-dark">X</button>
                  </div>
                </div>
              </div>
            </div>
            {/* -------------------------------------------------- */}
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Phone</label>
                  <input type="text" className="form-control" onChange={handleInputChange} value={datos.phone} name="phone" id="lastName" />
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">DNI</label>
                  <input type="text" className="form-control" onChange={handleInputChange} value={datos.dni} name="dni" id="lastName" />
                </div>
              </div>
            </div>
            {/* -------------------------------------------------- */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Adress</label>
              <input type="text" className="form-control" onChange={handleInputChange} value={datos.adress} name="adress" id="lastName" />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Change your Avatar</label>
              <div className="d-flex">
                <input className="form-control" type="file"  id="formFile" />
                <button onClick={disableInput} name="file" className="btn btn-dark">X</button>
              </div>
            </div>
            <button onClick={sendData} type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    )
}