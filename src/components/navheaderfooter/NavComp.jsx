import React, { Component } from "react";
import { Dropdown } from 'react-bootstrap';
import {Link} from "react-router-dom";

class NavComp extends Component{
    state = {
        search_text:""
    }


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
    // getMyProductURL(){
    //     return "/productlistforseller/"+this.props.seller_pk+"/"
    // }

    render() {
        return(
            <div
                className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                <h5 className="my-0 mr-md-auto font-weight-normal">Sam-Caleb Marketplace</h5>
                {this.props.currentUserType=="seller"?"":
                    <form className="form-inline my-2 my-lg-0"
                          onSubmit={formEvent=>{
                              formEvent.preventDefault()
                              window.location.href = '/productlist?search_query='+this.state.search_text
                            }
                          }
                    >
                        <input
                            value={this.state.search_text}
                            onChange={(event)=>{
                                const val = event.target.value
                                this.setState({search_text:val})
                                }
                            }
                            className="form-control mr-sm-2"
                            type="search" placeholder="Search"
                            aria-label="Search"/>
                        <Link to={'/productlist?search_query='+this.state.search_text} className="btn btn-outline-success my-2 my-sm-0">Search</Link>
                        {/*<button className="btn btn-outline-success my-2 my-sm-0">Search</button>*/}
                    </form>
                }

                <nav className="my-0 my-md-0 mr-md-3">



                    {this.props.currentUserType=="seller"?
                        <React.Fragment>
                            <Link className="p-2 text-dark" to="/">My Profile </Link>
                            <Link className="p-2 text-dark" to={"/productlistforseller/"+this.props.seller_pk+"/"}>My added products </Link>
                            <Link className="p-2 text-dark" to="/addeditproduct">Add a product </Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link className="p-2 text-dark" to="/">Home </Link>
                            <Link className='p-2 text-dark' to="/productlist?category=Tech" >Tech Products</Link>
                            <Link className='p-2 text-dark' to="/productlist?category=Fashion">Fashion products
                                   {/*to="/productlistbycategory/Fashion"*/}
                           </Link>
                        </React.Fragment>

                    }
                    {
                        this.props.currentUserType=="buyer"?
                            <React.Fragment>
                                <Link className='p-2 text-dark' to={"/userpreviousorders/"+this.props.buyer_id+"/"}>My Orders</Link>
                                <Link className="btn" to="/shoppingcart">
                                    <i className="fa fa-shopping-cart"></i>
                                    Cart
                                    <span className="badge badge-pill badge-danger">{this.props.cartitemquantity>0?this.props.cartitemquantity :""}</span>
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
                            <Dropdown.Item >
                                {this.props.currentUserType=="seller"?
                                    <Link to="/editsellerprofile">Edit Profile</Link>
                                    :
                                    <Link to="/userregister?edit=True">Edit Profile</Link>
                                }

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