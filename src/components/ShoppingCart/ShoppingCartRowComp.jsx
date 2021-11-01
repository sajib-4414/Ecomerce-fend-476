import React, {Component } from 'react'
import axios from "axios";
import '../../css/bootstrap.min.css'

class ShoppingCartRowComp extends Component {
    state = {
        cartLineItem: this.props.cartline
    }
    getTotalPrice(itemprice, quantity){
        return itemprice*quantity
    }
    handleItemAdd = (cartline_id, quantity)=>{
        // alert("cartline id"+cartline_id+",product_id"+product_id+",quantity"+quantity)
        axios
            .put(global.config.bkend.url+"/cartlines/"+cartline_id+"/", {
                quantity:quantity+1
            })
            .then(response => {
                console.log(response);
                this.setState({cartLineItem:response.data})
                //now notify App.js
                this.props.notifyCartItemListComp()
                // this.setState({todos:[...this.state.todos,res.data]})
            });
    }
    handleItemSubtract = (cartline_id, quantity)=>{
        if (quantity === 1) return
        axios
            .put(global.config.bkend.url+"/cartlines/"+cartline_id+"/", {
                quantity:quantity-1
            })
            .then(response => {
                console.log(response);
                this.setState({cartLineItem:response.data})
                //now notify App.js
                this.props.notifyCartItemListComp()
                // this.setState({todos:[...this.state.todos,res.data]})
            });
    }
    handleItemRemove = (cartline_id)=>{
        axios
            .delete(global.config.bkend.url+"/cartlines/"+cartline_id+"/", {})
            .then(response => {
                console.log(response);
                // this.setState({cartLineItem:response.data})
                //now notify App.js
                this.props.notifyCartItemListComp()
                // this.setState({todos:[...this.state.todos,res.data]})
            });
    }


    render (){
        //let {product, cart, quantity,pk} = this.props.cartline
        return(
            <tr>
                <td className="col-sm-6 col-md-5">
                    <div className="media">
                        {/*<a className="thumbnail pull-left" href="#"> <img className="media-object"*/}
                        {/*                                                  src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"*/}
                        {/*                                                  style={{width: "72px", height: "72px",marginRight:'10px'}}/>*/}
                        {/*</a>*/}
                        <div className="media-body">
                            <h4 className="media-heading"><a href="#">{this.state.cartLineItem.product.name}</a></h4>
                            <h5 className="media-heading"> by <a href="#">{this.state.cartLineItem.product.company.company_name}</a></h5>

                        </div>
                    </div>
                </td>
                <td className="col-sm-3 col-md-2" style={{textAlign: "center"}}>
                    <div className="input-group" style={{maxWidth:'150px'}}>
                        <button type="button"
                                onClick={()=>{
                                    this.handleItemAdd(this.state.cartLineItem.pk, this.state.cartLineItem.quantity)
                                }}
                                className="btn">
                            <i className="far fa-plus-square"/>
                        </button>
                    <input type="text" value={this.state.cartLineItem.quantity}
                           style={{maxWidth:'40px',paddingLeft:'0px',paddingRight:'0px'}}
                           className="form-control text-center" id="exampleInputEmail1"/>
                        <button
                            onClick={()=>{
                                this.handleItemSubtract(this.state.cartLineItem.pk, this.state.cartLineItem.quantity)
                            }}
                            type="button" className="btn">
                            <i className="far fa-minus-square"/>
                        </button>
                    </div>
                </td>
                <td className="col-sm-1 col-md-1 text-center"><strong>${this.state.cartLineItem.product.price}</strong></td>
                <td className="col-sm-1 col-md-1 text-center"><strong>${this.getTotalPrice(this.state.cartLineItem.product.price,this.state.cartLineItem.quantity)}</strong></td>
                <td className="col-sm-1 col-md-1">
                    <button
                        onClick={()=>{
                            this.handleItemRemove(this.state.cartLineItem.pk)
                        }}
                        type="button" className="btn btn-danger">
                        <span className="glyphicon glyphicon-remove"/> Remove
                    </button>
                </td>
            </tr>
        )
    }


}
export default ShoppingCartRowComp