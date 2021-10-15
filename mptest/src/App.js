import { Product } from "./components/Product";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { CreateProduct } from "./components/CreateProduct";
import { PurchaseSection } from "./components/PurchaseSection"
import ProtectedRoute from "./auth/protected-route";

import { TestRequest } from "./components/TestRequest";


function App() {
  
  return (
    <Router>
        <Navigation/>
        <Route path="/" exact component={Home}/>
        <ProtectedRoute path="/profile" component={Profile}/>
        {/*<Route path="/profile" component={Profile}/>*/}
        <ProtectedRoute path="/createProduct" component={CreateProduct}/>
        {/*<Route path="/createProduct" component={CreateProduct}/>*/}
        <ProtectedRoute path="/purchaseSection" component={PurchaseSection} />
        <ProtectedRoute path="/edit/:id" component={CreateProduct}/>
        <Route path="/test" component={TestRequest}/>
    </Router>
  );
}

export default App;
