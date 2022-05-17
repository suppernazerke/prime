import React, { Component } from 'react';
import Title from "./Title";
import {ProductConsumer} from '../context';
import StoreColumns from './StoreColumns';
import StoreList from './StoreList';
import Modal from './Modal';

export default class Store extends Component {
    render() {
        return (                      
                      <ProductConsumer>
                                    
                                {value => {
             return(
                    <div className="container-fluid bg-grey pt-3">
     
                                <Title title="Store"/>
                                <div className="mt-3">
                                <Modal/> 
                                <StoreColumns/>
                                <StoreList value={value}/>
                                </div>
                                </div>
             )}} 
                                </ProductConsumer>     
             )

    }
}
