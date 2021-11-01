import React, { Component } from "react";

class OrderDetailsProductRow extends Component{
    state = {
        orderLineItem: this.props.orderline,
        totaPrice:this.getTotalPrice()
    }
    getTotalPrice(){
        const orderline = this.props.orderline
        return orderline.product.price*orderline.quantity
    }
    render() {
        return(
            <div className="row">
                <div className="col-9"><span id="name">{this.state.orderLineItem.product.name} (<b> X {this.state.orderLineItem.quantity}</b>)</span></div>
                <div className="col-3"><span id="price">$CA{this.state.totaPrice}</span></div>
            </div>
        );
    }
}
export default OrderDetailsProductRow