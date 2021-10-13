import React, { Component } from "react";
import { Dropdown } from 'react-bootstrap';
import {Link} from "react-router-dom";

class NavComp extends Component{
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
                    <a className="p-2 text-dark" href="https://getbootstrap.com/docs/4.0/examples/pricing/#">Features</a>
                    <a className="p-2 text-dark" href="https://getbootstrap.com/docs/4.0/examples/pricing/#">Enterprise</a>
                    <a className="p-2 text-dark" href="https://getbootstrap.com/docs/4.0/examples/pricing/#">Support</a>
                    <a className="p-2 text-dark" href="https://getbootstrap.com/docs/4.0/examples/pricing/#">Pricing</a>
                </nav>
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
            </div>
        )
    }
}

export default NavComp;