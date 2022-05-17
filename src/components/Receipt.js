import React, { Component } from 'react'
import {ProductConsumer} from '../context';
import Title from './Title';
import Modal from 'react-modal';
export default class Receipt extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value =>{
                        const modalOpen = value.modalOpen;
                        const cartTotal =value.cartTotal;
                        const order = value.order;
                        let title = "Order#" + order;
                        const {confirm,closeModal} = value;
                        Modal.setAppElement('#root')
                            return(
                                <Modal isOpen={modalOpen} style={{
                                    overlay: {
                                      position: 'fixed',
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                    },
                                    content: {
                                      position: 'absolute',
                                      width:'30%',
                                      height: '50%',
                                      border: 'none',
                                      background: '#101010',
                                      overflow: 'auto',
                                      WebkitOverflowScrolling: 'touch',
                                      borderRadius: '4px',
                                      outline: 'none',
                                      margin:'auto',
                                      boxShadow: '0 0 40px #9D0000'
                                    }
                                  }}>
                                <React.Fragment>
                                <div className="d-flex justify-content-end">
                                    <i className="fas fa-times font pointer" onClick={() => closeModal()}></i>
                                </div>
                                <Title title={title}/>
                                <div className="d-flex flex-column position-relative justify-content-center font-weight-bold ">                          
                                <h2 className="gray text-center">Total:</h2>  
                                    <h1 className="total text-center">{cartTotal}.00</h1>
                                    <select id="select" className="custom-select w-50 mx-auto">
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Credit Card</option>
                                    </select>
                                <button className="btn btn-danger text-uppercase  mx-auto my-3" onClick={() => confirm()}>Confirm</button>
                            </div>
                                
                                </React.Fragment>
                                </Modal>
                            );
                        
                    }}
                </ProductConsumer>


            </section>
        )
    }
}
