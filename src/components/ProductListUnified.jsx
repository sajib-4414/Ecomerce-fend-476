import React, { Component } from "react";
import '../css/sellerproductlist.css'
import axios from "axios";
import ProductListUnifiedSubListComp from "./ProductListUnifiedSubListComp";
import '../config';
import queryString from "querystring";

class productsListToBuyForUserComp extends Component{
    constructor(props) {
        super(props);
        const query_params = queryString.parse(this.props.location.search)
        // console.log("Raw print is")
        // console.log(query_params)
        // console.log("keys are")
        // console.log(Object.keys(query_params))
        // console.log("found this, category="+query_params['?category'])


        //let's see what parameter we got
        // let params = queryString.parse(this.props.location)
        // console.log("printing from seller product list buy for user,location params=")
        // console.log(query_params)
        const [queryBy, queryByValue] = this.getQueryValues(query_params);

        this.state = {
            products: [],
            queryBy:queryBy,
            queryByValue:queryByValue
        }
    }
    getQueryValues(query_params) {
        let queryBy= ''
        let queryByValue=''

        if ('?category' in query_params){
            //means products by a specific category is requested
            queryBy = "category"
            queryByValue = query_params['?category']
        }
        else if ('?company_id' in query_params){
            //means products by a specific company/brand is requested
            queryBy = 'company'
            queryByValue = query_params['?company_id']
        }
        else if ('?seller_id' in query_params){
            //means products by a specific seller is requested
            queryBy = 'seller'
            queryByValue = query_params['?seller_id']
        }
        else if ('?search_query' in query_params){
            //means products by a specific search query is requested
            queryBy = 'search'
            queryByValue = query_params['?search_query']
        }
        else{
            //do nothing, we did not get anything
        }
        return [queryBy, queryByValue];
    }
    refreshProductList(stateUpdateDict=null){
        if (stateUpdateDict == null){
            if (this.state.queryBy ==='category'){
                console.log("calling the API:"+global.config.bkend.url+"/products-by-category/"+this.state.queryByValue)
                axios
                    .get(global.config.bkend.url+"/products-by-category/"+this.state.queryByValue)
                    .then(val =>
                        {
                            // if(stateUpdateDict !=null){
                                this.setState({...this.state,products:val.data})
                                // console.log(val)
                            // }

                        }

                    )
            }
        }
        else{
            if (stateUpdateDict.queryBy ==='category'){
                console.log("calling the API:"+global.config.bkend.url+"/products-by-category/"+stateUpdateDict.queryByValue)
                axios
                    .get(global.config.bkend.url+"/products-by-category/"+stateUpdateDict.queryByValue)
                    .then(val =>
                        {
                            if(stateUpdateDict !=null){
                                this.setState({...this.state,products:val.data,...stateUpdateDict})
                                // console.log(val)
                            }

                        }

                    )
            }
        }

    }
    //static contextType =App.ThemeContext;
    componentDidMount() {
        this.refreshProductList()
    }

    componentDidUpdate(prevProps){
        let params = queryString.parse(this.props.location.search)
       // console.log("printing query string")
      //  console.log(params['?category'])

       // console.log("I am called did upadte")
       // console.log(this.props.location)
        if(this.props.location.search!== prevProps.location.search){
            // ... write code to get new data using new prop, also update your state
            alert("Hi, looks like query parameter is changed")
            const [queryBy,queryByValue] = this.getQueryValues(params)
            const stateUpdateDict = {
                queryBy:queryBy,
                queryByValue:queryByValue
            }
            console.log("new prop received, category="+queryByValue)
            // this.setState({...this.state,queryBy:queryBy,queryByValue:queryByValue})
            this.refreshProductList(stateUpdateDict)

            //new category, update the data again
            // this.setState({...this.state,categoryName:this.props.location.categoryName})
            // this.fetchDataAndUpdateState()
        }
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
                                    <ProductListUnifiedSubListComp
                                    products={this.state.products}
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
export default productsListToBuyForUserComp