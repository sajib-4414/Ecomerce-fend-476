import React, { Component } from "react";
import OrderDetailsProductRow from "./OrderDetailsProductRow";


class OrderDetailsProductsListComp extends Component{
    constructor(props) {
        super(props);

        this.state = {
            order:this.props.order,
            orderLines:this.props.order.orderLines
        };
    }
    // componentDidMount() {
    //     this.state = {
    //         order:this.props.order
    //     };
    // }

    // render() {
    //     let vars = null
    //     console.log(this.state.order)
    //     console.log(this.props.order)
    //     if (this.state.order !== undefined){
    //         vars = this.state.order
    //     }
    //     else if (this.props.order !== undefined){
    //         vars = this.props.order
    //     }
    //     if (vars == null){
    //         return (<div></div>)
    //     }
    //     else{
    //         return (
    //             vars.orderLines.map(item => (
    //                 <OrderDetailsProductRow
    //                     orderline={item}
    //                 />
    //             ))
    //
    //         );
    //     }
    //
    // }
    render() {
        return (
            this.state.orderLines.map(orderItem => (
                <OrderDetailsProductRow
                    orderline={orderItem}
                />
            ))

        );
    }
}
export default OrderDetailsProductsListComp