import React, { Component } from "react";
import '../css/add_product_seller.css'
import Select from 'react-select'
import {Link} from "react-router-dom";

class AddProductForSeller extends Component{
    options = [
        { value: 'address0', label: 'Address0' },
        { value: 'address1', label: 'Address1' },
        { value: 'address2', label: 'Address2' }
    ]
    render() {
        return(
            <div className="width-shrink ">
                <div className="py-5 text-center">
                    <h2>Add Product </h2>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8 order-md-1">
                        <form className="needs-validation" noValidate="">
                                <div className="mb-3">
                                    <label htmlFor="email">Product Name </label>
                                    <input type="text" className="form-control" id="email" placeholder="Product a"/>
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">Price</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" value=""
                                           required=""/>
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Quantity</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" value=""
                                           required=""/>
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label >Delivery cost (Flat) </label>
                                <input type="number" className="form-control" id="quantitynum" />
                                <div className="invalid-feedback">
                                    Please enter a valid deliverycost.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address">Choose an Category or
                                    <Link> Create new</Link>
                                </label>

                                <Select options={this.options} />

                                <div className="invalid-feedback">
                                    Please enter your shipping address.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address">Choose Company or
                                    <Link> Create new</Link>
                                </label>

                                <Select options={this.options} />


                            </div>




                            <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm and Add Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddProductForSeller