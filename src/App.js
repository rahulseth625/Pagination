import logo from './logo.svg';
import './App.css';
import Customers from './Component/Customers';
import Dashboard from './Component/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {
  return (
    <div className="App">
 <Router>
      <Switch>
        <Route component={Customers} path="/" exact />
        <Route component={Dashboard} path="/dashboard" exact />
        <Route path="*" component={Customers} />
      </Switch>
    </Router>      
    </div>
  );
}

export default App;
