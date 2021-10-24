import React, { Component } from "react";
import '../css/sellerproductlist.css'
import axios from "axios";
import * as queryString from "querystring";

class ProductListByCategoryComp extends Component{

    constructor(props) {
        super(props);
        console.log("printing from product by category comp props")
        // console.log(this.props.location.search)
        const category_param = queryString.parse(this.props.search)
        console.log("Raw print is")
        console.log(category_param)
        console.log("keys are")
        console.log(Object.keys(category_param))
        console.log("found this, category="+category_param['?category'])

        this.state = {
            categoryName:category_param['?category'],
            product_list:{}
        }
    }
    componentDidUpdate(prevProps){
        let params = queryString.parse(this.props.location.search)
        console.log("printing query string")
        console.log(params['?category'])

        console.log("I am called did upadte")
        console.log(this.props.location)
        if(this.props.location.categoryName!== prevProps.location.categoryName){
            // ... write code to get new data using new prop, also update your state


            //new category, update the data again
            this.setState({...this.state,categoryName:this.props.location.categoryName})
            this.fetchDataAndUpdateState()
        }
    }
    fetchDataAndUpdateState(){
        // let params = queryString.parse(this.props.location.search)
        // console.log("printing query string")
        // console.log(params)
        console.log("calling API")
        console.log(global.config.bkend.url + "/products-by-category/"+this.state.categoryName+"/")
        axios
            .get(global.config.bkend.url + "/products-by-category/"+this.state.categoryName+"/")
            .then(val => {
                    this.setState({...this.state,product_list: val.data})
                    console.log(val)
                }
            )
    }
    componentDidMount() {
        this.fetchDataAndUpdateState()
    }
    render() {
        return(
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="header-title pb-3 mt-0">Products from the category <b>Placeholder</b></h5>
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
                                        <td>Product Development</td>
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

                                        <td><span className='text-success'><b>Yes</b></span></td>
                                        <td>$35,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>Market Research</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Angelo Butler</td>

                                        <td><span className='text-success'><b>Yes</b></span></td>
                                        <td>$45,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>Website &amp; Blog</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Phillip Morse</td>

                                        <td><span className='text-success'><b>Yes</b></span></td>
                                        <td>$70,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>Product Devlopment</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Kevin Heal</td>

                                        <td><span className='text-success'><b>Yes</b></span></td>
                                        <td>$15,000</td>
                                        <td><button className='btn btn-secondary'>Add to Cart</button></td>
                                    </tr>
                                    <tr>
                                        <td>New Office Building</td>
                                        <td><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""
                                                 className="thumb-sm rounded-circle mr-2"/> Frank M. Lyons</td>

                                        <td><span className='text-success'><b>Yes</b></span></td>
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
export default ProductListByCategoryComp