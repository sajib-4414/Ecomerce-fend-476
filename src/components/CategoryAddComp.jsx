import React, {useState} from "react";
import axios from "axios";

function CategoryAddComp(props) {

    const [name,setName] = useState("")
    const [nameError,setNameError] = useState("")

    const handleFormSubmit = (event)=>{
        event.preventDefault()
        if(name.length === 0){
            setNameError("Name cannot be left empty")
            return
        }

        axios
            .post(global.config.bkend.url+"/categories/", {
                name:name
            })
            .then(response => {
                const answer = window.confirm("Category was added\n Want to add another?")
                if(!answer) window.location.href = "/"
            });
    }

    return(
        <div className="width-shrink">

            <div className="py-5 text-center">
                <h2>Add a Category </h2>
            </div>

            <div className="row justify-content-center">

                <div className="col-md-8 order-md-1">

                    <form className="needs-validation" onSubmit={handleFormSubmit.bind(this)}>
                        <div className="mb-3">
                            <label htmlFor="email">Category name</label>
                            <input type="text"
                                   value={name}
                                   onChange={(event => {
                                       setName(event.target.value)
                                       if(event.target.value.length ===0) setNameError("Name cannot be left empty")
                                   })}
                                   className="form-control"
                                   id="email"
                                   placeholder="category name"/>
                            <div className="text-danger">
                                {nameError}
                            </div>
                        </div>

                        <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm and Add Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default CategoryAddComp