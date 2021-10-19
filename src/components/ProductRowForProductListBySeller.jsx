import React, {Component } from 'react'
import axios from "axios";
class ProductRowForProductListBySeller extends Component {
    checkStock(quantity){
        if (quantity>0){
            return true
        }
        return false
    }
    handleAddToCart(pk) {
        // alert("I got pk"+pk)
        // alert("Added to cart"+pk)
        this.props.handleCartAdd(pk)
        // this.props.handleCartAdd(pk)
    }
    // {name, price, quantity,delivery_cost,category,company,seller,pk} = this.props.product

    render (){
    let {name, price, quantity,delivery_cost,category,company,seller,pk} = this.props.product
        return(
            <tr>
                <td>{name}</td>
                <td>

                    {company.company_name}
                </td>
                {this.checkStock(quantity) ?
                    <td><span className='text-success'><b>Yes</b></span></td>
                    :
                    <td><span className='text-danger'><b>No</b></span></td>
                }

                <td>{price}</td>
                <td><button
                    onClick={
                        ()=>{
                            this.props.handleCartAdd(pk)
                        }
                    }
                    className='btn btn-secondary'>Add to Cart</button></td>
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
export default ProductRowForProductListBySeller