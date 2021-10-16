import React, {Component } from 'react'
import axios from "axios";
import '../css/bootstrap.min.css'

class ShoppingCartRowComp extends Component {
    getTotalPrice(itemprice, quantity){
        return itemprice*quantity
    }


    render (){
        let {product, cart, quantity,pk} = this.props.cartline
        return(
            <tr>
                <script src='../scripts/bootstrap.min.js'></script>
                <script src='../scripts/jquery-1.11.1.min.js'></script>
                <td className="col-sm-6 col-md-5">
                    <div className="media">
                        {/*<a className="thumbnail pull-left" href="#"> <img className="media-object"*/}
                        {/*                                                  src="http://icons.iconarchive.com/icons/custom-icon-design/flatastic-2/72/product-icon.png"*/}
                        {/*                                                  style={{width: "72px", height: "72px",marginRight:'10px'}}/>*/}
                        {/*</a>*/}
                        <div className="media-body">
                            <h4 className="media-heading"><a href="#">{product.name}</a></h4>
                            <h5 className="media-heading"> by <a href="#">{product.company.company_name}</a></h5>

                        </div>
                    </div>
                </td>
                <td className="col-sm-3 col-md-2" style={{textAlign: "center"}}>
                    <div className="input-group">
                        <button type="button" className="btn">
                            <i className="far fa-plus-square"></i>
                        </button>
                    <input type="text" value={quantity} className="form-control text-center" id="exampleInputEmail1"/>
                        <button type="button" className="btn">
                            <i className="far fa-minus-square"></i>
                        </button>
                    </div>
                </td>
                <td className="col-sm-1 col-md-1 text-center"><strong>${product.price}</strong></td>
                <td className="col-sm-1 col-md-1 text-center"><strong>${this.getTotalPrice(product.price,quantity)}</strong></td>
                <td className="col-sm-1 col-md-1">
                    <button type="button" className="btn btn-danger">
                        <span className="glyphicon glyphicon-remove"></span> Remove
                    </button>
                </td>
            </tr>
        )
    }


}
export default ShoppingCartRowComp