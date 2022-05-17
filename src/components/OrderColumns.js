import React from 'react'

export default function OrderColumns() {
    return (
        <div className="container-fluid">
        <div className="row">
            <div className=" white col-1">
                <p className="text-uppercase my-2">Time</p>
            </div>
            <div className="white col-3">
                <p className="text-uppercase my-2 ">Date</p>
            </div>
            <div className=" white col-2">
                <p className="text-uppercase my-2">Order Number</p>
            </div>
            <div className="white col-4">
                <p className="text-uppercase my-2">Description</p>
            </div>  
            <div className="white col-1">
                <p className="text-uppercase  my-2">Total</p>
            </div>
            <div className="white col-1">
                <p className="text-uppercase my-2">Payment</p>
            </div>
        </div>
        </div>
    )
}
