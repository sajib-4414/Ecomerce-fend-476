import React from "react";
import GridItemsRow from "./GridItemsRow";

function GridItemListComp(props) {
    return (
        props.products.map(productItem => (
            <GridItemsRow
                key={productItem.pk}
                productItem={productItem}
            />
        ))

    );
}
export default GridItemListComp