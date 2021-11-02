import React, { Component } from "react";
import '../../css/usersignup.css'
import {Link} from "react-router-dom";
import axios from "axios";
import jQuery from 'jquery';
class SellerSignUpComp extends Component{
    empty_error_list = {
        email:"Email cannot be left empty",
        password:"Password cannot be left empty",
        confirmPassword:"Please write the password again to confirm",
        first_name:"Firstname cannot be left empty",
        last_name:"Lastname cannot be left empty",
        photoidnum:"PhotoID number cannot be left empty",
        form:"Please correct all the mistakes before submitting the form",
        signup:"Email or Password is incorrect"
    }
    validation_error_list = {
        email:"Please enter a valid email address",
        password:"Password should be Minimum eight characters, at least one letter and one number:",
        confirmPassword:"Password must match",
        form:"Please correct all the mistakes before submitting the form",
        signup:"Email or Password is incorrect",
    }
    state = {
        email:"",
        password:"",
        first_name:"",
        last_name:"",
        photoidnum:"",
        confirmPassword:"",
        errors:{
            email:"",
            password: "",
            first_name:"",
            last_name:"",
            photoidnum:"",
            confirmPassword:"",
            form:""
        },
        edit_params:{
            is_edit_user:false,
            edit_user:{},
            want_to_change_password_too:false
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
            //for some fields we need to have more validation
            if(target === "email"){
                if(this.validateEmail(val)){
                    this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                            ...this.state.errors,[target]:""
                        }})
                }
                else{
                    this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                            ...this.state.errors,[target]:this.validation_error_list[target]
                        }})
                }
            }
            else if(target ==="password"){
                if(this.validatePassword(val)){
                    this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                            ...this.state.errors,[target]:""
                        }})
                }
                else{
                    this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                            ...this.state.errors,[target]:this.validation_error_list[target]
                        }})
                }
            }
            else if(target ==="confirmPassword") {
                if(this.state.password !==""){
                    if(this.state.password !== val){
                        this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                                ...this.state.errors,[target]:this.validation_error_list[target]
                            }})
                    }
                    else{
                        this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                                ...this.state.errors,[target]:""
                            }})
                    }
                }
                else{
                    this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                            ...this.state.errors,[target]:""
                        }})
                }
            }
            else{
                //only value is enough for other values
                this.setState({...this.state,[e.target.name]:e.target.value,errors:{
                        ...this.state.errors,[target]:""
                    }})
            }

        }

    }

    handleFormSubmission(formEvent){
        // alert("I am here submited")
        formEvent.preventDefault()
        // console.log(this.state)
        //check is for edit or new
        if(this.state.edit_params.is_edit_user){
            //for editing user
            //check empty fields and forcefully assign errors
            const all_form_data = jQuery.extend({},  this.state)
            delete all_form_data.errors;
            delete all_form_data.edit_params;

            let errors_copy = jQuery.extend({},  this.state.errors)
            for (var key in all_form_data) {
                if (all_form_data[key] === ""){
                    errors_copy[key] = this.empty_error_list[key]
                }
            }

            if(!this.state.edit_params.want_to_change_password_too){
                delete errors_copy.password
                delete errors_copy.confirmPassword
                delete errors_copy.form
            }

            let flag=false
            for (var key in errors_copy) {
                if(errors_copy[key] !== ""){
                    errors_copy['form'] = this.validation_error_list['form']
                        // this.validation_error_list['form']
                    // this.setState({...this.state,errors:{...this.state.errors,...errors_copy}})
                    // console.log("I am inside the looooooop")

                    flag = true
                    // console.log("flag="+flag)
                    break
                    // return;
                }
            }
            if(flag){
                // console.log("Flag is true")
                this.setState({...this.state,errors:{...this.state.errors,...errors_copy}})
                return;
            }
            else{
                // console.log("Flag is False")
            }

            this.setState({...this.state,errors:{...this.state.errors,form:""}})
            const payload = {
                first_name:this.state.first_name,
                last_name:this.state.last_name,
            }
            if(this.state.edit_params.want_to_change_password_too){
                payload['password'] = this.state.password
            }
            axios
                .put(global.config.bkend.url+"/sellers/"+this.state.edit_params.edit_user.pk+"/", payload)
                .then(response => {
                    // const user = response.data
                    // localStorage.setItem('currentUser', JSON.stringify(user));
                    var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
                    retrievedUser.seller = response.data
                    localStorage.setItem('currentUser', JSON.stringify(retrievedUser));
                    window.location.href = '/';
                })
                .catch(errors=>{
                    console.log(errors.response)
                    const error_response = errors.response
                    if(error_response.status === 400){
                        this.setState({...this.state,errors:{...this.state.errors,form:error_response.data.email}})
                    }
                });
        }
        else{
            //it is for a new user

            //check empty fields and assign errors if by any chance it is not there
            const all_form_data = jQuery.extend({},  this.state)
            delete all_form_data.errors;

            // this.state.form_data
            let errors = {}
            for (var key in all_form_data) {
                    if (all_form_data[key] === ""){
                        errors[key] = this.empty_error_list[key]
                    }
            }
            //now let's check for validation errors
            if(this.state.password !== ""){
                if(!this.validatePassword(this.state.password)){
                    errors['password'] = this.validation_error_list['password']
                }
            }
            if (this.state.password !== "" && this.state.confirmPassword !== ""){
                if (this.state.password !== this.state.confirmPassword){
                    errors['confirmPassword'] = this.validation_error_list['confirmPassword']
                }
            }
            if(this.state.email !==""){
                if(!this.validateEmail(this.state.email)){
                    errors['email'] = this.validation_error_list['email']
                }
            }


            // delete errors.form_total_error
            for (var key in errors) {
                    errors['form'] = 'Please correct all the errors before submitting'
                    this.setState({...this.state,errors:{...this.state.errors,...errors}})
                    return;
            }
            this.setState({...this.state,errors:{...this.state.errors,form:""}})
            axios
                .post(global.config.bkend.url+"/sellers/", {
                    first_name:this.state.first_name,
                    last_name:this.state.last_name,
                    email:this.state.email,
                    photo_id_num:this.state.photoidnum,
                    password:this.state.password
                })
                .then(res => {
                    window.location.href = '/signupsuccess';
                })
                .catch(errors=>{
                    console.log(errors.response)
                    const error_response = errors.response
                    if(error_response.status === 400){
                        this.setState({...this.state,errors:{...this.state.errors,form:error_response.data.email}})
                    }
                });

        }

    }
    componentDidMount() {
        const search_param_string = this.props.location.search
        if(search_param_string.includes("?edit=True")){
            //means editing the user
            //check if anyone is logged in
            var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
            if(retrievedUser !==null){
                if('seller' in retrievedUser) {
                    const seller = retrievedUser.seller
                    this.setState({
                        ...this.state,
                        edit_params:{...this.state.edit_params,edit_user:seller,
                            is_edit_user:true},
                        email:seller.email,
                        photoidnum:seller.photo_id_num,
                        first_name:seller.first_name,
                        last_name:seller.last_name
                    })
                }
            }
        }
    }
    render() {
        return(
            <React.Fragment>
                <div className="panel-title text-center">
                    {this.state.edit_params.is_edit_user?
                        <h1 className="title">Edit your profile</h1>
                        :
                        <h1 className="title">Sign Up</h1>
                    }
                    <hr/>
                </div>
                <div className="main-login main-center">
                    <form className="form-horizontal" action="" onSubmit={this.handleFormSubmission.bind(this)} method="post" >

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
                                    {this.state.edit_params.is_edit_user?
                                        <input type="text" className="form-control" name="email" id="email"
                                               value={this.state.email}
                                               placeholder="Enter your Email" disabled/>
                                        :
                                        <input type="text" className="form-control" name="email" id="email"
                                               value={this.state.email}
                                               onChange={this.handleChange.bind(this)} placeholder="Enter your Email"/>
                                    }
                                </div>
                                <div className="small text-danger">
                                    {this.state.errors.email}
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username" className="cols-sm-2 control-label">Govt. Approved ID No</label>
                            <div className="cols-sm-10">
                                <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-users fa"
                                                                   aria-hidden="true"/></span>
                                    {/*<input type="text" className="form-control" name="photoidnum" id="photoidnum"*/}
                                    {/*       value={this.state.photoidnum}*/}
                                    {/*       onChange={this.handleChange.bind(this)}  placeholder="Enter your ID Number"/>*/}
                                    {this.state.edit_params.is_edit_user?
                                        <input type="text" className="form-control" name="photoidnum" id="photoidnum"
                                               value={this.state.photoidnum}
                                               placeholder="Enter your Photo ID number" disabled/>
                                        :
                                        <input type="text" className="form-control" name="photoidnum" id="photoidnum"
                                               value={this.state.photoidnum}
                                               onChange={this.handleChange.bind(this)}  placeholder="Enter your PhotoIDnum"/>
                                    }
                                </div>
                            </div>
                            <div className="small text-danger">
                                {this.state.errors.photoidnum}
                            </div>
                        </div>
                        {this.state.edit_params.is_edit_user?
                            <div className='form-inline'>
                                <input type="checkbox" id="checkbox" style={{marginRight:'5px'}}
                                       onChange={event => {
                                           this.setState({...this.state,edit_params:{...this.state.edit_params,want_to_change_password_too:event.target.checked}})
                                       }}
                                       id="check3"/>
                                <label htmlFor="check3">Change Password</label>
                            </div>
                            :""
                        }

                        {this.state.edit_params.is_edit_user && this.state.edit_params.want_to_change_password_too?
                            <React.Fragment>
                                <div className="form-group">
                                    <label htmlFor="password" className="cols-sm-2 control-label">New Password</label>
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
                                    <label htmlFor="confirm" className="cols-sm-2 control-label">Confirm new Password</label>
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
                            </React.Fragment>
                            :
                            ""
                        }
                        {this.state.edit_params.is_edit_user?
                            ""
                            :
                            <React.Fragment>
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
                            </React.Fragment>

                        }

                        <div className="text-center text-danger">
                            {this.state.errors.form}
                        </div>
                        <div className="form-group ">
                            <button type="button" type="submit" className="btn btn-primary btn-lg btn-block login-button">
                                {this.state.edit_params.is_edit_user?"Confirm Edit":"Register"}
                            </button>
                        </div>
                        {this.state.edit_params.is_edit_user?"":
                            <div className="login-register">
                                <Link  to="/sellersignin">Login</Link>
                            </div>
                        }

                    </form>
                </div>
            </React.Fragment>

        );
    }
}
export default SellerSignUpComp

