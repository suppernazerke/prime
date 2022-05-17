import React, { Component } from 'react'
import {ProductConsumer} from '../context';
import Title from './Title';
import Modal from 'react-modal';
export default class Accept extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value =>{
                        const {closeModal3,acceptDeleting,modalOpen3} = value;
                        Modal.setAppElement('#root');
                            return(
                                <Modal isOpen={modalOpen3} style={{
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
                                      height: '25%',
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
                                    <i className="fas fa-times font pointer" onClick={() => closeModal3()}></i>
                                </div>
                                <Title title='Are you sure?'/>
                                <div className="d-flex position-relative justify-content-center font-weight-bold ">
                                <button className="btn btn-danger text-uppercase  mx-auto px-5" onClick={() => closeModal3()} >No</button>
                                <button className="btn btn-danger text-uppercase  mx-auto px-5" onClick={() => {acceptDeleting();closeModal3()}}>Yes</button>
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
