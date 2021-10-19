import React, { Component } from "react";
import '../css/userlogin.css'
import {Link} from "react-router-dom";
class UserLoginComp extends Component{
    empty_error_list = {
        email:"Email cannot be left empty",
        password:"Password cannot be left empty",
        form:"Please correct all the mistakes before submitting the form",
        login:"Email or Password is incorrect"
    }
    validation_error_list = {
        email:"Please enter a valid email address",
        password:"Password should be Minimum eight characters, at least one letter and one number:",
        form:"Please correct all the mistakes before submitting the form",
        login:"Email or Password is incorrect",
    }
    state = {
        email:"",
        password:"",
        errors:{
            email:"",
            password: "",
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
        // console.log(target)
        if (target === "email"){
            if (val ===""){
                this.setState({...this.state,[target]:val, errors:{
                    ...this.state.errors,[target]:this.empty_error_list[target]
                    }})
            }
            else{
                //check if the email is valid
                if(this.validateEmail(val)){
                    this.setState({...this.state,[target]:val, errors:{
                            ...this.state.errors,[target]:""
                        }})
                }
                else{
                    this.setState({...this.state,[target]:val, errors:{
                            ...this.state.errors,[target]:this.validation_error_list[target]
                        }})
                }

            }

        }
        else if (target === "password"){
            if (val ===""){
                this.setState({...this.state,[target]:val, errors:{
                        ...this.state.errors,[target]:this.empty_error_list[target]
                    }})
            }
            else{
                if(this.validatePassword(val)){
                    this.setState({...this.state,[target]:val, errors:{
                            ...this.state.errors,[target]:""
                        }})
                }
                else{
                    this.setState({...this.state,[target]:val, errors:{
                            ...this.state.errors,[target]:this.validation_error_list[target]
                        }})
                }

            }
        }

    }
    handleLoginSubmit(formEvent){
        formEvent.preventDefault()
        if (this.state.errors.email !=="" || this.state.errors.password !==""){
            this.setState({...this.state,errors:{...this.state.errors,form:this.empty_error_list["form"]}})
        }
        else if (this.state.errors.email ==="" && this.state.errors.password ===""){
            //now check if the fields are actually empty or not
            let errors = {}
            if (this.state.email === ""){
                errors['email'] = this.empty_error_list['email']
            }
            if (this.state.password === ""){
                errors['password'] = this.empty_error_list['password']
            }
            if (Object.keys(errors).length !== 0){
                errors['form'] = this.empty_error_list['form']
                this.setState({...this.state,errors:{...this.state.errors, ...errors}})
                console.log(errors)
            }
            else{
                //we are ready to submit the form
                this.setState({...this.state,errors:{...this.state.errors,form:""}})
            }
        }


    }
    render() {
        return(
            <div id="login">
                <h3 className="text-center text-white pt-5">Login form</h3>
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-md-6">
                            <div id="login-box" className="col-md-12">
                                <form id="login-form" className="form" action="" onSubmit={this.handleLoginSubmit.bind(this)} method="post">
                                    <h3 className="text-center">Consumers Login Here: </h3>
                                    <div className="form-group">
                                        <label htmlFor="username">Email:</label><br/>
                                        <input type="text" name="email" id="username" value={this.state.email} onChange={this.handleChange.bind(this)} className="form-control"/>
                                        <div className="small text-danger">
                                        {this.state.errors.email}
                                    </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" >Password:</label><br/>
                                        <input type="text" name="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)} className="form-control"/>
                                        <div className="small text-danger">
                                            {this.state.errors.password}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="remember-me" ><span>Remember me</span>
                                            <span><input id="remember-me" name="remember-me"
                                                         type="checkbox"/></span></label><br/>
                                        <input type="submit" name="submit" className="btn btn-info btn-md"
                                               value="Login"/>
                                    </div>
                                    <div className="text-center text-danger">
                                        {this.state.errors.form}
                                    </div>
                                    <div id="register-link" className="text-right">
                                        <Link  to="/userregister">Register</Link>
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
export default UserLoginComp