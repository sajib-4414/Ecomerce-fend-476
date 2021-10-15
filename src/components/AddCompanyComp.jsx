import React, { Component } from "react";
import '../css/usercheckout-form-validation.css'
import Select from 'react-select'

class AddCompanyComp extends Component{
    options = [
        { value: 'createnew', label: 'Create New' },
        { value: 'address1', label: 'Address1' },
        { value: 'address2', label: 'Address2' }
    ]
    render() {
        return(
            <div className="width-shrink">
                <div className="py-5 text-center">
                    <h2>Add a company </h2>
                </div>

                <div className="row justify-content-center">

                    <div className="col-md-8 order-md-1">

                        <form className="needs-validation" noValidate="">
                            <div className="mb-3">
                                <label htmlFor="email">Company name</label>
                                <input type="text" className="form-control" id="email" placeholder="you@example.com"/>
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="email">Username</label>
                                <input type="text" className="form-control" id="email" placeholder="you@example.com"/>
                                <div className="invalid-feedback">
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address2">Address line 1 </label>
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
                                    <label htmlFor="country">Province</label>
                                    <select className="custom-select d-block w-100" id="country" required="">
                                        <option value="">Choose...</option>
                                        <option>Saskatchwan</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid Province.
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state">City</label>
                                    <select className="custom-select d-block w-100" id="state" required="">
                                        <option value="">Choose...</option>
                                        <option>Regina</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="zip">Zipcode</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required=""/>
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>




                            <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm and Add Company
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddCompanyComp