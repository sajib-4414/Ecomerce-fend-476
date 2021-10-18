import React, { Component } from "react";

class OrderDetailsProductRow extends Component{
    state = {
        orderLineItem: this.props.orderline,
        totaPrice:this.getTotalPrice()
    }
    getTotalPrice(){
        // const orderline = this.props.orderline
        // const total = orderline.product.price*orderline.quantity
        // console.log(" I am printing totoal price"+total)
        return 2
    }
    render() {
        return(
            <div className="row">
                <div className="col-9"><span id="name">{this.state.orderLineItem.product.name}</span></div>
                <div className="col-3"><span id="price">$CA{this.state.totaPrice}</span></div>
            </div>
        );
    }
}
export default OrderDetailsProductRow