import React from 'react';
export default function CartItem({item,value}) {
    const{id,title,price,total,count} = item;
    const {increment, decrement, removeItem} = value;
    const btnid = 'btn'+ id;
    return (
        <div className="row my-1 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2 text-lg-left">
                <strong>{title}</strong>
            </div>
            <div className="col-10 col-lg-2 mx-auto">
            <span className="d-lg-none">price : </span>
            {price}
                
            </div>
            <div className="col-10 mx-auto col-lg-4 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                       <button className="btn btn-outline-light mx-1" onClick={()=>decrement(id)}>-</button> 
                       <button className="btn btn-outline-light mx-1">{count}</button> 
                       <button id={btnid} className="btn btn-outline-light mx-1" onClick={()=>increment(id,btnid)}>+</button> 
                    </div>
                </div>
            </div>
            <div className="col-10 col-lg-2 mx-auto">
                <div className="cart-icon" onClick={()=>removeItem(id)}>
                    <i className="fas fa-trash"/>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
            <strong> {total} тг</strong>
            </div>
        </div>

    )
}
