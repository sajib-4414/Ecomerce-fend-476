import React, { Component } from "react";
import PrevOrdersPageOrderRow from "./PrevOrdersPageOrderRow";

class PreviousOrdersListSubComp extends Component{
    render() {
        return (
            this.props.orders.map(orderItem => (
                <PrevOrdersPageOrderRow
                    key={orderItem.pk}
                    orderItem={orderItem}
                />
            ))

        );
    }
}
export default PreviousOrdersListSubComp