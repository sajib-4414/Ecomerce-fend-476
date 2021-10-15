import React, {Component } from 'react'
class ProductRowForProductListBySeller extends Component {
    render (){
        function checkStock(quantity){
            if (quantity>0){
                return true
            }
            return false
        }
        const {name, price, quantity,delivery_cost,category,company,seller} = this.props.product
        return(
            <tr>
                <td>{name}</td>
                <td>
                    {/*<img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""*/}
                    {/*     className="thumb-sm rounded-circle mr-2"/> */}
                    {company.company_name}</td>
                {checkStock(quantity) ?
                    <td><span className='text-success'><b>Yes</b></span></td>
                    :
                    <td><span className='text-danger'><b>No</b></span></td>
                }

                <td>{price}</td>
                <td><button className='btn btn-secondary'>Add to Cart</button></td>
            </tr>
        )
    }
    myFunction(id) {
        alert("hello"+id)
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