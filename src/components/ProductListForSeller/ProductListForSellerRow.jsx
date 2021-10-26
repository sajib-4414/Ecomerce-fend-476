import React, {Component } from 'react'
import {Link} from "react-router-dom";
class ProductListForSellerRow extends Component {
    state = {
        product:this.props.product
    }

    // checkStock(quantity){
    //     return quantity>0
    //     // if (quantity>0){
    //     //     return true
    //     // }
    //     // return false
    // }

    // handleAddToCart(pk) {
    //     // alert("I got pk"+pk)
    //     // alert("Added to cart"+pk)
    //
    //     this.props.handleCartAdd(pk)
    //
    //
    //     // this.props.handleCartAdd(pk)
    // }
    // {name, price, quantity,delivery_cost,category,company,seller,pk} = this.props.product
    // getCompanyURL() {
    //     //console.log("printing the company")
    //     const product = this.props.product
    //     const company = product.company
    //     // console.log(company)
    //     // const url =
    //     return "/productlist?company_id=" + company.pk+"/"
    // }

    render (){
        // let {name, price, quantity,delivery_cost,category,company,seller,pk} = this.props.product
        return(
            <tr>
                <td>{this.state.product.name}</td>
                <td>
                    {this.state.product.company.company_name}

                </td>
                <td>
                    {this.state.product.date}
                </td>
                {/*{this.checkStock(quantity) ?*/}
                {/*    <td><span className='text-success'><b>Yes</b></span></td>*/}
                {/*    :*/}
                {/*    <td><span className='text-danger'><b>No</b></span></td>*/}
                {/*}*/}

                <td>{this.state.product.price}</td>
                <td>{this.state.product.quantity}</td>
            </tr>
        )
    }


    // Delete
//       delTodo = id => {
//     // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
//     //   this.setState({
//     //     todos: this.state.todos.filter(todo => todo.id !== id)
//     //   })
//     // );
//   };
}
export default ProductListForSellerRow