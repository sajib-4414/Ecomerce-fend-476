import './css/App.css';
import NavComp from './components/NavComp'
import Footer from "./components/Footer";
import HomePageComp from "./components/HomePageComp";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserLoginComp from "./components/UserLoginComp";
import SellerLoginComp from "./components/SellerLoginComp";
import UserSignUpComp from "./components/UserSignUpComp";
import SellerRegisterComp from "./components/SellerRegisterComp";
import ProductListForSellerComp from "./components/ProductListForSellerComp";
import UserPreviousOrdersComp from "./components/UserPreviousOrdersComp";
import CheckoutPageComp from "./components/CheckoutPageComp";
import AddProductForSeller from "./components/AddProductForSeller";
import AddCompanyComp from "./components/AddCompanyComp";
import ShoppingCartComp from "./components/ShoopingCart";
import SellerProductsListToBuyForUserComp from "./components/SellerProductsListToBuyForUserComp";
import CompanyProductListToBuyForUserComp from "./components/CompanyProductListToBuyForUserComp";

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
                  <Route exact path="/productlistforseller" component={ProductListForSellerComp}/>
                  <Route exact path="/userpreviousorders" component={UserPreviousOrdersComp}/>
                  <Route exact path="/checkoutpage" component={CheckoutPageComp}/>
                  <Route exact path="/addproduct" component={AddProductForSeller}/>
                  <Route exact path="/addcompany" component={AddCompanyComp}/>
                  <Route exact path="/shoppingcart" component={ShoppingCartComp}/>
                  <Route exact path="/productlistbyseller" component={SellerProductsListToBuyForUserComp}/>
                  <Route exact path="/productlistbycompany" component={CompanyProductListToBuyForUserComp}/>
              </Switch>



          <Footer/>
      </div>

    </div>
      </BrowserRouter>
  );
}

export default App;
