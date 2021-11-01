import React, { Component } from "react";
import BannerComp from "./BannerComp";
import GridProductListComp from "./GridProductListComp";

class HomePageComp extends Component{
    render() {
        return(
            <React.Fragment>
                <BannerComp/>
                <GridProductListComp/>
            </React.Fragment>
        );
    }
}
export default HomePageComp