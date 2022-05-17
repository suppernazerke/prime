import React, { Component } from 'react';
import {ProductConsumer} from "../context";
export default class OrderProduct extends Component {
    render() {
        const {time,id,date,description,total,payment} = this.props.check;
        return (
            <div className="container-fluid">
                <ProductConsumer>
                    {(value) =>(     
                        <div className="row white text-capitalize border-top">
                            <div className="white col-1 ">
                                {time}
                            </div>
                            <div className="white col-3 ">
                               {date}
                            </div>
                            <div className="white col-2">
                               {id}
                            </div>
                            <div className="white col-4 ">
                               {description}
                            </div>
                            <div className="white col-1 ">
                                {total}
                            </div>
                            <div className="white col-1">
                                {payment}
                            </div>
                        </div>                
                 )}

                </ProductConsumer>
            </div>
        )
    }
}
