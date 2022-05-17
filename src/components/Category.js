import React from 'react';
import CategoryItem from './CategoryItem';

export default function Category({value}) {
    //functions that will be used in this page
    const{options,openModal2} = value;
    //html code for the Category form
    return (
        <div>
        <ul className="nav nav-tabs" id="myTab">
           {
           //listing existing categories from database    
           options.map(e=>{
                return <CategoryItem key={e.category} e={e} value={value}/>
            })}
<li className="nav-item">
  <button className="btn btn-danger" onClick={() => openModal2()}><i className="fas fa-edit white"   /></button>
</li>
</ul>
        </div>
    )
}
