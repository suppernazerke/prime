import React from 'react'
import StoreProduct from './StoreProduct';
export default function StoreList({value}) {
    return (
        <div className="container-fluid">
            {value.products.map(product => {
                  return <StoreProduct key={product.id} product = {product}/>;
                                    }) }                 
        </div>
    )
}
