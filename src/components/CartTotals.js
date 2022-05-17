import React from 'react'

export default function CartTotals({value}) {
    const{cartTotal,clearCart,buy} = value;
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right">
                        <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-light mb-3 px-5" type="button" onClick={() => clearCart()}>Clear Cart</button>
                        <button className="btn btn-outline-light mb-3 px-5" type="button" onClick={() => buy()}>Buy</button>
                        </div>
                        <h5>
                            <span className="text-title">Total : </span>
                            <strong>{cartTotal}</strong>
                            <span> тг </span>
                        </h5>

                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}
