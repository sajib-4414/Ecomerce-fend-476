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
import ProductListUnified from "./components/ProductListUnified";
import CompanyProductListToBuyForUserComp from "./components/CompanyProductListToBuyForUserComp";
//import ProductListByCategoryComp from "./components/ProductListByCategoryComp";
import { Component } from "react";
import axios from "axios";
import OrderDetailsPage from "./components/OrderDetailsPage";
import LogOutComponent from "./components/LogOutComponent";

//this is a special wrapper component that allows passing a prop to a router component
//this also retains the component's capability to receive location prop
//which is by default disabled if you use the render argument in the router
//the problem was if you send props using the render argument to a route
//react does not allow anymore location props(such as query parameter) parsing in the component
//this wrapper class written by a person does both
//however, using this type of prop passing, you will get App's state undefined, when
//back propagation to App.js happen
//to solve when passing any function, first bind it then pass it
//see below how i bound the method before passing it as a prop using this special component
//you will also see an error, leaking memory, to fix use mounted =false like this
//https://stackoverflow.com/a/52061655
const AddPropsToRoute = (WrappedComponent, passedProps)=>{
    return (
        class Route extends Component{
            render(){
                let props = Object.assign({}, this.props, passedProps)
                return  <WrappedComponent {...props} />
            }
        }
    )
}


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
        this.setState({})
        console.log(this.state)
        // return;
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
       // console.log(" I am quantity man, called")
        const items = this.state.cartLines
        let count = 0
        items.forEach(function (item, index) {
            count = count + item.quantity
        });
        return count
    }
    getCurrentUserType(){
       // console.log(" I am type man, called")
        //this method is used by the nav component to update the nav menus
        const user = this.state.user
        if(Object.keys(user).length ===0){
            return "guest"
        }
        else{
            if ('buyer' in user){
                return 'buyer'
            }
            else return 'seller'
        }
    }
    getCurrentUserName(){
        const user = this.state.user
        if(Object.keys(user).length ===0){
            return ""
        }
        else{
            if ('buyer' in user){
                return user.buyer.first_name
            }
            else return user.seller.first_name
        }
    }
    updateCart = ()=>{
        this.callCartCarLinesApiAndUpdateState()
    }
    handleLogout = ()=>{
        // alert("I am notified")
        this.setState({
            cart: {},
            cartLines:[],
            user:{}
        })
    }
    render() {
        let boundMethod = this.handleAddToCartProduct.bind(this)
        let passingProps = {
            handleAddToCartToAppJS: boundMethod
        }
        return (
            <BrowserRouter>
                <div className="App">
                    <NavComp
                    cartitemquantity = {this.getTotalItemsQuantity()}
                    currentUserType={this.getCurrentUserType()}
                    currentUserName={this.getCurrentUserName()}
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
                            <Route exact path="/productlist"
                                   // element={<SellerProductsListToBuyForUserComp authed={true}/>}
                                   component={AddPropsToRoute(ProductListUnified, passingProps)}
                                   // component={SellerProductsListToBuyForUserComp}
                                   // handleAddToCartToAppJS={this.handleAddToCartProduct}
                                   // xxx={"12"}
                                   // render={(props) => (
                                   //     <SellerProductsListToBuyForUserComp
                                   //         handleAddToCartToAppJS={this.handleAddToCartProduct.bind(this)}
                                   //         // search={props.location.search}
                                   // />)}
                            />
                            <Route exact path="/productlistbycompany" component={CompanyProductListToBuyForUserComp}/>
                            {/*<Route exact path="/productlistbycategory/" component={SellerProductsListToBuyForUserComp}/>*/}
                            <Route exact path="/orderdetails/:id" component={OrderDetailsPage}/>
                            <Route exact path="/logout"
                                   render={(props) => (
                                       <LogOutComponent
                                           notifyAppJSLogOut={this.handleLogout.bind(this)}
                                       />)} />
                            />
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
