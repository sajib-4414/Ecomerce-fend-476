import React, { Component } from "react";
import OrderDetailsProductRow from "./OrderDetailsProductRow";


class OrderDetailsProductsListComp extends Component{

    render() {
        return (
            this.props.orderLines.map(orderItem => (
                <OrderDetailsProductRow
                    orderline={orderItem}
                />
            ))

        );
    }
}
export default OrderDetailsProductsListComp