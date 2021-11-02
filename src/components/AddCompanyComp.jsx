import React, {useState} from "react";
import '../css/usercheckout-form-validation.css'
import jQuery from "jquery";
import axios from "axios";


const AddCompanyComp = (props)=>{
    const [formErrors,setFormErrors] = useState({
        company_name:"",
        company_username:"",
        street_address:"",
        province:"",
        city:"",
        zipcode:"",
        form:""
    })
    const empty_error_list = {
        company_name:"Company name cannot be left empty",
        company_username:"Company's username cannot be left empty",
        street_address:"Address line cannot be left empty",
        province:"Province name cannot be left empty",
        city:"City cannot be left empty",
        zipcode:"Zipcode cannot be left empty"
    }
    const [formData,setFormData]=useState({
        company_name:"",
        company_username:"",
        street_address:"",
        province:"",
        city:"",
        zipcode:""
    })
    const handleInputChange = (event) =>{
        const target = event.target.name
        const value = event.target.value
        // console.log("target="+target+",value="+value)
        if(value.length ===0){
            setFormErrors({...formErrors,[target]:empty_error_list[target]})
            setFormData({...formData,[target]:value})
            return
        }
        setFormData({...formData,[target]:value})
        setFormErrors({...formErrors,[target]:""})
    }
    const handleFormSubmission = formSubmissionEvent =>{
        formSubmissionEvent.preventDefault()

        //check if any fields are left empty
        let emptyFieldFound = false
        let errors_copy = jQuery.extend({},  formErrors)
        for (let key in formData){
            if (formData[key] === "") {
                errors_copy[key]=empty_error_list[key]
                emptyFieldFound = true
            }

        }
        if(emptyFieldFound){
            errors_copy['form'] = 'Please correct all the mistakes before submitting'
            setFormErrors({...formErrors,...errors_copy})
            return
        }

        //what if some errors are present
        for (let key in formErrors){
            if (key!=='form' && formErrors[key] !== "") {
                //for any errors, exit the loop, showing the form error
                setFormErrors({...formErrors,form:'Please correct all the mistakes before submitting'})
                return;
            }
        }

        //coming here means no more errors
        setFormErrors({...formErrors,form:''})

        //now add the company
        axios
            .post(global.config.bkend.url+"/companies/", {
                company_name:formData.company_name,
                company_username:formData.company_username,
                address:{
                    street_address: formData.street_address,
                    province:formData.province,
                    city:formData.city,
                    zipcode:formData.zipcode
                }
            })
            .then(response => {
                const answer = window.confirm("Company was added\n Want to add another?")
                if(!answer) window.location.href = "/"
            });


        // if(emptyFieldFound){
        //     setFormErrors({...formErrors,form:'Please correct all the mistakes and try again'})
        //     return
        // }
    }

    return(
        <div className="width-shrink">
            <div className="py-5 text-center">
                <h2>Add a company </h2>
            </div>

            <div className="row justify-content-center">

                <div className="col-md-8 order-md-1">

                    <form className="needs-validation" onSubmit={handleFormSubmission.bind(this)}>
                        <div className="mb-3">
                            <label htmlFor="email">Company name</label>
                            <input
                                value={formData.company_name}
                                type="text"
                                   name="company_name"
                                   onChange={handleInputChange.bind(this)}
                                   className="form-control" id="email" placeholder="company name"/>
                            <div className="text-danger">
                                {formErrors.company_name}
                            </div>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="email">Username</label>
                            <input
                                value={formData.company_username}
                                type="text"
                                onChange={handleInputChange.bind(this)}
                                name="company_username"
                                className="form-control"
                                id="email"
                                placeholder="username"/>
                            <div className="text-danger">
                                {formErrors.company_username}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address2">Street Address</label>
                            <br/>
                            <input
                                value={formData.street_address}
                                name="street_address"
                                type="text"
                                onChange={handleInputChange.bind(this)}
                                className="form-control"
                                id="address"
                                placeholder="street name,e.g 1234 Toronto Ave"
                                   required=""/>
                            <div className="text-danger">
                                {formErrors.street_address}
                            </div>
                        </div>

                        {/*<div className="mb-3">*/}
                        {/*    <label htmlFor="address2">Address line 2 <span*/}
                        {/*        className="text-muted">(Optional)</span></label>*/}
                        {/*    <input type="text" className="form-control" id="address2"*/}
                        {/*           placeholder="Apartment or suite"/>*/}
                        {/*</div>*/}

                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label htmlFor="country">Province</label>
                                <input
                                    value={formData.province}
                                    onChange={handleInputChange.bind(this)}
                                    name="province"
                                    type='text'
                                    className='form-control d-block w-100'/>
                                {/*<select className="custom-select d-block w-100" id="country" required="">*/}
                                {/*    <option value="">Choose...</option>*/}
                                {/*    <option>Saskatchwan</option>*/}
                                {/*</select>*/}
                                <div className="text-danger">
                                    {formErrors.province}
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">City</label>
                                <input
                                    value={formData.city}
                                    onChange={handleInputChange.bind(this)}
                                    type='text'
                                    name="city"
                                    className='form-control d-block w-100'/>
                                {/*<select className="custom-select d-block w-100" id="state" required="">*/}
                                {/*    <option value="">Choose...</option>*/}
                                {/*    <option>Regina</option>*/}
                                {/*</select>*/}
                                <div className="text-danger">
                                    {formErrors.city}
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zipcode</label>
                                <input
                                    value={formData.zipcode}
                                    onChange={handleInputChange.bind(this)}
                                    name="zipcode"
                                    type="text"
                                    className="form-control" id="zip" placeholder=""/>
                                <div className="text-danger">
                                    {formErrors.zipcode}
                                </div>
                            </div>
                        </div>



                        <div className="text-center text-danger">
                            {formErrors.form}
                        </div>
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm and Add Company
                        </button>
                    </form>
                </div>
            </div>
            </div>
        );

}
export default AddCompanyComp