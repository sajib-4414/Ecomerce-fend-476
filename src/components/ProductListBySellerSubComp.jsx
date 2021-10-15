import React, {Component} from "react"
import ProductRowForProductListBySeller from "./ProductRowForProductListBySeller";
class ProductListBySellerSubComp extends Component{

    render() {
        return (
            this.props.products.map(product => (
                <ProductRowForProductListBySeller
                    product={product}

                    // xyz={this.props.delTodo}
                    // addTodo={this.props.addTodo}
                    // editTodo={this.props.editTodo}
                    // markComplete = {this.props.markComplete}
                />
            ))


        )
    }

}

export default ProductListBySellerSubComp