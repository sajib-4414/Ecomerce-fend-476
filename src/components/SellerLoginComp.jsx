import React, { Component } from "react";
import '../css/userlogin.css'
class SellerLoginComp extends Component{
    render() {
        return(
            <div id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" action="" method="post">
                                    <h3 className="text-center text-info">Login for Seller</h3>
                                    <div className="form-group">
                                        <label htmlFor="username" className="text-info">Username:</label><br/>
                                        <input type="text" name="username" id="username" className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-info">Password:</label><br/>
                                        <input type="text" name="password" id="password" className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="remember-me" className="text-info"><span>Remember me</span>
                                            <span><input id="remember-me" name="remember-me"
                                                         type="checkbox"/></span></label><br/>
                                        <input type="submit" name="submit" className="btn btn-info btn-md"
                                               value="submit"/>
                                    </div>
                                    <div id="register-link" className="text-right">
                                        <a href="#" className="text-info">Register here</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default SellerLoginComp