import React, { Component } from "react";
import '../css/sellerproductlist.css'

class SellerProductsListToBuyForUserComp extends Component{
    render() {
        return(
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="header-title pb-3 mt-0">Products from the seller Jane Doe</h5>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                    <tr className="align-self-center">
                                        <th>Product Name</th>
                                        <th>Company Name</th>

                                        <th>In Stock</th>
                                        <th>Item price</th>
                                        <th>Buy</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Product Devlopment</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Kevin Heal</td>

                                        <td><span className='text-success'><b>Yes</b></span></td>
                                        <td>$15,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>New Office Building</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Frank M. Lyons</td>

                                        <td><span className='text-danger'><b>No</b></span></td>
                                        <td>$35,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>Market Research</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Angelo Butler</td>

                                        <td><span className='text-danger'><b>No</b></span></td>
                                        <td>$45,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>Website &amp; Blog</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Phillip Morse</td>

                                        <td><span className='text-danger'><b>No</b></span></td>
                                        <td>$70,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>Product Devlopment</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Kevin Heal</td>

                                        <td><span className='text-danger'><b>No</b></span></td>
                                        <td>$15,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>New Office Building</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Frank M. Lyons</td>

                                        <td><span className='text-danger'><b>No</b></span></td>
                                        <td>$35,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
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
export default SellerProductsListToBuyForUserComp