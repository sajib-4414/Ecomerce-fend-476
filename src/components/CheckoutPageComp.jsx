import React, { Component } from "react";
import '../css/usercheckout-form-validation.css'
import Select from 'react-select'

class CheckoutPageComp extends Component{
    options = [
        { value: 'createnew', label: 'Create New' },
        { value: 'address1', label: 'Address1' },
        { value: 'address2', label: 'Address2' }
    ]
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
                            <span className="badge badge-secondary badge-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">Product name</h6>
                                    <small className="text-muted">Brief description</small>
                                </div>
                                <span className="text-muted">$12</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">Second product</h6>
                                    <small className="text-muted">Brief description</small>
                                </div>
                                <span className="text-muted">$8</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">Third item</h6>
                                    <small className="text-muted">Brief description</small>
                                </div>
                                <span className="text-muted">$5</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (CAD)</span>
                                <strong>$20</strong>
                            </li>
                        </ul>


                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" noValidate="">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" value=""
                                           required=""/>
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value=""
                                           required=""/>
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                </div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                            </div>
                            <div className="mb-3">
                                <label >Contact Number </label>
                                <input type="text" className="form-control" id="contactnum" placeholder="Ex: 306-xxx-xxxx"/>
                                <div className="invalid-feedback">
                                    Please enter a valid contact number for shipping updates.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address">Choose an address or create new</label>

                                <Select options={this.options} />
                                <br/>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St"
                                       required=""/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address2">Address line 2 <span
                                    className="text-muted">(Optional)</span></label>
                                <input type="text" className="form-control" id="address2"
                                       placeholder="Apartment or suite"/>
                            </div>

                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="country">Country</label>
                                    <select className="custom-select d-block w-100" id="country" required="">
                                        <option value="">Choose...</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">State</label>
                                    <select className="custom-select d-block w-100" id="state" required="">
                                        <option value="">Choose...</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required=""/>
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