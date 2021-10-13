import './css/App.css';
import NavComp from './components/NavComp'
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserLoginComp from "./components/UserLoginComp";
import SellerLoginComp from "./components/SellerLoginComp";

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <NavComp/>
      <div className="container">

              <Switch>
                  <Route exact path="/" component={HomePage}>

                  </Route>
                  <Route exact path="/usersignin" component={UserLoginComp}>
                  </Route>
                  <Route exact path="/sellersignin" component={SellerLoginComp}></Route>
              </Switch>



          <Footer/>
      </div>

    </div>
      </BrowserRouter>
  );
}

export default App;
