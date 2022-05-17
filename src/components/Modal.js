import React, { Component } from 'react';
import { ProductConsumer } from '../context';
import '../App.css';
import {Form,Col} from 'react-bootstrap';

export default class Modal extends Component {
    render() {
        return (
<ProductConsumer>
    {(value)=>{
        const {checkingInputs,categories} = value;
       return(
  <div className="container modalmargin white">

        
  <Form.Row>
    <Col>
    <Form.Label>Name</Form.Label>
      <Form.Control id="productname" placeholder="Name" autocomplete="off"/>
    </Col>
    <Col>
    <Form.Label>Category</Form.Label>
    <select id="productcategory" className="custom-select mx-auto">
    {categories.map((x,y) => <option key={y}>{x}</option>)}
                                    </select>
    </Col>
    <Col>
    <Form.Label>Description</Form.Label>
      <Form.Control id="productdescription" placeholder="Description" autocomplete="off"/>
    </Col>
    <Col>
    <Form.Label>Code</Form.Label>
      <Form.Control id="productcode" type="number" placeholder="Code" autocomplete="off" />
    </Col>
    <Col><Form.Label>Price</Form.Label>

      <Form.Control id="productprice" type="number" placeholder="Price" autocomplete="off" />
    </Col>
    <Col>
    <Form.Label>Quantity</Form.Label>
      <Form.Control id="productquantity" type="number" placeholder="Quantity" autocomplete="off"/>
    </Col>
    <Col>
    <Form.Label>Image Link</Form.Label>
    <Form.Control id="productimage" placeholder="Link" autocomplete="off" />
    </Col>
    <Col md="0.5" >
    <br/>
    <br/>
    <button type="button" className="btn btn-light" onClick={() => checkingInputs()}>Add</button>
    </Col>
  </Form.Row>



  </div>)
  ;
    
    }}
</ProductConsumer>

        )
    }
}
