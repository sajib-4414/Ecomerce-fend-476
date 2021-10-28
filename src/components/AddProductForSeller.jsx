import React, { Component } from "react";
import '../css/add_product_seller.css'
import Select from 'react-select'
import {Link} from "react-router-dom";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";

class AddProductForSeller extends Component{
    empty_error_list = {
        name:"Product name cannot be left empty",
        price:"Price cannot be left empty",
        quantity:"Please input the quantity",
        delivery_cost:"Please input the delivery cost",
        category_id:"You must choose a category",
        company_id:"You must choose a company",
        form:"Please correct all the errors before submitting the form"
    }
    validation_error_list = {
        price:"Price cannot be a negative value",
        quantity: "Quantity cannot be a negative value",
        delivery_cost: "Delivery cost cannot be a negative value"
    }
    constructor(props) {
        super(props);
        const search_params_str =this.props.location.search
        let editMode = false
        let productId = 0
        if(search_params_str.length ===0 ){
            console.log("No search param")
            //means product add mode
        }
        else
        {
            //product edit mode
            productId = search_params_str.split("=")[1];
            if(productId >0){
                //valid product id
                editMode = true
            }
        }
        this.state = {
            form_data: {
                name: "",
                price: "",
                quantity: "",
                delivery_cost: "",
                category_id: "",
                company_id: "",
            },
            errors: {
                name: "",
                price: "",
                quantity: "",
                delivery_cost: "",
                category_id: "",
                company_id: "",
                form:""
            },
            categories:[],
            companies:[],
            editMode:editMode,
            productId:productId,
            default_company:{},
            default_category:{}
        }
    }

    setCompanyAndCategoryInState(companyResponse,categoryResponse){
        const companies = companyResponse.data
        const categories = categoryResponse.data
        const company_array_for_state = []
        const category_array_for_state = []
        let is_categories_empty = true
        let is_companies_empty = true

        if (Object.keys(companies).length !=0){
            //companies are not empty
            is_companies_empty = false
            companies.map(company =>{
                const item = {label:company.company_name, value:company.pk}
                company_array_for_state.push(item)
            })
        }
        if (Object.keys(categories).length !=0){
            //categories are not empty
            is_categories_empty = false
            categories.map(category =>{
                const item = {label:category.name, value:category.pk}
                category_array_for_state.push(item)
            })
        }
        //because we have to set the state once, multiple times setting state cause problem,
        //not rendering properly
        if(!is_categories_empty && !is_companies_empty){
            this.setState({...this.state,categories:category_array_for_state,companies:company_array_for_state})
        }
        else if (!is_categories_empty){
            this.setState({...this.state,categories:category_array_for_state})
        }
        else if (!is_companies_empty){
            this.setState({...this.state,companies:company_array_for_state})
        }

    }
    async componentDidMount() {
        const [categoryListResponse, companyListResponse] = await Promise.all([
            axios.get(global.config.bkend.url+"/categories/"),
            axios.get(global.config.bkend.url+"/companies/")
        ]);
        if(this.state.editMode){
            //is for edit
            //fetch the product
            axios
                .get(global.config.bkend.url+"/products/"+this.state.productId+"/")
                .then(response =>
                    {
                        // this.setCartDataInState(response)
                        const product = response.data
                        const categories = categoryListResponse.data
                        const companies = companyListResponse.data
                        const companies_to_add = []
                        companies.map(company=>{
                            companies_to_add.push({value:company.pk,label:company.company_name})
                        })
                        const categories_to_add = []
                        categories.map(category=>{
                            categories_to_add.push({value:category.pk,label:category.name})
                        })
                        //const s_company =
                        //const temp_array = []
                        //temp_array.push()
                        this.setState({...this.state,form_data: {
                                name: product.name,
                                price: product.price,
                                quantity: product.quantity,
                                delivery_cost: product.delivery_cost,
                                category_id: product.category.pk,
                                company_id: product.company.pk,
                            }, categories:categories_to_add,companies:companies_to_add,
                            //default_company:companies_to_add[0],
                         default_company:{value:product.company.pk,label:product.company.company_name},
                        default_category:{value:product.category.pk,label:product.category.name}})
                    }
                )
                .catch(error=>{

                })
        }
        else{
            //add new product
            this.setCompanyAndCategoryInState(companyListResponse,categoryListResponse)
        }

        // this.setState({...this.state,categories:categoryListResponse.data,companies:companyListResponse.data})
    }
    handleCategoryChange = (selectedOption) => {
        this.setState({...this.state,form_data:{...this.state.form_data,category_id:selectedOption.value},errors:{...this.state.errors,category_id:""}})
        // this.setState({ selectedOptions });
    }
    handleCompanyChange = (selectedOption) => {
        this.setState({...this.state,form_data:{...this.state.form_data,company_id:selectedOption.value}, errors:{...this.state.errors,company_id:""}})
        // this.setState({ selectedOptions });
    }
    options = [
        { value: 'address0', label: 'Address0' },
        { value: 'address1', label: 'Address1' },
        { value: 'address2', label: 'Address2' }
    ]

