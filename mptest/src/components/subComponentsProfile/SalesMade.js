import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Link,
    NavLink
  } from "react-router-dom";

export const SalesMade = ()=>{

    const {user} = useAuth0()
    const [idUser, setIdUser] = useState(null)
    const [sales, setSales] = useState([])

    useEffect(()=>{
      axios.get(`http://localhost:3001/api/user/UaG/${user.email}`).then(res => setIdUser(res.data.user._id))
    }, [])

    useEffect(()=>{
      if(idUser){
        axios.get(`http://localhost:3001/api/product/CaG/${idUser}`).then(res => setSales(res.data.product))
      }
    }, [idUser])

    const deleteSale = async (id)=>{
      await axios.delete(`http://localhost:3001/api/product/UaD/${id}`)
      const products = await axios.get(`http://localhost:3001/api/product/CaG/${idUser}`)
      setSales(products.data.product)
    }

    return(
      <div className="container">
        <h2 className="text-center">Sales</h2>
        <div className="col-md-12 d-grid">
          <div className="row">
            {sales.map(sale =>{
              return(
                <div className="col-md-3 mt-2" key={sale._id}>
                <div className="card p-2">
                        {/* Puedo poner una tag a para la imagen en esta parte arriba del card-body */}
                      <img src={sale.image} alt={sale.title} className="img-fluid card-img-top"/>
                      <div className="card-body">
                        <h5 class="card-title">{sale.title}</h5>
                        <p class="card-text">{sale.description}</p>
                        <h4>${sale.price}</h4>
                      </div>
                      <div className="card-footer d-flex justify-content-around">
                        <NavLink to={"/edit/" + sale._id} className="btn btn-info">Update</NavLink>
                        <button onClick={()=>{ deleteSale(sale._id) }} className="btn btn-danger">Delete</button>
                      </div>
                </div>
              </div>
              )
            })}
            </div>
        </div> 
      </div>
    )
}