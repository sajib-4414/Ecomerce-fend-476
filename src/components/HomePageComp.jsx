import React, { Component } from "react";
import BannerComp from "./BannerComp";
import ProductListComp from "./ProductListComp";

class HomePageComp extends Component{
    render() {
        return(
            <React.Fragment>
                <BannerComp/>
                <ProductListComp/>
            </React.Fragment>
        );
    }
}
export default HomePageComp