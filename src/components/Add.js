import React, { Component } from 'react'
import {ProductConsumer} from '../context';
import Title from './Title';
import Modal from 'react-modal';
export default class Add extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value =>{
                        const {closeModal4,addCategory} = value;
                        const modalOpen4 = value.modalOpen4;
                        Modal.setAppElement('#root');
                            return(
                                <Modal isOpen={modalOpen4} style={{
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
                                      width:'40%',
                                      height: '30%',
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
                                    <i className="fas fa-times font pointer" onClick={() => closeModal4()}></i>
                                </div>
                                <Title title='Name category'/>
                                <div className="d-flex position-relative justify-content-center font-weight-bold ">
                                <input className="m-auto" id="newCategory"/>
                                <button className="btn btn-danger text-uppercase  mx-auto" onClick={() => {addCategory();closeModal4()}}>Add</button>
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
