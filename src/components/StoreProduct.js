import React, { Component } from 'react';
import {ProductConsumer} from "../context";
export default class StoreProduct extends Component {
    render() {
        const {id, title, img, price, active, store,description,category} = this.props.product;
        const priceId = '$'+ id;
        const priceDivId = '$$'+ id;
        const QuantityId = '%'+ id;
        const QuantityDivId = '%%'+ id;
        const DescriptionId = '@'+ id;
        const DescriptionDivId = '@@'+ id;
        
        return (
            <div className="container-fluid">
                <ProductConsumer>
                    {(value) =>(                     
                 <div className="row my-1 white text-capitalize text-left">
                     
                     <div className=" col-2 my-auto pb-3 d-none d-lg-block">
                        <img src={img} alt= "product" className="store-img card"/>
                     </div>
                     <div  className="col-2 my-auto pb-3">
                         <div id={title} style={{display:'none', position:'relative'}}>
                             <button className="btn btn-light ml-2" onClick={()=>{
                    value.saveName(id)}} style={{position:'absolute',right:'0'}}>Apply</button>
                         </div>
                      <div id={id}>{title}  
                      <button className="btn edit" onClick={()=>{
                    value.editName(id)}}><i className="fas fa-edit white"   /></button>
                        </div>   
                     </div>
                     <div  className="col-1 my-auto pb-3">
                         <div>
                             {category}
                         </div> 
                     </div>
                     <div  className="col-2 my-auto pb-3">
                         <div id={DescriptionId} style={{display:'none', position:'relative'}}>
                             <button className="btn btn-light ml-2" onClick={()=>{
                    value.saveDescription(id,DescriptionId,DescriptionDivId)}} style={{position:'absolute',right:'0'}}>+</button>
                         </div>
                      <div id={DescriptionDivId} className="smallfont">{description}  
                      <button className="btn edit" onClick={()=>{
                    value.editDescription(id,DescriptionId,DescriptionDivId)}}><i className="fas fa-edit white"   /></button>
                        </div>   
                     </div>
                     <div className="col-1 my-auto pb-3">
                        {id}
                     </div>
                     <div className="col-2 my-auto pb-3">
                     <div id={priceId} style={{display:'none', position:'relative'}}>
                             <button className="btn btn-light" onClick={()=>{
                    value.savePrice(id,priceId,priceDivId)}} style={{position:'absolute',right:'0'}}>Apply</button>
                         </div>
                         <div id={priceDivId}>{price}  
                      <button className="btn edit" onClick={()=>{
                    value.editPrice(id,priceId,priceDivId)}}><i className="fas fa-edit white" /></button>
                        </div>
                     </div>
                     <div className="col-1 my-auto pb-3">
                     <div id={QuantityId} style={{display:'none', position:'relative'}}>
                             <button className="btn btn-light ml-2 px-2 py-0" onClick={()=>{
                    value.saveQuantity(id,QuantityId,QuantityDivId)}} style={{position:'absolute',right:'0'}}>+</button>
                         </div>
                         <div id={QuantityDivId}>{store}  
                      <button className="btn edit" onClick={()=>{
                    value.editQuantity(id,QuantityId,QuantityDivId)}}><i className="fas fa-edit white" /></button>
                        </div>
                     </div>
                     <div className="col-1 my-auto pb-3">
                     <button className="btn btn-danger on" onClick={()=>{
                         value.statusChange(id);
                    }}>
                        {active ? "on" : "off" }
                    </button>
                    <button className="btn btn-danger mt-2" onClick={()=>{
                         value.deleteItem(id);
                    }}>
                        Delete
                    </button>
                     </div>
                </div>)}

                </ProductConsumer>
            </div>
        )
    }
}
