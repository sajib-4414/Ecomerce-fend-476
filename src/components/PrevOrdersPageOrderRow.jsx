import React, { Component } from "react";
import {Link} from "react-router-dom";

class PrevOrdersPageOrderRow extends Component{
    render() {
        return(
            <tr>
                <td>
                    <Link to="">{this.props.orderItem.unique_order_id}</Link>
                    </td>
                <td>
                    {/*<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""*/}
                    {/*     className="thumb-sm rounded-circle mr-2"/> */}
                    {this.props.orderItem.date}</td>
                <td>COD</td>
                <td>{this.props.orderItem.quantity}</td>
                <td>${this.props.orderItem.value}</td>
                <td>
                    {this.props.orderItem.delivered?
                        <span className="badge badge-boxed badge-soft-warning">Success</span>:
                        <span className="badge badge-boxed badge-soft-warning">Not yet</span>
                    }

                </td>
            </tr>
        );
    }
}
export default PrevOrdersPageOrderRow