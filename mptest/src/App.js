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

function App() {
  
  return (
    <Router>
        <Navigation/>
        <Route path="/" exact component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/createProduct" component={CreateProduct}/>
    </Router>
  );
}

export default App;
