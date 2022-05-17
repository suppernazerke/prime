import React, { Component } from 'react';
import {ProductConsumer} from "../context";
import '../App.css';
export default class Product extends Component {
    render() {
        //variables that will be shown in product information card
        const {id, title, img, price, inCart, active,description} = this.props.product;
        //html for product card
        return (
            <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <ProductConsumer>
                    {(value) =>(   
                <div className="card card-w card-front">
                <div className="card-footer px-2 d-flex justify-content-between">
                         <p className="align-self-center mb-0">
                             {title}
                         </p>
                         <h5 className="price font-italic align-self-center mb-0">
                             {price}
                             <span className="mr-1"> тг</span>
                         </h5>
                     </div>
                     <div className="img-container p-3" >
                        <img src={img} alt= "product" className="card-img-top"/>
                     </div>
                     <div className="card-footer card-h smallfont text-center p-1 font-italic">{description}</div>
                     <button className="btn btn-danger px-sm-0 mx-4 mb-3" disabled={active ? (inCart ? true : false) : true} onClick={()=>{
                         value.addToCart(id);
                    }}>
                        {active ? 
                        (inCart ? (<i className="fas fa-check"/>): (<i className="fas fa-cart-plus"/>) ) : "нет в наличии"}
                    </button>
                </div>)}

                </ProductConsumer>
            </div>
        )
    }
}
