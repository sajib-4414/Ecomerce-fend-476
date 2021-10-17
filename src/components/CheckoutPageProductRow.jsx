import React, { Component } from "react";

class CheckoutPageProductRow extends Component{
    render() {
        return(
            <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 className="my-0">{this.props.cartline.product.name} (X{this.props.cartline.quantity}) </h6>
                    <small className="text-muted">Brand: {this.props.cartline.product.company.company_name}</small>
                </div>
                <span className="text-muted">${this.props.cartline.product.price*this.props.cartline.quantity}</span>
            </li>
        );
    }
}
export default CheckoutPageProductRow