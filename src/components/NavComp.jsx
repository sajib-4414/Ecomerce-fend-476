import React, { Component } from "react";
import { Dropdown } from 'react-bootstrap';
import {Link} from "react-router-dom";

class NavComp extends Component{
    // state={
    //     currentUserType:this.props.currentUserType,
    //     currentUserName:""
    // }
    // componentDidMount() {
    //     var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if(retrievedUser !==null){
    //         if ('buyer' in retrievedUser){
    //             this.setState({...this.state,currentUserName:retrievedUser.buyer.first_name, currentUserType:"buyer"})
    //         }
    //         else{
    //             this.setState({...this.state,currentUserName:retrievedUser.seller.first_name, currentUserType:"seller"})
    //         }
    //     }
    //     else{
    //         //there is no user
    //         this.setState({
    //             currentUserType:"guest",
    //             currentUserName:""
    //         })
    //     }
    // }

    render() {
        return(
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                <h5 className="my-0 mr-md-auto font-weight-normal">Sam-Caleb Marketplace</h5>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <nav className="my-0 my-md-0 mr-md-3">


                    <Link className="p-2 text-dark" to="/">Home </Link>
                    <Link className='p-2 text-dark' to="/productlistbycategory/Tech">Tech Products</Link>
                    <Link className='p-2 text-dark' to="/productlistbycategory">Fashion Products</Link>
                    {
                        this.props.currentUserType=="buyer"?
                            <React.Fragment>
                                <Link className='p-2 text-dark' to="/userpreviousorders">My Orders</Link>
                                <Link className="btn" to="shoppingcart">
                                    <i className="fa fa-shopping-cart"></i> Cart <span

                                    className="badge badge-pill badge-danger">{this.props.cartitemquantity>0?this.props.cartitemquantity :""}</span>
                                </Link>
                            </React.Fragment>


                            :
                            <span></span>
                    }

                    {/*{this.props.cartitemquantity>0?*/}
                    {/*    <Link className="btn" to="shoppingcart">*/}
                    {/*        <i className="fa fa-shopping-cart"></i> Cart <span*/}

                    {/*        className="badge badge-pill badge-danger">{this.props.cartitemquantity}</span>*/}
                    {/*    </Link>*/}
                    {/*    :*/}
                    {/*    <Link className="btn" to="shoppingcart">*/}
                    {/*        <i className="fa fa-shopping-cart"></i> Cart*/}
                    {/*    </Link>*/}
                    {/*}*/}

                </nav>
                {this.props.currentUserName ?
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {this.props.currentUserName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item >
                                <Link to="/logout">Logout</Link>
                            </Dropdown.Item>
                            {/*<Dropdown.Item href="#/action-2">*/}
                            {/*    <Link to="/sellersignin">*/}
                            {/*        Seller sign in*/}
                            {/*    </Link>*/}
                            {/*</Dropdown.Item>*/}
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Sign in
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item >
                                <Link to="/usersignin">User sign in</Link>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                <Link to="/sellersignin">
                                    Seller sign in
                                </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                }
                {/*<Dropdown>*/}
                {/*    <Dropdown.Toggle variant="primary" id="dropdown-basic">*/}
                {/*        Sign in*/}
                {/*    </Dropdown.Toggle>*/}
                {/*    <Dropdown.Menu>*/}
                {/*        <Dropdown.Item >*/}
                {/*            <Link to="/usersignin">User sign in</Link>*/}
                {/*            </Dropdown.Item>*/}
                {/*        <Dropdown.Item href="#/action-2">*/}
                {/*            <Link to="/sellersignin">*/}
                {/*            Seller sign in*/}
                {/*            </Link>*/}
                {/*            </Dropdown.Item>*/}
                {/*    </Dropdown.Menu>*/}
                {/*</Dropdown>*/}
            </div>
        )
    }
}

export default NavComp;