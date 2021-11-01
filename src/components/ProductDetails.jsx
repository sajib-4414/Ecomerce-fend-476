import React, { Component } from "react";
import '../css/product_details.css'
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";
class ProductDetails extends Component{
    state= {
        productId:this.props.match.params.productId,
        product:{},
        company:{}
    }
    componentDidMount() {
        axios
            .get(global.config.bkend.url+"/products/"+this.state.productId+"/")
            .then(response =>
                {
                    const product = response.data
                    const company = product.company
                    this.setState({...this.state,product:product,company: company})
                }
            )
            .catch(error=>{

            })
    }

    render() {
        return(
            <div className="container">
                <div><Toaster/></div>
                <div className="card-details">
                    <div className="container-fliud">
                        <div className="wrapper row">
                            <div className="preview col-md-6">

                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1"><img
                                        src="https://picsum.photos/200/150"/></div>
                                    <div className="tab-pane" id="pic-2"><img src="https://picsum.photos/200/300"/>
                                    </div>
                                    <div className="tab-pane" id="pic-3"><img src="https://picsum.photos/200/300"/>
                                    </div>
                                    <div className="tab-pane" id="pic-4"><img src="https://picsum.photos/200/300"/>
                                    </div>
                                    <div className="tab-pane" id="pic-5"><img src="https://picsum.photos/200/300"/>
                                    </div>
                                </div>
                                <ul className="preview-thumbnail nav nav-tabs">
                                    <li className="active"><a data-target="#pic-1" data-toggle="tab"><img
                                        src="https://picsum.photos/200/200"/></a></li>
                                    <li><a data-target="#pic-2" data-toggle="tab"><img
                                        src="https://picsum.photos/200/200"/></a></li>
                                    <li><a data-target="#pic-3" data-toggle="tab"><img
                                        src="https://picsum.photos/200/200"/></a></li>
                                    <li><a data-target="#pic-4" data-toggle="tab"><img
                                        src="https://picsum.photos/200/200"/></a></li>
                                    <li><a data-target="#pic-5" data-toggle="tab"><img
                                        src="https://picsum.photos/200/200"/></a></li>
                                </ul>

                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title">{this.state.product.name}</h3>
                                <h5 className="product-title">Brand: {this.state.company.company_name}</h5>
                                <div className="rating">
                                    <div className="stars">
                                        <span className="fa fa-star checked-details"/>
                                        <span className="fa fa-star checked-details"/>
                                        <span className="fa fa-star checked-details"/>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                    </div>
                                    <span className="review-no">41 reviews</span>
                                </div>
                                {/*product description here*/}
                                {/*<p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu*/}
                                {/*    laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu*/}
                                {/*    delectus posuere.</p>*/}
                                <h4 className="price">current price: <span>${this.state.product.price}</span></h4>
                                <h5 className="price">Shipping cost: <span>${this.state.product.delivery_cost} FLAT</span></h5>
                                <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(3 or more <span className="fa fa-star checked-details"/>)</strong></p>
                                {/*<h5 className="sizes">sizes:*/}
                                {/*    <span className="size" data-toggle="tooltip" title="small">s</span>*/}
                                {/*    <span className="size" data-toggle="tooltip" title="medium">m</span>*/}
                                {/*    <span className="size" data-toggle="tooltip" title="large">l</span>*/}
                                {/*    <span className="size" data-toggle="tooltip" title="xtra large">xl</span>*/}
                                {/*</h5>*/}
                                {/*<h5 className="colors-details">colors-details:*/}
                                {/*    <span className="color orange not-available" data-toggle="tooltip"*/}
                                {/*          title="Not In store"></span>*/}
                                {/*    <span className="color green"></span>*/}
                                {/*    <span className="color blue"></span>*/}
                                {/*</h5>*/}
                                <div className="action">
                                    <button
                                        onClick={
                                            ()=> {
                                                this.props.handleAddToCartToAppJS(this.state.product.pk)
                                                toast.success("Product added to cart")
                                            }
                                        }
                                        className="add-to-cart btn btn-default"
                                            style={{marginRight:'5px'}}
                                            type="button">add to cart</button>
                                    <button className="like btn btn-default" type="button"><span
                                        className="fa fa-heart"></span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProductDetails