import React, { Component } from 'react'
import Title from "./Title";
import {ProductConsumer} from '../context';
import OrderColumns from './OrderColumns';
import OrderList from './OrderList';
import CheckTotals from './CheckTotal';
import Date from './Date';
export default class Orders extends Component {
    render() {
        return (
            <ProductConsumer>     
                                          
            {value => {
                    return(
                            <div className="container-fluid bg-grey pt-3">
                                                <Title title="Orders"/>
                                                <div className="d-flex justify-content-between">
                                                <CheckTotals  value={value}/>
                                                <Date value={value}/>
                                                </div>
                                                <div className="mt-3">
                                                <OrderColumns/>
                                                <OrderList value={value}/>
                                                </div>
                                                </div>
                            )      
                         }          
            } 
            </ProductConsumer>    
        )
    }
}
