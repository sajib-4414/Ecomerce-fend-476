import React, { Component } from "react";
import '../../css/usercheckout-form-validation.css'
import axios from "axios";
import CheckoutPageProductsListComp from "./CheckoutPageProductsListComp";
import {toast, Toaster} from "react-hot-toast";

class CheckoutPageComp extends Component{
    empty_error_list = {
        billing_firstname:"Valid first name is required.",
        billing_lastname:"Valid last name is required.",
        billing_email:"Please enter a valid email address for shipping updates.",
        billing_contact_number:"Please enter a valid contact number for shipping updates.",
    }
    empty_address_error_list = {
        street_address: "Street address cannot be left empty",
        province: "Province name cannot be left empty",
        city: "City cannot be left empty",
        zipcode: "Zipcode cannot be left empty"
    }
    constructor(props) {
        super(props);

        this.state = {
            profile:{},
            address:{
                street_address:"",
                province:"",
                city:"",
                zipcode:""
            },
            cartlines:[],
            totalPrice:0,
            total_items:0,
            total_shipping_cost:0,
            form_data:{
                billing_firstname:"",
                billing_lastname:"",
                billing_email:"",
                billing_contact_number:""
            },
            form_errors:{
                billing_firstname:"",
                billing_lastname:"",
                billing_email:"",
                billing_contact_number:"",
                street_address:"",
                provice:"",
                city:"",
                zipcode:"",
                form_total_error:""
            },
            is_address_not_null:false
        };
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
    setFormDataStates(profile, address){
        this.setState({...this.state,form_data:{
                billing_firstname:profile.first_name,
                billing_lastname:profile.last_name,
                billing_email:profile.email,
                billing_contact_number:""
            }})

    }
    handleChange =e =>{
        const val = e.target.value
        const target = e.target.name
        if(val ===""){
            this.setState({form_data: {...this.state.form_data, [e.target.name]:e.target.value},
                form_errors:{...this.state.form_errors,[target]:this.empty_error_list[target]}})
        }
        else{
            this.setState({form_data: {...this.state.form_data, [e.target.name]:e.target.value},
                form_errors:{...this.state.form_errors,[target]:""}})
        }

    }
    async componentDidMount() {
        var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
        if(retrievedUser !==null){
            if('buyer' in retrievedUser){
                const buyer =retrievedUser.buyer
                const [profileResponse, cartLinesResponse] = await Promise.all([
                    axios.get(global.config.bkend.url+"/buyers/"+buyer.pk+"/"),
                    axios.get(global.config.bkend.url+"/cart-carlines-by-user/"+buyer.pk+"/")
                ]);
                //console.log("printing profile response data")
                //console.log(profileResponse.data)

                if(profileResponse.data.address === null){
                    this.setState({...this.state,
                        profile: profileResponse.data,
                        cartlines: cartLinesResponse.data.cartlines,
                        totalPrice:this.getTotalPrice(cartLinesResponse.data.cartlines),
                        total_items:this.getTotalItemsQuantity(cartLinesResponse.data.cartlines),
                        total_shipping_cost:this.getShippingCost(cartLinesResponse.data.cartlines)
                    });
                    this.setFormDataStates(profileResponse.data,profileResponse.data.address)
                }
                else{
                    this.setState({
                        is_address_not_null:true,
                        profile: profileResponse.data,
                        address:profileResponse.data.address,
                        cartlines: cartLinesResponse.data.cartlines,
                        totalPrice:this.getTotalPrice(cartLinesResponse.data.cartlines),
                        total_items:this.getTotalItemsQuantity(cartLinesResponse.data.cartlines),
                        total_shipping_cost:this.getShippingCost(cartLinesResponse.data.cartlines)
                    });
                    this.setFormDataStates(profileResponse.data,profileResponse.data.address)
                }

            }
        }

    }
    handleOrderSubmit(formEvent){
        formEvent.preventDefault()
        //check if a user is logged in
        var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
        let buyer = null
        if(retrievedUser!==null){
            if ('buyer' in retrievedUser){
                buyer = retrievedUser.buyer
            }
            else{
                toast.error("Please log in as a user to complete the checkout")
                return;
            }
        }
        else{
            toast.error("Please log in as a user to complete the checkout")
            return
        }

        //check empty fields and forcefully assign errors
        const all_form_data = {...this.state.form_data,...this.state.address}
        let errors = {}
        for (var key in all_form_data) {
            if (all_form_data[key] === ""){
                if(key in this.empty_address_error_list){
                    errors[key]= this.empty_address_error_list[key]
                }
                else{
                    errors[key]= this.empty_error_list[key]
                }
            }


        }

        let isAnyErrorFound = false
        if(Object.keys(errors).length !==0){
            //there is some error found
            errors['form_total_error'] = 'Please correct all the errors before submitting'
            this.setState({...this.state,form_errors:{...this.state.form_errors,...errors}})
            isAnyErrorFound = true
        }
        // // delete errors.form_total_error
        // for (var key in errors) {
        //     if (errors[key] !=="") {
        //
        //             break
        //     }
        // }
        //alert("submitted"+isAnyErrorFound)

        if (!isAnyErrorFound) {
            this.setState({...this.state,form_errors:{form_total_error:""}})
            if(this.state.is_address_not_null){
                //means address present, no need to create an address
                axios
                    .post(global.config.bkend.url+"/orders/", {
                        buyer_user_id:buyer.pk,
                        value:this.getTotalPrice(this.state.cartlines),
                        billing_firstname:this.state.form_data.billing_firstname,
                        billing_lastname:this.state.form_data.billing_lastname,
                        billing_email:this.state.form_data.billing_email,
                        billing_contact_number:this.state.form_data.billing_contact_number
                    })
                    .then(res => {
                        window.location.href = '/userpreviousorders/'+buyer.pk+"/";
                    });
            }
            else{
                //creating also an address for the user
                //first update the address for the user
                axios
                    .put(global.config.bkend.url+"/buyers/"+buyer.pk+"/", {
                        address:this.state.address
                    })
                    .then(response => {
                       //now create the order
                        axios
                            .post(global.config.bkend.url+"/orders/", {
                                buyer_user_id:buyer.pk,
                                value:this.getTotalPrice(this.state.cartlines),
                                billing_firstname:this.state.form_data.billing_firstname,
                                billing_lastname:this.state.form_data.billing_lastname,
                                billing_email:this.state.form_data.billing_email,
                                billing_contact_number:this.state.form_data.billing_contact_number
                            })
                            .then(res => {
                                window.location.href = '/userpreviousorders/'+buyer.pk+"/";
                            });
                    });
            }
            //alert("From all ok")


        }

        // if(isAnyErrorFound){
        //     this.setState({form_errors:{...this.state.form_errors, form_total_error:"Please correct all the errors before submit"}})
        //     return
        // }


    }
    handleAddressChange= event=>{
        const val = event.target.value
        const target = event.target.name
        if(val ===""){
            this.setState({...this.state,
                address:{...this.state.address,[target]:""},
                form_errors:{...this.state.form_errors,[target]:this.empty_address_error_list[target]}})
        }
        else{
            this.setState({...this.state,
                address:{...this.state.address,[target]:val},
                form_errors:{...this.state.form_errors,[target]:""}})
        }
        // switch (target){
        //     case 'street_address':
        //         if(val ===""){
        //             this.setState({...this.state,
        //                 address:{...this.state.address,street_address:""},
        //                 form_errors:{...this.state.form_errors,[target]:this.empty_address_error_list[target]}})
        //         }
        //         else{
        //             this.setState({...this.state,
        //                 address:{...this.state.address,street_address:val},
        //                 form_errors:{...this.state.form_errors,[target]:""}})
        //         }
        //         break
        //     case 'province':
        //         if(val ===""){
        //             this.setState({...this.state,
        //                 address:{...this.state.address,street_address:""},
        //                 form_errors:{...this.state.form_errors,[target]:this.empty_address_error_list[target]}})
        //         }
        //         else{
        //             this.setState({...this.state,
        //                 address:{...this.state.address,street_address:val},
        //                 form_errors:{...this.state.form_errors,[target]:""}})
        //         }
        //         break
        //     case 'city':
        //         break
        //     case 'zipcode':
        //         break
        // }
        // alert("Hi am address change event")
    }
    render() {
        return(
            <div className="width-shrink">
                <div><Toaster/></div>
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
                        <form className="needs-validation" onSubmit={this.handleOrderSubmit.bind(this)}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" name="billing_firstname" value={this.state.form_data.billing_firstname} onChange={this.handleChange.bind(this)} className="form-control" id="firstName" placeholder=""
                                           />
                                        <div  className="small text-danger">
                                            {this.state.form_errors.billing_firstname}
                                        </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" name="billing_lastname" className="form-control" id="lastName" placeholder="" onChange={this.handleChange.bind(this)} value={this.state.form_data.billing_lastname}
                                           required=""/>
                                    <div  className="small text-danger">
                                        {this.state.form_errors.billing_lastname}
                                    </div>

                                </div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" name="billing_email"  onChange={this.handleChange.bind(this)} value={this.state.form_data.billing_email} className="form-control" id="email" placeholder="you@example.com"/>
                                <div className="small text-danger">
                                    {this.state.form_errors.billing_email}
                                </div>
                                {/*<div className="invalid-feedback">*/}
                                {/*        */}
                                {/*    </div>*/}
                            </div>
                            <div className="mb-3">
                                <label >Contact Number </label>
                                <input type="text" name="billing_contact_number" onChange={this.handleChange.bind(this)} value ={this.state.form_data.billing_contact_number} className="form-control" id="contactnum" placeholder="Ex: 306-xxx-xxxx"/>
                                <div className="small text-danger">
                                    {this.state.form_errors.billing_contact_number}
                                </div>
                                {/*<div className="invalid-feedback">*/}
                                {/*    */}
                                {/*</div>*/}
                            </div>
                            {this.state.is_address_not_null?
                                <React.Fragment>
                                    <h4 htmlFor="address">Your address</h4>
                                    <div className="mb-3">
                                        <label htmlFor="address2">Street Address</label>
                                        <input type="text" name="street_address" value={this.state.address.street_address} className="form-control" id="address"
                                               disabled/>
                                        <div className="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="country">Province</label>
                                            <input type="text" name="province" value={this.state.address.province} className="form-control" id="address" placeholder="1234 Main St"
                                                   disabled/>
                                            <div className="invalid-feedback">
                                                Please select a valid province.
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="state">City</label>
                                            <input type="text" name="city" value={this.state.address.city} className="form-control" id="address" placeholder="1234 Main St"
                                                   disabled/>
                                            <div className="invalid-feedback">
                                                Please provide a valid state.
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="zip">Zip</label>
                                            <input type="text" name="zipcode" className="form-control" value={this.state.address.zipcode} id="zip" placeholder="" disabled/>
                                            <div className="invalid-feedback">
                                                Zip code required.
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>

                                :
                                <React.Fragment>
                                    <h4 htmlFor="address">Create a new address</h4>
                                    <div className="mb-3">
                                        <label htmlFor="address2">Street Address</label>
                                        <input type="text" name="street_address"
                                               onChange={this.handleAddressChange.bind(this)}
                                               value={this.state.address.street_address}
                                               className="form-control" id="address" placeholder="Write your street address here"
                                               />
                                        <div  className="small text-danger">
                                            {this.state.form_errors.street_address}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5 mb-3">
                                            <label htmlFor="country">Province</label>
                                            <input type="text" name="province"
                                                   onChange={this.handleAddressChange.bind(this)}
                                                   value={this.state.address.province}
                                                   className="form-control" id="address" placeholder="Write Province name"
                                                   />
                                            <div  className="small text-danger">
                                                {this.state.form_errors.province}
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="state">City</label>
                                            <input type="text"
                                                   name="city"
                                                   onChange={this.handleAddressChange.bind(this)}
                                                   value={this.state.address.city}
                                                   className="form-control" id="address"
                                                   placeholder="Write city name"
                                                   />
                                            <div  className="small text-danger">
                                                {this.state.form_errors.city}
                                            </div>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label htmlFor="zip">Zip</label>
                                            <input type="text" name="zipcode"
                                                   className="form-control"
                                                   onChange={this.handleAddressChange.bind(this)}
                                                   value={this.state.address.zipcode}
                                                   id="zip" placeholder="Write zipcode" />
                                            <div  className="small text-danger">
                                                {this.state.form_errors.zipcode}
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>

                            }

                                    <h4 className="mb-3">Payment</h4> <span>Cash on Delivery (COD)</span>

                                    <hr className="mb-4"/>
                                <div className="text-danger text-center">
                                    {this.state.form_errors.form_total_error}
                                </div>
                            <br/>
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm and place Order
                                        </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default CheckoutPageComp