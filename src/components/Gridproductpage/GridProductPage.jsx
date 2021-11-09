import React, { useEffect, useState} from "react";
import GridItemListComp from "./GridItemListComp";
import axios from "axios";

function GridProductPage (props){
    const [products,setProducts] = useState([])
    useEffect(() => {
        axios
            .get(global.config.bkend.url+"/products/?sort=date")
            .then(response =>
                {
                    setProducts(response.data)
                }
            )
            .catch()
    }, []);

        return(
                <div className="card-deck mb-3 text-center">
                    <GridItemListComp
                    products = {products}
                    />
                </div>
        );

}
export default GridProductPage