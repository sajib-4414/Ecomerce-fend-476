import React, { Component } from "react";
import PrevOrdersPageOrderRow from "./PrevOrdersPageOrderRow";

class PreviousOrdersListSubComp extends Component{
    render() {
        return (
            this.props.orders.map(orderItem => (
                <PrevOrdersPageOrderRow
                    orderItem={orderItem}
                />
            ))

        );
    }
}
export default PreviousOrdersListSubComp