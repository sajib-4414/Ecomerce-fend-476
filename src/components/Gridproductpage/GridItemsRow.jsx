import React from "react";
import {Link} from "react-router-dom";

const GridItemsRow = (props)=> {
    return(
        <div className="card mb-4 box-shadow">
            <div className="card-header">
                <h4 className="my-0 font-weight-normal">{props.productItem.name}</h4>
            </div>
            <div className="card-body">
                <h1 className="card-title pricing-card-title">${props.productItem.price} <small className="text-muted">(10% off)</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                    <li>Brand: {props.productItem.company.company_name}</li>
                    <li>Recently added</li>
                    <li>Rated 3.5</li>
                    {/*<li>Help center access</li>*/}
                </ul>
                <Link to={'productdetails/'+props.productItem.pk+'/'} className="btn btn-lg btn-block btn-primary"> View details</Link>
                {/*<button type="button" className="btn btn-lg btn-block btn-primary"></button>*/}
            </div>
        </div>
    )
}
export default GridItemsRow