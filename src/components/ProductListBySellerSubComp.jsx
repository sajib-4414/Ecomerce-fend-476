import React, {Component} from "react"
import ProductRowForProductListBySeller from "./ProductRowForProductListBySeller";
class ProductListBySellerSubComp extends Component{
    handleAddingToCartToListComp(pk){
        //alert("I M in the subcomp with pk"+pk)
        //console.log(this.props)

         this.props.handleCartAddToParent(pk)
    }
    render() {

        return (
            this.props.products.map(product => (
                <ProductRowForProductListBySeller
                    product={product}
                    handleCartAdd={this.handleAddingToCartToListComp.bind(this)}

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