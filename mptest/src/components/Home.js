import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../App';
import { TYPES } from '../actions/cartAction';

export const Home = ()=>{

    const context = useContext(Context)
    const [products, setProducts] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/api/product/getAll').then(res => setProducts(res.data.products)).catch(err => console.log(err))
    }, [])

    console.log(products)
    console.log(context.storeState)
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
                                <button className="btn btn-primary btn-sm">Buy Directly</button>
                            </div>
                        </div>
                        </div>
                    )})} 

                </div>
            </div>
        </div>
    )
}