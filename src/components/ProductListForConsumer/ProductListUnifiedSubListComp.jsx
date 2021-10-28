import React, {Component} from "react"
import ProductListUnifiedProductRow from "./ProductListUnifiedProductRow";
class ProductListUnifiedSubListComp extends Component{
    handleAddingToCartToListComp(pk){
        //alert("I M in the subcomp with pk"+pk)
        //console.log(this.props)
        if (this.loggedInuserIsABuyer()){
         this.props.handleCartAddToParent(pk)
        }
        else{
            //show toast, call parent activity to show toast
            this.props.handleShowToast()
        }
    }
    loggedInuserIsABuyer =()=>{
        var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (retrievedUser !== null)
        {
            if ('buyer' in retrievedUser){
                return true
            }
        }
        return false
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