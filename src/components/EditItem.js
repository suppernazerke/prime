import React from 'react'

export default function EditItem({item,value}) {
    const {openModal3,deleteCategory} = value;
    const{category} = item;
    return (
<div className="row white m-auto py-2">
  <div className="col-8">
    {category}  
  </div> 
  <div className="col-4">
        <button className="btn btn-danger ml-3" onClick={() => {openModal3(); deleteCategory({category})}}>Delete</button>
  </div>

</div>
    )
}
