import React, { Component } from "react";
import '../css/usersignup.css'
import {Link} from "react-router-dom";
class UserSignUpComp extends Component{
    empty_error_list = {
        email:"Email cannot be left empty",
        password:"Password cannot be left empty",
        confirmPassword:"Please write the password again to confirm",
        first_name:"Firstname cannot be left empty",
        last_name:"Lastname cannot be left empty",
        username:"Username cannot be left empty",
        form:"Please correct all the mistakes before submitting the form",
        signup:"Email or Password is incorrect"
    }
    validation_error_list = {
        email:"Please enter a valid email address",
        password:"Password should be Minimum eight characters, at least one letter and one number:",
        form:"Please correct all the mistakes before submitting the form",
        signup:"Email or Password is incorrect",
    }
    state = {
        email:"",
        password:"",
        first_name:"",
        last_name:"",
        username:"",
        confirmPassword:"",
        errors:{
            email:"",
            password: "",
            first_name:"",
            last_name:"",
            username:"",
            confirmPassword:"",
            form:""
        }
    }
    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validatePassword(password) {
        var regularExpression = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regularExpression.test(String(password).toLowerCase());
    }
    handleChange =e =>{
        const val = e.target.value
        const target = e.target.name
        if(val ===""){
            this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                ...this.state.errors,[target]:this.empty_error_list[target]
                }})
            // this.setState({{...this.state, [e.target.name]:e.target.value},
            //     errors:{...this.state.errors,[target]:this.empty_error_list[target]}})
        }
        else{
            this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                    ...this.state.errors,[target]:""
                }})
        }

    }

    render() {
        return(
            <React.Fragment>
                <div className="panel-title text-center">
                    <h1 className="title">Sign Up</h1>
                    <hr/>
                </div>
                <div className="main-login main-center">
                        <form className="form-horizontal" method="post" action="#">

                            <div className="form-group">
                                <label htmlFor="name" className="cols-sm-2 control-label">Your First Name</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user fa"
                                                                   aria-hidden="true"/></span>
                                        <input type="text" className="form-control" name="first_name" id="name" value={this.state.first_name}
                                               onChange={this.handleChange.bind(this)} placeholder="Enter your first Name"/>
                                    </div>
                                    <div className="small text-danger">
                                        {this.state.errors.first_name}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="cols-sm-2 control-label">Your Last Name</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user fa"
                                                                   aria-hidden="true"/></span>
                                        <input type="text" className="form-control" name="last_name" id="name" value={this.state.last_name}
                                               onChange={this.handleChange.bind(this)} placeholder="Enter your last Name"/>
                                    </div>
                                    <div className="small text-danger">
                                        {this.state.errors.last_name}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="cols-sm-2 control-label">Your Email</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"/></span>
                                        <input type="text" className="form-control" name="email" id="email"
                                               value={this.state.email}
                                               onChange={this.handleChange.bind(this)} placeholder="Enter your Email"/>
                                    </div>
                                    <div className="small text-danger">
                                        {this.state.errors.email}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username" className="cols-sm-2 control-label">Username</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-users fa"
                                                                   aria-hidden="true"/></span>
                                        <input type="text" className="form-control" name="username" id="username"
                                               value={this.state.username}
                                               onChange={this.handleChange.bind(this)}  placeholder="Enter your Username"/>
                                    </div>
                                </div>
                                <div className="small text-danger">
                                    {this.state.errors.username}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="cols-sm-2 control-label">Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                                        <input type="password" className="form-control" name="password" id="password"
                                               value={this.state.password}
                                               onChange={this.handleChange.bind(this)}  placeholder="Enter your Password"/>
                                    </div>
                                    <div  className="small text-danger">
                                        {this.state.errors.password}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                                        <input type="password" className="form-control" name="confirmPassword" id="confirm"
                                               value={this.state.confirmPassword}
                                               onChange={this.handleChange.bind(this)}
                                               placeholder="Confirm your Password"/>
                                    </div>
                                    <div className="small text-danger">
                                        {this.state.errors.confirmPassword}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group ">
                                <button type="button" className="btn btn-primary btn-lg btn-block login-button">Register</button>
                            </div>
                            <div className="login-register">
                                <Link  to="/usersignin">Login</Link>
                            </div>
                        </form>
                    </div>
            </React.Fragment>

        );
    }
}
export default UserSignUpComp

