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
            //means component is just loaded, state we don't want to update the state of
            //querytype, querytype value here, which will cause not to render properly
            let url = ''
            if (this.state.queryBy ==='category'){
                url = global.config.bkend.url+"/products-by-category/"+this.state.queryByValue+"/";
            }
            else if (this.state.queryBy ==='company'){
                url = global.config.bkend.url+"/products-by-company/"+this.state.queryByValue+"/";
            }
            console.log("calling the API:"+url)
            axios
                .get(url)
                .then(val =>
                    {
                        // if(stateUpdateDict !=null){
                        this.setState({...this.state,products:val.data})
                        // console.log(val)
                        // }
                    })
        }
        else{
            //here we are updating because the url parameter is changed,
            //if we update the state when we detect the change in component did update
            // and also again here, then render does not work properly
            //in this case, the changes are passed from the component did update to here
            //so that when we here update the product list in the state, we also update
            //the querytype, querytype value, at the same time, so that render works flawlessly
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
        if(this.props.location.search!== prevProps.location.search){
            const [queryBy,queryByValue] = this.getQueryValues(params)
            const stateUpdateDict = {
                queryBy:queryBy,
                queryByValue:queryByValue
            }
            this.refreshProductList(stateUpdateDict)
        }
    }
    handleDataPropagation(pk){
        this.props.handleAddToCartToAppJS(pk)
    }
    render() {
        return(
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="header-title pb-3 mt-0">Products from the chosen {this.state.queryBy}</h5>
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