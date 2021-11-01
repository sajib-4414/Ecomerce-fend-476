import React, {Component } from 'react'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";
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
    handleDelete(){
        var windowResponse = window.confirm("Are you sure to delete the product?");
        if (windowResponse == false) {
            //do nothing
            return
        }
        //axios delete product and notify the list comp
        axios
            .delete(global.config.bkend.url+"/products/"+this.state.product.pk+"/")
            .then(response =>
                {
                    // this.setCartDataInState(response)
                    this.props.deleteHandler()
                }
            )
            .catch(error=>{

            })
    }
    render (){
        // let {name, price, quantity,delivery_cost,category,company,seller,pk} = this.props.product
        return(
            <tr>
                <td>
                    <Link to={'/addeditproduct?editProduct='+this.state.product.pk}>{this.state.product.name}</Link>
                   </td>
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

                <td className='text-center'>{this.state.product.price}</td>
                <td className='text-center'>{this.state.product.quantity}</td>
                <td><Button className='btn btn-danger' onClick={this.handleDelete.bind(this)}>Delete</Button></td>
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