import React, { Component } from "react";
import axios from "axios";
import ShoppingCartItemsComp from "./ShoppingCartItemsComp";
import {Link} from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";

class ShoppingCartComp extends Component{
    state = {
        carlines: this.props.initialCartLines,
        subtotal:this.getSubTotalPrice(this.props.initialCartLines),
        shipping:this.getShippingCost(this.props.initialCartLines),
        finaltotal:this.getSubTotalPrice(this.props.initialCartLines) + this.getShippingCost(this.props.initialCartLines),
        buyer:{}
    }
    getSubTotalPrice(cartLines){
        // this.state.cartLineItem.product.price,this.state.cartLineItem.quantity
        // const cartLines = this.state.carlines
        let subtotal = 0
        cartLines.forEach(function (cartline, index) {
            subtotal = subtotal + cartline.product.price*cartline.quantity
        });
        return subtotal
    }
    getShippingCost(cartLines){
        // const cartLines = this.state.carlines
        let totalShippingCost = 0
        cartLines.forEach(function (cartline, index) {
            totalShippingCost = totalShippingCost + cartline.product.delivery_cost
        });
        return totalShippingCost
    }
    getCartLinesAndUserAndUpdateState(){
        let buyer = null
        if(Object.keys(this.state.buyer).length ===0)
        {
            //there is no buyer in the state
            //have to check if there is a buyer in local storage
            var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
            if(retrievedUser === null){
                toast.error("Cart update error, login as a user and try again")
                return
            }
            else if('seller' in retrievedUser){
                toast.error("Cart update error, login as a user and try again")
                return
            }
            else if ('buyer' in retrievedUser){
                //ok so we see there is a user in the localstorage, means a buyer is logged in
                //we can now attempt to fetch the carlines for him
                buyer = retrievedUser.buyer
            }
        }
        else{
            //there is a buyer saved in the state before
            buyer = this.state.buyer
        }
        axios
            .get(global.config.bkend.url+"/cart-carlines-by-user/"+buyer.pk+"/")
            .then(response =>
                {
                    // const datacart = response.data
                    const datacartlines = response.data.cartlines
                    this.setState({
                        carlines:datacartlines,
                        subtotal:this.getSubTotalPrice(datacartlines),
                        shipping:this.getShippingCost(datacartlines),
                        finaltotal:this.getShippingCost(datacartlines)+this.getSubTotalPrice(datacartlines),
                        buyer:buyer
                    })

                })


    }
    componentDidMount() {
        this.getCartLinesAndUserAndUpdateState();

    }
    handleItemChange = ()=>{
        this.props.notifyAppJSToUpdateCart()
       // alert("I am notified of the change")
        this.getCartLinesAndUserAndUpdateState();
    }

    render() {
        return(
            <div className="container">
                <div><Toaster/></div>
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Total</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            <ShoppingCartItemsComp
                            cartLines = {this.props.initialCartLines}
                            notifyShoppingCart={this.handleItemChange.bind(this)}
                            />

                            {/*<tr>*/}
                            {/*    <td className="col-md-6">*/}
                            {/*        <div className="media">*/}
                            {/*            <a className="thumbnail pull-left" href="#"> <img className="media-object"*/}
                            {/*                                                              src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"*/}
                            {/*                                                              style={{width: '72px', height: '72px', marginRight:'10px'}}/>*/}
                            {/*            </a>*/}
                            {/*            <div className="media-body">*/}
                            {/*                <h4 className="media-heading"><a href="#">Product name</a></h4>*/}
                            {/*                <h5 className="media-heading"> by <a href="#">Brand name</a></h5>*/}

                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="col-md-1" style={{textAlign: 'center'}}>*/}
                            {/*        <input type="number" className="form-control" id="exampleInputEmail1"/>*/}
                            {/*    </td>*/}
                            {/*    <td className="col-md-1 text-center"><strong>$4.99</strong></td>*/}
                            {/*    <td className="col-md-1 text-center"><strong>$9.98</strong></td>*/}
                            {/*    <td className="col-md-1">*/}
                            {/*        <button type="button" className="btn btn-danger">*/}
                            {/*            <span className="glyphicon glyphicon-remove"></span> Remove*/}
                            {/*        </button>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td/>
                                <td/>
                                <td/>
                                <td><h5>Subtotal</h5></td>
                                <td className="text-right"><h5><strong>${this.state.subtotal}</strong></h5></td>
                            </tr>
                            <tr>
                                <td/>
                                <td/>
                                <td/>
                                <td><h5>Estimated shipping</h5></td>
                                <td className="text-right"><h5><strong>${this.state.shipping}</strong></h5></td>
                            </tr>
                            <tr>
                                <td/>
                                <td/>
                                <td/>
                                <td><h3>Total</h3></td>
                                <td className="text-right"><h3><strong>${this.state.finaltotal}</strong></h3></td>
                            </tr>
                            <tr>
                                <td/>
                                <td/>
                                <td/>
                                <td>
                                    <Link className="btn btn-default" to="/">
                                        <span className="glyphicon glyphicon-shopping-cart"/> Continue Shopping
                                    </Link>



                                </td>
                                <td>
                                    {/*<Link className="btn btn-default" to="/">*/}
                                    {/*    <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping*/}
                                    {/*</Link>*/}
                                    <Link className="btn btn-success" to="/checkoutpage">
                                        <span className="glyphicon glyphicon-shopping-cart"/> Checkout
                                    </Link>
                                    {/*<button type="button" className="btn btn-success">*/}
                                    {/*    Checkout <span className="glyphicon glyphicon-play"></span>*/}
                                    {/*</button>*/}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default ShoppingCartComp