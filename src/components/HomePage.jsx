import React, { Component } from "react";
import BannerComp from "./BannerComp";
import ProductListComp from "./ProductListComp";

class HomePage extends Component{
    render() {
        return(
            <React.Fragment>
                <BannerComp/>
                <ProductListComp/>
            </React.Fragment>
        );
    }
}
export default HomePage