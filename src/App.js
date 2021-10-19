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
import OrderDetailsPage from "./components/OrderDetailsPage";

class App extends Component{
    state = {
        cart: {},
        cartLines:[],
        user:{}
    }
    callCartCarLinesApiAndUpdateState(){
        console.log("callcartcarlinesapi called")
        var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (retrievedUser === null)
        {
            console.log("retrieved user is null")
            return
            //no user saved
        }
        else{
            console.log("retrieved user is not null")
            //some user saved
            this.setState({...this.state,user:retrievedUser})
            const buyer = retrievedUser.buyer
            if(buyer !== undefined){
                console.log("retrieved user is a buyer we see")
                //this is a buyer user
                const user_id = buyer.pk
                axios
                    .get(global.config.bkend.url+"/cart-carlines-by-user/"+user_id+"/")
                    .then(response =>
                        {
                            this.setCartDataInState(response)
                        }
                    )
                    .catch(error=>{

                    })
            }
            else{
                //this is a seller user, who does not have any cart
                console.log("retrieved user is a seller we see")
            }
        }


    }
    setCartDataInState = response =>{
        const datacart = response.data
        const datacartlines = response.data.cartlines
        this.setState({cart:datacart,cartLines:datacartlines})
    }
    componentDidMount() {
        this.callCartCarLinesApiAndUpdateState()
    }
    handleAddToCartProduct(pk){
        // alert("Hi I finally got the product id"+pk)
        const current_user = this.state.user
        if (Object.keys(current_user).length===0){
            //no user saved, cannot add product to cart
            return
        }
        else{
            //some user is there need to check what kind of user it is
            if(current_user.hasOwnProperty('buyer')){
                //buyer user, he can have a cart
                axios
                    .post(global.config.bkend.url+"/add-to-cart-user/", {
                        user_id:current_user.buyer.pk,
                        product_id: pk
                    })
                    .then(response => {
                        console.log(response);
                        this.setCartDataInState(response)
                        // this.setState({todos:[...this.state.todos,res.data]})
                    });
            }
            else{
                //seller user, he cannot have a cart
                return;
            }
        }

    }

    getTotalItemsQuantity(){
        const items = this.state.cartLines
        let count = 0
        items.forEach(function (item, index) {
            count = count + item.quantity
        });
        return count
    }
    updateCart = ()=>{
        this.callCartCarLinesApiAndUpdateState()
    }
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavComp
                    cartitemquantity = {this.getTotalItemsQuantity()}
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
                                           notifyAppJSToUpdateCart={this.updateCart.bind(this)}
                                       />)} />
                            <Route exact path="/productlistbyseller"
                                   render={(props) => (
                                       <SellerProductsListToBuyForUserComp
                                           handleAddToCartToAppJS={this.handleAddToCartProduct.bind(this)}
                                   />)} />
                            <Route exact path="/productlistbycompany" component={CompanyProductListToBuyForUserComp}/>
                            <Route exact path="/productlistbycategory/:category" component={ProductListByCategoryComp}/>
                            <Route exact path="/orderdetails/:id" component={OrderDetailsPage}/>
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
