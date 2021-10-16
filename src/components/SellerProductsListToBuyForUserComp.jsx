import React, { Component } from "react";
import '../css/sellerproductlist.css'
import axios from "axios";
import ProductListBySellerSubComp from "./ProductListBySellerSubComp";
import '../config';

class SellerProductsListToBuyForUserComp extends Component{
    state = {
        sellerProducts: []
    }
    //static contextType =App.ThemeContext;
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
    handleDataPropagation(pk){
        //alert(" I am from seller comp with pk="+pk)
        this.props.handleAddToCartToAppJS(pk)
    }
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
                                    <ProductListBySellerSubComp
                                    products={this.state.sellerProducts}
                                    handleCartAddToParent = { this.handleDataPropagation.bind(this)}
                                    />

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