import React, {Component} from "react"
import ProductListUnifiedProductRow from "./ProductListUnifiedProductRow";
class ProductListUnifiedSubListComp extends Component{
    handleAddingToCartToListComp(pk){
        //alert("I M in the subcomp with pk"+pk)
        //console.log(this.props)

         this.props.handleCartAddToParent(pk)
    }
    render() {

        return (
            this.props.products.map(product => (
                <ProductListUnifiedProductRow
                    product={product}
                    handleCartAdd={this.handleAddingToCartToListComp.bind(this)}
                    key={product.pk}

                    // xyz={this.props.delTodo}
                    // addTodo={this.props.addTodo}
                    // editTodo={this.props.editTodo}
                    // markComplete = {this.props.markComplete}
                />
            ))


        )
    }

}

export default ProductListUnifiedSubListComp