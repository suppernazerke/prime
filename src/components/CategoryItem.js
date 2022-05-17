import React from 'react'

export default function CategoryItem({e,value}) {
    //getting function
    const {getCategory}=value;
    //getting category variable
    const{category} = e;
    //html for this page
    return (
<li className="nav-item">
    <a className="nav-link nav-hov white" id={category} href={'#'+category} onClick={() => getCategory(category)}>{category}</a>
</li>
    )
}
