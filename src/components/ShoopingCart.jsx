import React, { Component } from "react";
import axios from "axios";
import ShoppingCartItemsComp from "./ShoppingCartItemsComp";

class ShoppingCartComp extends Component{
    state = {
        carlines: this.props.initialCartLines
    }

    componentDidMount() {
        axios
            .get(global.config.bkend.url+"/products/")
            .then(val =>
                {
                    this.setState({sellerProducts:val.data})
                    console.log(val)
                }

            )

    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Total</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <ShoppingCartItemsComp
                            cartLines = {this.props.initialCartLines}
                            notifyShoppingCart={this.props.notifyAppJSToUpdateCart}
                            />

                            {/*<tr>*/}
                            {/*    <td className="col-md-6">*/}
                            {/*        <div className="media">*/}
                            {/*            <a className="thumbnail pull-left" href="#"> <img className="media-object"*/}
                            {/*                                                              src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"*/}
                            {/*                                                              style={{width: '72px', height: '72px', marginRight:'10px'}}/>*/}
                            {/*            </a>*/}
                            {/*            <div className="media-body">*/}
                            {/*                <h4 className="media-heading"><a href="#">Product name</a></h4>*/}
                            {/*                <h5 className="media-heading"> by <a href="#">Brand name</a></h5>*/}

                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="col-md-1" style={{textAlign: 'center'}}>*/}
                            {/*        <input type="number" className="form-control" id="exampleInputEmail1"/>*/}
                            {/*    </td>*/}
                            {/*    <td className="col-md-1 text-center"><strong>$4.99</strong></td>*/}
                            {/*    <td className="col-md-1 text-center"><strong>$9.98</strong></td>*/}
                            {/*    <td className="col-md-1">*/}
                            {/*        <button type="button" className="btn btn-danger">*/}
                            {/*            <span className="glyphicon glyphicon-remove"></span> Remove*/}
                            {/*        </button>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><h5>Subtotal</h5></td>
                                <td className="text-right"><h5><strong>$24.59</strong></h5></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><h5>Estimated shipping</h5></td>
                                <td className="text-right"><h5><strong>$6.94</strong></h5></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><h3>Total</h3></td>
                                <td className="text-right"><h3><strong>$31.53</strong></h3></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button type="button" className="btn btn-default">
                                        <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-success">
                                        Checkout <span className="glyphicon glyphicon-play"></span>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
export default ShoppingCartComp