import React from 'react'
import OrderProduct from './OrderProduct';
export default function OrderList({value}) {
    return (
        <div className="container-fluid">
            {value.filteredDate.map(check => {
                  return <OrderProduct key={check.id} check = {check}/>;
                                    }) }                 
        </div>
    )
}