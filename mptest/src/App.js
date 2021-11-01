import React, { useReducer, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { CreateProduct } from "./components/CreateProduct";
import { Feedback } from "./components/Feedback";
import { PurchaseSection } from "./components/PurchaseSection"
import { AccountDeleted } from "./components/subComponentsProfile/AccountDeleted";
import ProtectedRoute from "./auth/protected-route";
import axios from "axios";

import { shoppingCartReducer, initialState} from "./reducers/shoppingCartReducer";
import { TYPES } from "./actions/cartAction";

export const Context = React.createContext()

function App() {

  const [state, dispatch] = useReducer(shoppingCartReducer, initialState)

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/getAll`).then(res => dispatch({type: TYPES.ADD_PRODUCTS, payload: res.data.products})).catch(err => console.log(err))
  }, [])

  return (
    <Router>
        <Context.Provider value={{storeState: state, storeDispatch: dispatch}}>
          <Navigation/>
          <Route path="/" exact component={Home}/>
          <ProtectedRoute exact path="/profile" component={Profile}/>
          <ProtectedRoute exact path="/createProduct" component={CreateProduct}/>
          <ProtectedRoute exact path="/purchaseSection" component={PurchaseSection} />
          <ProtectedRoute exact path="/edit/:id" component={CreateProduct}/>
          <ProtectedRoute exact path="/feedback" component={Feedback} />
          <Route exact path="/feedbackDelete" component={AccountDeleted}/>
        </Context.Provider>
    </Router>
  );
}

export default App;
