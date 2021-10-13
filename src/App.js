import './css/App.css';
import NavComp from './components/NavComp'
import Footer from "./components/Footer";
import HomePageComp from "./components/HomePageComp";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserLoginComp from "./components/UserLoginComp";
import SellerLoginComp from "./components/SellerLoginComp";
import UserSignUpComp from "./components/UserSignUpComp";
import SellerRegisterComp from "./components/SellerRegisterComp";

function App() {
  return (
      <BrowserRouter>
    <div className="App">
      <NavComp/>
      <div className="container">

              <Switch>
                  <Route exact path="/" component={HomePageComp}/>
                  <Route exact path="/usersignin" component={UserLoginComp}/>
                  <Route exact path="/sellersignin" component={SellerLoginComp}/>
                  <Route exact path="/userregister" component={UserSignUpComp}/>
                  <Route exact path="/sellerregister" component={SellerRegisterComp}/>
              </Switch>



          <Footer/>
      </div>

    </div>
      </BrowserRouter>
  );
}

export default App;
