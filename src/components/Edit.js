import React, { Component } from 'react'
import {ProductConsumer} from '../context';
import Title from './Title';
import Modal from 'react-modal';
import EditItem from './EditItem';
export default class Edit extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value =>{
                        const {closeModal2,options,openModal4} = value;
                        const modalOpen2 = value.modalOpen2;
                        Modal.setAppElement('#root');
                            return(
                                <Modal isOpen={modalOpen2} style={{
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
                                      width:'25%',
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
                                    <i className="fas fa-times font pointer" onClick={() => closeModal2()}></i>
                                </div>
                                <Title title='Categories'/>
                                <div className="d-flex flex-column position-relative justify-content-center font-weight-bold ">
                                <div className="d-block">
                                    {options.map(item=>{
    return <EditItem className="row" key={item.category} item={item} value={value}/>
})}
</div>
                                <button className="btn btn-danger text-uppercase  mx-auto my-3" onClick={() => openModal4()}>Add Category</button>
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
