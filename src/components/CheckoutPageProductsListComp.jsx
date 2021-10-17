import React, { Component } from "react";
import ShoppingCartRowComp from "./ShoppingCartRowComp";
import CheckoutPageProductRow from "./CheckoutPageProductRow";

class CheckoutPageProductsListComp extends Component{
    render() {
        return (
            this.props.cartLinesProp.map(item => (
                <CheckoutPageProductRow
                    cartline={item}
                />
            ))

        );
    }
}
export default CheckoutPageProductsListComp