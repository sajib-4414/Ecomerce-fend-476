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
import ProductListByCategoryComp from "./components/ProductListByCategoryComp";
import { Component } from "react";
import axios from "axios";

class App extends Component{
    state = {
        cart: {},
        cartLines:[]
    }
    componentDidMount() {
        axios
            .get(global.config.bkend.url+"/cart-carlines-by-user/1/")
            .then(val =>
                {
                    const datacart = val.data
                    const datacartlines = val.data.cartlines
                    this.setState({cart:datacart,cartLines:datacartlines})
                }

            )
    }
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavComp
                    cartitemquantity = {this.state.cartLines.length}
                    />
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
                            <Route exact path="/productlistbycategory" component={ProductListByCategoryComp}/>
                        </Switch>



                        <Footer/>
                    </div>

                </div>
            </BrowserRouter>
        );
    }

    // useEffect (()=>{
    //
    //
    // })

}

export default App;
