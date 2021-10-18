import React, { Component } from "react";
import '../css/orderdetails.css'
import axios from "axios";
import OrderDetailsProductsListComp from "./OrderDetailsProductsListComp";
class OrderDetailsPage extends Component{
    state = {
        orderId:this.props.match.params.id,
        order:{},
        totalShippingCost:0
    }
    getShippingCost(orderLines){
        // const cartLines = this.state.carlines
        let totalShippingCost = 0
        orderLines.forEach(function (cartline, index) {
            totalShippingCost = totalShippingCost + cartline.product.delivery_cost
        });
        return totalShippingCost
    }
    componentDidMount() {
        axios
            .get(global.config.bkend.url+"/order-with-orderlines/"+this.state.orderId+"/")
            .then(res => {
                console.log(res.data);
                const order = res.data
                const orderlines = order.orderlines
                this.setState({...this.state,
                    order:res.data,
                    totalShippingCost:this.getShippingCost(orderlines)
                })
                // alert("succeed creating orders")
                // window.location.href = '/userpreviousorders';
                // let history = useHistory();
                // history.push("/userpreviousorders");
                // <Redirect to='/userpreviousorders'  />

            });
    }

    render() {
        return(
            <div className="card-order-details body-div">
                <div className="title">Purchase Reciept</div>
                <div className="info">
                    <div className="row">
                        <div className="col-7"><span id="heading">Date</span><br/> <span
                            id="details">{this.state.order.date}</span></div>
                        <div className="col-5 pull-right"><span id="heading">Order No.</span><br/> <span
                            id="details">{this.state.order.unique_order_id}</span></div>
                    </div>
                </div>
                <div className="pricing">
                    {/*<OrderDetailsProductsListComp*/}
                    {/*orderLines = {this.state.order}*/}
                    {/*/>*/}
                    <div className="row">
                        <div className="col-9"><span id="name">Shipping</span></div>
                        <div className="col-3"><span id="price">$CA{this.state.totalShippingCost}</span></div>
                    </div>
                </div>
                <div className="total">
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-3"><big>$CA {this.state.order.value}</big></div>
                    </div>
                </div>
                <div className="tracking">
                    <div className="title">Tracking Order</div>
                </div>
                <div className="progress-track">
                    <ul id="progressbar">
                        <li className="step0 active " id="step1">Ordered</li>
                        <li className="step0 active text-center" id="step2">Shipped</li>
                        <li className="step0 active text-right" id="step3">On the way</li>
                        <li className="step0 text-right" id="step4">Delivered</li>
                    </ul>
                </div>
                <div className="footer">
                    <div className="row">
                        {/*<div className="col-2"><img className="img-fluid" src="https://i.imgur.com/YBWc55P.png"/></div>*/}
                        <div className="col-10">Want any help? Please &nbsp;<a> contact us at 306-999-999</a></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default OrderDetailsPage