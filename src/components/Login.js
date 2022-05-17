import React, { Component } from 'react';
import {ProductConsumer} from '../context';

export default class Login extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value =>{
                        //variables that will be used in this page
                        const {email,password,handleChange,login,signup,author,myRef, userName} = value;
                        //html code for log in page
                            return(
            <div className='container-fluid bg-grey'>
            <div className="d-flex justify-content-center white">
            <form className="mt-5">
           <div className="form-group">
            <label>Email address</label>
            <input value={email} onChange={(e) => handleChange(e)} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
           </div>
            <div className="form-group">
           <label>Password</label>
           <input value={password} onChange={(e) => handleChange(e)} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
           </div>
           <div className="d-flex justify-content-center">
           <button type="submit" onClick={(e) => login(e)} className="btn btn-danger">Login</button>
           <button onClick={(e) => signup(e)} style={{marginLeft: '25px'}} className="btn btn-light">Signup</button>
           </div>
      </form>
      </div>
      </div>
        )}}
        </ProductConsumer>
        </section>
        )
    }
}
