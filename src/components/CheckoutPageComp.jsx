import React, { Component } from "react";
import '../css/usercheckout-form-validation.css'
import Select from 'react-select'
import axios from "axios";
import CheckoutPageProductsListComp from "./CheckoutPageProductsListComp";

class CheckoutPageComp extends Component{
    // options = [
    //     { value: 'createnew', label: 'Create New' },
    //     { value: 'address1', label: 'Address1' },
    //     { value: 'address2', label: 'Address2' }
    // ]
    state = {
        profile:{},
        address:{},
        cartlines:[],
        totalPrice:0,
        total_items:0,
        total_shipping_cost:0,
        form_data:{
            contact_number:""
        }
    }
    getTotalPrice(cartlines){
        let totalShippingCost = 0
        cartlines.forEach(function (cartline, index) {
            totalShippingCost = totalShippingCost + cartline.product.delivery_cost
        });
        let subtotal = 0
        cartlines.forEach(function (cartline, index) {
            subtotal = subtotal + cartline.product.price*cartline.quantity
        });
        return totalShippingCost+subtotal

    }
    getTotalItemsQuantity(cartLines){
        // const items = this.state.cartLines
        let count = 0
        cartLines.forEach(function (item, index) {
            count = count + item.quantity
        });
        return count
    }
    getShippingCost(cartLines){
        // const cartLines = this.state.carlines
        let totalShippingCost = 0
        cartLines.forEach(function (cartline, index) {
            totalShippingCost = totalShippingCost + cartline.product.delivery_cost
        });
        return totalShippingCost
    }
    async componentDidMount() {
        const [profileResponse, cartLinesResponse] = await Promise.all([
            axios.get(global.config.bkend.url+"/buyers/1/"),
            axios.get(global.config.bkend.url+"/cart-carlines-by-user/1/")
        ]);
        console.log("printing profile response data")
        console.log(profileResponse.data)
        this.setState({
            profile: profileResponse.data,
            address:profileResponse.data.address,
            cartlines: cartLinesResponse.data.cartlines,
            totalPrice:this.getTotalPrice(cartLinesResponse.data.cartlines),
            total_items:this.getTotalItemsQuantity(cartLinesResponse.data.cartlines),
            total_shipping_cost:this.getShippingCost(cartLinesResponse.data.cartlines)
        });

        // axios
        //     .get(global.config.bkend.url+"/buyers/1/")
        //     .then(response =>
        //         {
        //             // const datacart = response.data
        //             // const datacartlines = response.data.cartlines
        //             // this.setState({
        //             //     carlines:datacartlines,
        //             //     subtotal:this.getSubTotalPrice(datacartlines),
        //             //     shipping:this.getShippingCost(datacartlines),
        //             //     finaltotal:this.getShippingCost(datacartlines)+this.getSubTotalPrice(datacartlines)
        //             // })
        //             this.setState()
        //
        //         }

            //)
    }

    render() {
        return(
            <div className="width-shrink">
                <div className="py-5 text-center">
                        <h2>Checkout </h2>
                </div>

                <div className="row ">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">{this.state.total_items}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <CheckoutPageProductsListComp
                            cartLinesProp={this.state.cartlines}
                            />

                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">Shipping</h6>
                                </div>
                                <span className="text-muted">${this.state.total_shipping_cost}</span>
                            </li>
                            {/*<li className="list-group-item d-flex justify-content-between lh-condensed">*/}
                            {/*    <div>*/}
                            {/*        <h6 className="my-0">Third item</h6>*/}
                            {/*        <small className="text-muted">Brief description</small>*/}
                            {/*    </div>*/}
                            {/*    <span className="text-muted">$5</span>*/}
                            {/*</li>*/}

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (CAD)</span>
                                <strong>${this.state.totalPrice}</strong>
                            </li>
                        </ul>


                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" noValidate="">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" value={this.state.profile.first_name} className="form-control" id="firstName" placeholder=""
                                           />
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value={this.state.profile.last_name}
                                           required=""/>
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                </div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" value={this.state.profile.email} className="form-control" id="email" placeholder="you@example.com"/>
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                            </div>
                            <div className="mb-3">
                                <label >Contact Number </label>
                                <input type="text" value ={this.state.form_data.contact_number} className="form-control" id="contactnum" placeholder="Ex: 306-xxx-xxxx"/>
                                <div className="invalid-feedback">
                                    Please enter a valid contact number for shipping updates.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address">Create a new address</label>


                                {/*<Select options={this.options} />*/}
                                <br/>
                                <label htmlFor="address2">Address Line</label>
                                <input type="text" value={this.state.address.street_address} className="form-control" id="address" placeholder="1234 Main St"
                                       required=""/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                            </div>

                            {/*<div className="mb-3">*/}
                            {/*    <label htmlFor="address2">Address line 2 <span*/}
                            {/*        className="text-muted">(Optional)</span></label>*/}
                            {/*    <input type="text" className="form-control" id="address2"*/}
                            {/*           placeholder="Apartment or suite"/>*/}
                            {/*</div>*/}

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Province</label>
                                    <input type="text" value={this.state.address.province} className="form-control" id="address" placeholder="1234 Main St"
                                           required=""/>
                                    {/*<select className="custom-select d-block w-100" id="country" required="">*/}
                                    {/*    <option value="">Choose...</option>*/}
                                    {/*    <option>United States</option>*/}
                                    {/*</select>*/}
                                    <div className="invalid-feedback">
                                        Please select a valid province.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">City</label>
                                    <input type="text" value={this.state.address.city} className="form-control" id="address" placeholder="1234 Main St"
                                           required=""/>
                                    {/*<select className="custom-select d-block w-100" id="state" required="">*/}
                                    {/*    <option value="">Choose...</option>*/}
                                    {/*    <option>California</option>*/}
                                    {/*</select>*/}
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" value={this.state.address.zipcode} id="zip" placeholder="" required=""/>
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                </div>
                            </div>

                                    <h4 className="mb-3">Payment</h4> <span>Cash on Delivery (COD)</span>

                                    <hr className="mb-4"/>
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to
                                            checkout
                                        </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default CheckoutPageComp