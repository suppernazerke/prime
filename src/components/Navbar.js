import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
export default class Navbar extends Component {
    render() {
        return (
            <ProductConsumer>
            {value =>{
                const {logout} = value;
                    return(
            <nav className="navbar navbar-expand navbar-dark px-3" id="navbar" style={{display:'none'}}> 
            <Link to="/products">
                <h1 className="navbar-brand m-0 p-0">PRIME</h1>
            </Link>
            <ul className="navbar-nav align-items-center">
                <li className="nav-item ml-5 p-0">
                    <Link to="/products" className="nav-link">
                        Shop
                    </Link>
                </li>
                <li className="nav-item ml-5 p-0">
                    <Link to="/store" className="nav-link">
                        Store
                    </Link>

                </li>
                <li className="nav-item ml-5 p-0">
                    <Link to="/orders" className="nav-link">
                        Orders
                    </Link>

                </li>
            </ul>
            <div className="d-flex justify-content-end exit">
            <i className="fas fa-sign-out-alt exit-icon" onClick={() => logout()}></i>
            </div>
            </nav>)}}
            </ProductConsumer>
        )
    }
}
