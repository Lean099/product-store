import React, { useReducer, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { CreateProduct } from "./components/CreateProduct";
import { PurchaseSection } from "./components/PurchaseSection"
import ProtectedRoute from "./auth/protected-route";
import axios from "axios";

import { shoppingCartReducer, initialState} from "./reducers/shoppingCartReducer";
import { TYPES } from "./actions/cartAction";

export const Context = React.createContext()

function App() {

  const [state, dispatch] = useReducer(shoppingCartReducer, initialState)

  useEffect(()=>{
    axios.get('http://localhost:3001/api/product/getAll').then(res => dispatch({type: TYPES.ADD_PRODUCTS, payload: res.data.products})).catch(err => console.log(err))
  }, [])

  return (
    <Router>
        <Context.Provider value={{storeState: state, storeDispatch: dispatch}}>
          <Navigation/>
          <Route path="/" exact component={Home}/>
          <ProtectedRoute path="/profile" component={Profile}/>
          <ProtectedRoute path="/createProduct" component={CreateProduct}/>
          <ProtectedRoute path="/purchaseSection" component={PurchaseSection} />
          <ProtectedRoute path="/edit/:id" component={CreateProduct}/>
        </Context.Provider>
    </Router>
  );
}

export default App;
