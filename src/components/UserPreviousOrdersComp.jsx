import React, { Component } from "react";
import '../css/sellerproductlist.css'
import axios from "axios";
import CheckoutPageProductsListComp from "./CheckoutPageProductsListComp";
import PreviousOrdersListSubComp from "./PreviousOrdersListSubComp";

class UserPreviousOrdersComp extends Component{
    constructor(props) {
        super(props);

        this.state = {
            prevOrders:[]
        };
    }
    componentDidMount() {
        axios
            .get(global.config.bkend.url+"/order-orderlines-by-user/1/")
            .then(res => {
                console.log(res.data);
                this.setState({prevOrders:res.data})
                // alert("succeed creating orders")
                // window.location.href = '/userpreviousorders';
                // let history = useHistory();
                // history.push("/userpreviousorders");
                // <Redirect to='/userpreviousorders'  />

            });
    }

    render() {
        return(
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="header-title pb-3 mt-0">My previous orders</h5>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                    <tr className="align-self-center">
                                        <th>Order Number</th>
                                        <th>Date Ordered</th>
                                        <th>Payment Type</th>
                                        <th>Quantity</th>
                                        <th>Order Total</th>
                                        <th>Delivered</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <PreviousOrdersListSubComp
                                        orders={this.state.prevOrders}
                                    />
                                    {/*<tr>*/}
                                    {/*    <td>Product Devlopment</td>*/}
                                    {/*    <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""*/}
                                    {/*             className="thumb-sm rounded-circle mr-2"/> Kevin Heal</td>*/}
                                    {/*    <td>Paypal</td>*/}
                                    {/*    <td>5/8/2018</td>*/}
                                    {/*    <td>$15,000</td>*/}
                                    {/*    <td><span className="badge badge-boxed badge-soft-warning">panding</span></td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td>New Office Building</td>*/}
                                    {/*    <td><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt=""*/}
                                    {/*             className="thumb-sm rounded-circle mr-2"/> Frank M. Lyons</td>*/}
                                    {/*    <td>Paypal</td>*/}
                                    {/*    <td>15/7/2018</td>*/}
                                    {/*    <td>$35,000</td>*/}
                                    {/*    <td><span className="badge badge-boxed badge-soft-primary">Success</span></td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td>Market Research</td>*/}
                                    {/*    <td><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""*/}
                                    {/*             className="thumb-sm rounded-circle mr-2"/> Angelo Butler</td>*/}
                                    {/*    <td>Pioneer</td>*/}
                                    {/*    <td>30/9/2018</td>*/}
                                    {/*    <td>$45,000</td>*/}
                                    {/*    <td><span className="badge badge-boxed badge-soft-warning">Panding</span></td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td>Website &amp; Blog</td>*/}
                                    {/*    <td><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt=""*/}
                                    {/*             className="thumb-sm rounded-circle mr-2"/> Phillip Morse</td>*/}
                                    {/*    <td>Paypal</td>*/}
                                    {/*    <td>2/6/2018</td>*/}
                                    {/*    <td>$70,000</td>*/}
                                    {/*    <td><span className="badge badge-boxed badge-soft-warning">Success</span></td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td>Product Devlopment</td>*/}
                                    {/*    <td><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""*/}
                                    {/*             className="thumb-sm rounded-circle mr-2"/> Kevin Heal</td>*/}
                                    {/*    <td>Paypal</td>*/}
                                    {/*    <td>5/8/2018</td>*/}
                                    {/*    <td>$15,000</td>*/}
                                    {/*    <td><span className="badge badge-boxed badge-soft-primary">panding</span></td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td>New Office Building</td>*/}
                                    {/*    <td><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""*/}
                                    {/*             className="thumb-sm rounded-circle mr-2"/> Frank M. Lyons</td>*/}
                                    {/*    <td>Paypal</td>*/}
                                    {/*    <td>15/7/2018</td>*/}
                                    {/*    <td>$35,000</td>*/}
                                    {/*    <td><span className="badge badge-boxed badge-soft-primary">Success</span></td>*/}
                                    {/*</tr>*/}
                                    </tbody>
                                </table>
                            </div>
                            {/*end table-responsive*/}
                            <div className="pt-3 border-top">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserPreviousOrdersComp