import React from 'react'

export default function StoreColumns() {
    return (
        <div className="container-fluid text-left">
        <div className="row">
            <div className="mx-auto white col-2 d-none pl-4 d-lg-block">
                <p className="text-uppercase">Image</p>
            </div>
            <div className="mx-auto white col-2">
                <p className="text-uppercase">Name</p>
            </div>
            <div className="mx-auto white col-1">
                <p className="text-uppercase">Category</p>
            </div>
            <div className="mx-auto white col-2">
                <p className="text-uppercase">Description</p>
            </div>
            <div className="mx-auto white col-1">
                <p className="text-uppercase">Code</p>
            </div>
            <div className="mx-auto white col-2">
                <p className="text-uppercase">Price</p>
            </div>
            <div className="mx-auto white col-1">
                <p className="text-uppercase">Quantity</p>
            </div>
            <div className="mx-auto white col-1">
                <p className="text-uppercase">Status</p>
            </div>
        </div>
        </div>
    )
}
