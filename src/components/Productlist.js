import React, { Component } from 'react';
import Product from "./Product";
import {ProductConsumer} from '../context';
import '../App.css';
export default class Productlist extends Component {
    render() {
        //html for Shop page
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    //listing all the products from database
                                    return value.showingProducts.map(product => {
                                        return <Product key={product.id} product = {product}/>;
                                    });                                  
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