    handleChange =e =>{

        const val = e.target.value
        const target = e.target.name
        // console.log("target="+target+", val="+val)
        if(val ===""){
            this.setState({...this.state, form_data:{...this.state.form_data,[e.target.name]:e.target.value},errors:{
                    ...this.state.errors,[target]:this.empty_error_list[target]
                }})
            // this.setState({{...this.state, [e.target.name]:e.target.value},
            //     errors:{...this.state.errors,[target]:this.empty_error_list[target]}})
        }
        else{
            //for some fields we need to have more validation
            if(target === "price" || target === "quantity" || target==="delivery_cost"){
                if(!(val >0)){
                    this.setState({...this.state, form_data:{...this.state.form_data,[e.target.name]:e.target.value},errors:{
                            ...this.state.errors,[target]:this.validation_error_list[target]
                        }})
                }
                else{
                    this.setState({...this.state,form_data:{...this.state.form_data,[e.target.name]:e.target.value},errors:{
                            ...this.state.errors,[target]:""
                        }})
                }
            }
            else{
                //only value is enough for other values
                this.setState({...this.state,form_data:{...this.state.form_data, [e.target.name]:e.target.value},errors:{
                        ...this.state.errors,[target]:""
                    }})
            }

        }
    }
    getUserIdOrNull(){
        var retrievedUser = JSON.parse(localStorage.getItem('currentUser'));
        if(retrievedUser !=null){
            if ('seller' in retrievedUser){
                //do
                const seller = retrievedUser.seller
                return seller.pk
            }
            else{
                return null
            }
        }
        return null
    }
    handleFormSubmission(formEvent){
        // alert("I am here submited")
        formEvent.preventDefault()



        //check empty fields and forcefully assign errors
        const all_form_data = this.state.form_data

        // this.state.form_data
        let errors = {}
        for (var key in all_form_data) {
            if (all_form_data.hasOwnProperty(key)) {
                if (all_form_data[key] === ""){
                    console.log("printing error value")
                    console.log("came here because error key is"+key)
                    errors[key] = this.empty_error_list[key]
                }

            }
        }

        let isAnyErrorFound = false
        // delete errors.form_total_error
        for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
                errors['form'] = this.empty_error_list['form']
                this.setState({...this.state,errors:{...this.state.errors,...errors}})
                isAnyErrorFound = true
                break
            }
        }
        // alert("any error found="+isAnyErrorFound)
        if(isAnyErrorFound){
            //alert("form data something invalid")
            return
        }
        this.setState({...this.state,errors:{...this.state.errors,form:""}})
        //alert("form data all valid")
            //check if user is logged in
        const seller_id = this.getUserIdOrNull()
        if(seller_id ==null){

            this.showToast()
            return;
        }
            //so we have a valid seller id
        if(this.state.editMode){
            //edit the product
            axios
                .put(global.config.bkend.url+"/products/"+this.state.productId+"/", {
                    name:this.state.form_data.name,
                    price:this.state.form_data.price,
                    quantity:this.state.form_data.quantity,
                    delivery_cost:this.state.form_data.delivery_cost,
                    category_id:this.state.form_data.category_id,
                    company_id:this.state.form_data.company_id
                })
                .then(res => {
                    var r = window.confirm("Product Editted successfully!\nDo you want to edit again?");
                    if (r == true) {
                        //do nothing
                    } else {
                        window.location.href = '/productlistforseller/'+seller_id+'/'
                    }

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
            //adding product
            axios
                .post(global.config.bkend.url+"/products/", {
                    name:this.state.form_data.name,
                    price:this.state.form_data.price,
                    quantity:this.state.form_data.quantity,
                    delivery_cost:this.state.form_data.delivery_cost,
                    category_id:this.state.form_data.category_id,
                    company_id:this.state.form_data.company_id,
                    seller_id:seller_id
                })
                .then(res => {
                    var r = window.confirm("Product Added!\nDo you want to add another product?");
                    if (r == true) {
                        //do nothing
                    } else {
                        window.location.href = '/productlistforseller/'+seller_id+'/'
                    }

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
    showToast(){
        toast.error("Please log in as seller first")
        // toast("Please log in to add products to cart")
    }
    render() {
        return(
            <div className="width-shrink ">
                <div><Toaster/></div>
                <div className="py-5 text-center">
                    {this.state.editMode?
                        <h2>Edit your Product </h2>
                        :
                        <h2>Add Product </h2>
                    }


                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8 order-md-1">
                        <form className="needs-validation" onSubmit={this.handleFormSubmission.bind(this)} method="post">
                                <div className="mb-3">
                                    <label htmlFor="email">Product Name </label>
                                    <input type="text" name="name" className="form-control" id="email"
                                           value={this.state.form_data.name} onChange={this.handleChange.bind(this)}
                                           placeholder="Product name"/>
                                    <div className="small text-danger">
                                        {this.state.errors.name}
                                    </div>
                                </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">Price</label>
                                    <input type="number" name="price" className="form-control" id="firstName" placeholder=""
                                           value={this.state.form_data.price} onChange={this.handleChange.bind(this)}
                                           />
                                    <div className="small text-danger">
                                        {this.state.errors.price}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Quantity</label>
                                    <input type="number" name="quantity" className="form-control" id="lastName" placeholder=""
                                           value={this.state.form_data.quantity} onChange={this.handleChange.bind(this)}
                                          />
                                    <div className="small text-danger">
                                        {this.state.errors.quantity}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label >Delivery cost (Flat) </label>
                                <input type="number" name="delivery_cost" className="form-control"
                                       value={this.state.form_data.delivery_cost} onChange={this.handleChange.bind(this)}
                                       id="quantitynum" />
                                <div className="small text-danger">
                                    {this.state.errors.delivery_cost}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address">Choose an Category or
                                    <Link> Create new</Link>
                                </label>

                                <Select
                                    name="category_id"
                                     value={this.state.default_category}
                                    onChange={this.handleCategoryChange.bind(this)}
                                    options={this.state.categories} />

                                <div className="small text-danger">
                                    {this.state.errors.category_id}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address">Choose Company or
                                    <Link> Create new</Link>
                                </label>

                                <Select
                                    name="company_id"
                                    value={this.state.default_company}
                                    onChange={this.handleCompanyChange.bind(this)}
                                    options={this.state.companies} />
                                <div className="small text-danger">
                                    {this.state.errors.company_id}
                                </div>
                            </div>
                            <div className="text-danger text-center">
                                {this.state.errors.form}
                            </div>
                            <br/>
                            {this.state.editMode?
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Submit & Edit Product
                                </button>
                                :
                                <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm and Add Product
                                </button>
                            }

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddProductForSeller