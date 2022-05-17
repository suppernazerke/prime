//importing components for this page
import React, { Component } from 'react'
import Productlist from "./Productlist";
import Cart from './Cart';
import '../App.css';
import Receipt from './Receipt';
import Title from './Title';
import {ProductConsumer} from '../context';
import Category from './Category';
import Edit from './Edit';
import Accept from './Accept';
import Add from './Add';
export default class Details extends Component {
    render() {
        return (                      
            <ProductConsumer>
                      {value => {
    //html code for Shop page
   return(
            <div>
                <div className="container-fluid bg-grey">
                    <Receipt/>
                    <Edit/>
                    <Accept/>
                    <Add/>
                    <div className="row">
                    <div className="col-7 py-5">
                    <Title title={value.greeting}/>
                    <Category value={value}/>
                    <Productlist/>
                    </div>
                    <div className="col-5">
                    <Cart/>
                    </div>
                    </div>
                </div>
            </div>
 )}} 
 </ProductConsumer>     
)
}
}

