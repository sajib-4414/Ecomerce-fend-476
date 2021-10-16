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
    setCartDataInState = response =>{
        const datacart = response.data
        const datacartlines = response.data.cartlines
        this.setState({cart:datacart,cartLines:datacartlines})
    }
    componentDidMount() {
        axios
            .get(global.config.bkend.url+"/cart-carlines-by-user/1/")
            .then(response =>
                {
                    this.setCartDataInState(response)
                }

            )
    }
    handleAddToCartProduct(pk){
        // alert("Hi I finally got the product id"+pk)
        axios
            .post(global.config.bkend.url+"/add-to-cart-user/", {
                user_id:1,
                product_id: pk
            })
            .then(response => {
                console.log(response);
                this.setCartDataInState(response)
                // this.setState({todos:[...this.state.todos,res.data]})
            });
    }

    getItemQuantity(){
        const items = this.state.cartLines
        let count = 0
        items.forEach(function (item, index) {
            count = count + item.quantity
        });
        return count
    }
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavComp
                    cartitemquantity = {this.getItemQuantity()}
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
                            <Route exact path="/shoppingcart"
                                   render={(props) => (
                                       <ShoppingCartComp
                                           initialCartLines={this.state.cartLines}
                                       />)} />
                            <Route exact path="/productlistbyseller"
                                   render={(props) => (
                                       <SellerProductsListToBuyForUserComp
                                           handleAddToCartToAppJS={this.handleAddToCartProduct.bind(this)}
                                   />)} />
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
