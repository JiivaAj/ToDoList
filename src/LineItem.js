import React from 'react'
import {  FaTrashAlt} from "react-icons/fa";
const LineItem = ({it,handleCheck,handleDelete}) => {
  return (
    <li  className="item" key={it.id}>
        
    <input
       type = "checkbox"
       onChange={() => handleCheck(it.id)}
       checked = {it.checked}
       
    />
    <label 
    style={(it.checked)?{textDecoration:'line-through'}:null}
    onDoubleClick={() => handleCheck(it.id)}>{it.item}</label>
   < FaTrashAlt
    role="button"
    tabIndex="0"
    onClick={() =>handleDelete(it.id)}
   
   />
</li>
  )
}

export default LineItem