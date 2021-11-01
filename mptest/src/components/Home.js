import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Context } from '../App';
import { TYPES } from '../actions/cartAction';
import { useAuth0 } from '@auth0/auth0-react';

export const Home = ()=>{

    const { user, isAuthenticated } = useAuth0()
    const context = useContext(Context)
    const [products, setProducts] = useState([])
    let [filterProducts, setFilterProducts] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/api/product/getAll`).then(res => setProducts(res.data.products)).catch(err => console.log(err))
    }, [])

    useEffect(()=>{
        if(products.length!==0 && user){
            setFilterProducts(products.filter(product => product.idCostumer!=user.sub.replace('auth0|', '')))
        }
    }, [user, products])

    if(isAuthenticated && filterProducts.length!==0){
        return(
        <div className="container">
            <h2 className="text-center my-2">Products For Sale Right Now</h2>
            <div className="col-md-10 offset-md-1 d-grid">
                <div className="row">

                    {filterProducts.map(product=>{
                        return(
                            <div className="col-md-3 mt-2" key={product._id}>
                            <div className="card">
                                <img
                                    src={product.image}
                                    className="img-fluid card-img-top"
                                    height="224"
                                    width="224"
                                    alt={product.title}
                                />
                                <div className="card-header d-flex justify-content-between">
                                    <div
                                    className="d-flex align-items-center"
                                    style={{ textAlign: 'center' }}
                                    >
                                    <span className="" style={{ verticalAlign: 'middle' }}>
                                        {product.title}
                                    </span>
                                    </div>
                                    <button className="btn" onClick={()=>{context.storeDispatch({type: TYPES.ADD_TO_CART, payload: product._id})}}>
                                    <FontAwesomeIcon icon={faCartPlus} />
                                    </button>
                                </div>
                                <div className="card-body d-grid">
                                    <h5>${product.price}</h5>
                                    <p>{product.description}</p>
                                    <NavLink to="/purchaseSection" onClick={()=>{ context.storeDispatch({type: TYPES.SINGLE_PURCHASE, payload: product._id}) }} className="btn btn-primary btn-sm">Buy Directly</NavLink>
                                </div>
                            </div>
                            </div>
                    )})} 

                </div>
            </div>
        </div>
        )
    }else{
        return(
            <div className="container">
                <h2 className="text-center my-2">Products For Sale Right Now</h2>
                <div className="col-md-10 offset-md-1 d-grid">
                    <div className="row">
    
                        
    
                        {products.map(product=>{
                        return(
                            <div className="col-md-3 mt-2" key={product._id}>
                            <div className="card">
                                <img
                                    src={product.image}
                                    className="img-fluid card-img-top"
                                    height="224"
                                    width="224"
                                    alt={product.title}
                                />
                                <div className="card-header d-flex justify-content-between">
                                    <div
                                    className="d-flex align-items-center"
                                    style={{ textAlign: 'center' }}
                                    >
                                    <span className="" style={{ verticalAlign: 'middle' }}>
                                        {product.title}
                                    </span>
                                    </div>
                                    <button className="btn" onClick={()=>{context.storeDispatch({type: TYPES.ADD_TO_CART, payload: product._id})}}>
                                    <FontAwesomeIcon icon={faCartPlus} />
                                    </button>
                                </div>
                                <div className="card-body d-grid">
                                    <h5>${product.price}</h5>
                                    <p>{product.description}</p>
                                    <NavLink to="/purchaseSection" onClick={()=>{ context.storeDispatch({type: TYPES.SINGLE_PURCHASE, payload: product._id}) }} className="btn btn-primary btn-sm">Buy Directly</NavLink>
                                </div>
                            </div>
                            </div>
                        )})} 
    
                    </div>
                </div>
            </div>
        )
    }
    
}