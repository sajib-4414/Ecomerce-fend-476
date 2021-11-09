import React, { Component } from "react";
import BannerComp from "./BannerComp";
import GridProductPage from "./Gridproductpage/GridProductPage";

class HomePageComp extends Component{
    render() {
        return(
            <React.Fragment>
                <BannerComp/>
                <GridProductPage/>
            </React.Fragment>
        );
    }
}
export default HomePageComp