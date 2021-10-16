import React, {Component} from "react"
import ProductRowForProductListBySeller from "./ProductRowForProductListBySeller";
import ShoppingCartRowComp from "./ShoppingCartRowComp";
class ShoppingCartItemsComp extends Component{

    render() {

        return (
            this.props.cartLines.map(item => (
                <ShoppingCartRowComp
                    cartline={item}
                    // handleCartAdd={this.handleAddingToCartToListComp.bind(this)}

                    // xyz={this.props.delTodo}
                    // addTodo={this.props.addTodo}
                    // editTodo={this.props.editTodo}
                    // markComplete = {this.props.markComplete}
                />
            ))


        )
    }

}

export default ShoppingCartItemsComp