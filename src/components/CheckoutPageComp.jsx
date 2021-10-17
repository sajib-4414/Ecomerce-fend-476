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
    constructor(props) {
        super(props);

        this.state = {
            profile:{},
            address:{},
            cartlines:[],
            totalPrice:0,
            total_items:0,
            total_shipping_cost:0,
            form_data:{
                billing_firstname:"",
                billing_lastname:"",
                billing_email:"",
                billing_contact_number:"",
                street_address:"",
                city:"",
                zipcode:"",
                province:"",
            },
            form_errors:{
                firstname_error:"",
                lastname_error:"",
                email_error:"",
                contact_number_error:"",
                form_total_error:""
            }
        };
    }
    // state = {
    //     profile:{},
    //     address:{},
    //     cartlines:[],
    //     totalPrice:0,
    //     total_items:0,
    //     total_shipping_cost:0,
    //     form_data:{
    //         billing_firstname:"",
    //         billing_lastname:"",
    //         billing_email:"",
    //         billing_contact_number:"",
    //         street_address:"",
    //         city:"",
    //         zipcode:"",
    //         province:"",
    //     },
    //     form_errors:{
    //         firstname_error:"",
    //         lastname_error:"",
    //         email_error:"",
    //         contact_number_error:"",
    //         form_total_error:""
    //     }
    // }
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
                street_address:address.street_address,
                city:address.city,
                zipcode:address.zipcode,
                province:address.province,
                billing_contact_number:""
            }})

    }
    handleChange =e =>{
            this.setState({
                form_data:{
                    [e.target.name]:e.target.value
                }
            })
        const val = e.target.value
        const target = e.target.name
        // console.log("Target is"+target+", value is "+val)
        switch (target){
            case 'billing_firstname':
                if (val === ""){
                    this.setState({form_errors:{...this.state.form_errors,firstname_error:"Valid first name is required."}})
                }
                else{
                    this.setState({form_errors:{...this.state.form_errors, firstname_error:""}})
                }
                break;
            case 'billing_lastname':
                if (val === ""){
                    this.setState({form_errors:{...this.state.form_errors, lastname_error:"Valid last name is required."}})
                }
                else{
                    this.setState({form_errors:{...this.state.form_errors, lastname_error:""}})
                }
                break;
            case 'billing_email':
                if (val === ""){
                    this.setState({form_errors:{...this.state.form_errors, email_error:"Please enter a valid email address for shipping updates."}})
                }
                else{
                    this.setState({form_errors:{...this.state.form_errors, email_error:""}})
                }
                break;
            case 'billing_contact_number':
                if (val === ""){
                    this.setState({form_errors:{...this.state.form_errors, contact_number_error:"Please enter a valid contact number for shipping updates."}})
                }
                else{
                    this.setState({form_errors:{...this.state.form_errors, contact_number_error:""}})
                }
                break;

        }



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
        this.setFormDataStates(profileResponse.data,profileResponse.data.address)
    }
    handleOrderSubmit(formEvent){
        formEvent.preventDefault()


        //check empty fields and forcefully assign errors
        const all_form_data = this.state.form_data
        let errors = {}
        for (var key in all_form_data) {
            if (all_form_data.hasOwnProperty(key)) {
                switch (key){
                    case 'billing_firstname':
                        if (all_form_data[key] === ""){
                            errors['firstname_error']= "Valid first name is required."
                            // this.setState({form_errors:{...this.state.form_errors,firstname_error:"Valid first name is required.",form_total_error:"Please correct all the errors before submit"}})
                            // isAnyErrorFound = true
                        }
                        break
                        // else{
                        //     this.setState({form_errors:{...this.state.form_errors, firstname_error:""}})
                        // }
                    case 'billing_lastname':
                        if (all_form_data[key] === ""){
                            errors['lastname_error']= "Valid last name is required."
                        }
                        break
                        // if (all_form_data[key] === ""){
                        //     this.setState({form_errors:{...this.state.form_errors, lastname_error:"Valid last name is required.", form_total_error:"Please correct all the errors before submit"}})
                        //     isAnyErrorFound = true
                        // }
                        // else{
                        //     this.setState({form_errors:{...this.state.form_errors, lastname_error:""}})
                        // }

                    case 'billing_email':
                        if (all_form_data[key] === ""){
                            errors['email_error']= "Please enter a valid email address for shipping updates."
                        }
                        break
                        // if (all_form_data[key] === ""){
                        //     this.setState({form_errors:{...this.state.form_errors, email_error:"Please enter a valid email address for shipping updates.", form_total_error:"Please correct all the errors before submit"}})
                        //     isAnyErrorFound = true
                        // }
                        // else{
                        //     this.setState({form_errors:{...this.state.form_errors, email_error:""}})
                        // }

                    case 'billing_contact_number':
                        if (all_form_data[key] === ""){
                            errors['contact_number_error']= "Please enter a valid contact number for shipping updates."
                        }
                        break
                        // if (all_form_data[key] === ""){
                        //     this.setState({form_errors:{...this.state.form_errors, contact_number_error:"Please enter a valid contact number for shipping updates.",form_total_error:"Please correct all the errors before submit"}})
                        //
                        //     // this.setState({form_errors:{...this.state.form_errors, form_total_error:"Please correct all the errors before submit"}})
                        //
                        //     // }
                        //     // isAnyErrorFound = true
                        // }
                        // else{
                        //     this.setState({form_errors:{...this.state.form_errors, contact_number_error:""}})
                        // }

                }
                // console.log(key + " -> " + validation_errors[key]);
            }
        }


        // const validation_errors = this.state.form_errors
        let isAnyErrorFound = false
        for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
                if (key !='form_total_error'){
                    errors['form_total_error'] = 'Please correct all the errors before submitting'
                    this.setState({...this.state,form_errors:{...this.state.form_errors,...errors}})
                    isAnyErrorFound = true
                    break
                }


                // if (errors[key]!=="")
                // {
                //     isAnyErrorFound = true;
                //     break
                // }
                // console.log(key + " -> " + validation_errors[key]);
            }
        }
        // alert("submitted"+isAnyErrorFound)
        if(isAnyErrorFound){
            return
        }
        else {
            this.setState({...this.state,form_errors:{form_total_error:""}})
            //now submit the form
        }

        // if(isAnyErrorFound){
        //     this.setState({form_errors:{...this.state.form_errors, form_total_error:"Please correct all the errors before submit"}})
        //     return
        // }


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
                        <form className="needs-validation" onSubmit={this.handleOrderSubmit.bind(this)}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" name="billing_firstname" value={this.state.form_data.billing_firstname} onChange={this.handleChange.bind(this)} className="form-control" id="firstName" placeholder=""
                                           />
                                        <div name="error_firstname" className="small text-danger">
                                            {this.state.form_errors.firstname_error}
                                        </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" name="billing_lastname" className="form-control" id="lastName" placeholder="" onChange={this.handleChange.bind(this)} value={this.state.form_data.billing_lastname}
                                           required=""/>
                                    <div name="error_lastname" className="small text-danger">
                                        {this.state.form_errors.lastname_error}
                                    </div>

                                </div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" name="billing_email"  onChange={this.handleChange.bind(this)} value={this.state.form_data.billing_email} className="form-control" id="email" placeholder="you@example.com"/>
                                <div name="error_lastname" className="small text-danger">
                                    {this.state.form_errors.email_error}
                                </div>
                                {/*<div className="invalid-feedback">*/}
                                {/*        */}
                                {/*    </div>*/}
                            </div>
                            <div className="mb-3">
                                <label >Contact Number </label>
                                <input type="text" name="billing_contact_number" onChange={this.handleChange.bind(this)} value ={this.state.form_data.billing_contact_number} className="form-control" id="contactnum" placeholder="Ex: 306-xxx-xxxx"/>
                                <div name="error_contact_number" className="small text-danger">
                                    {this.state.form_errors.contact_number_error}
                                </div>
                                {/*<div className="invalid-feedback">*/}
                                {/*    */}
                                {/*</div>*/}
                            </div>

                            <div className="mb-3">
                                {/*<label htmlFor="address">Create a new address</label>*/}


                                {/*<Select options={this.options} />*/}
                                <br/>
                                <label htmlFor="address2">Address</label>
                                <input type="text" name="street_address" value={this.state.form_data.street_address} className="form-control" id="address" placeholder="1234 Main St"
                                       disabled/>
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
                                    <input type="text" name="province" value={this.state.form_data.province} className="form-control" id="address" placeholder="1234 Main St"
                                           disabled/>
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
                                    <input type="text" name="city" value={this.state.form_data.city} className="form-control" id="address" placeholder="1234 Main St"
                                           disabled/>
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
                                    <input type="text" name="zipcode" className="form-control" value={this.state.form_data.zipcode} id="zip" placeholder="" disabled/>
                                        <div className="invalid-feedback">
                                            Zip code required.
                                        </div>
                                </div>
                            </div>

                                    <h4 className="mb-3">Payment</h4> <span>Cash on Delivery (COD)</span>

                                    <hr className="mb-4"/>
                                <div name="error_firstname" className="text-danger text-center">
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