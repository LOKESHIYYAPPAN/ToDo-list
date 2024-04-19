import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";

const LineItem = ({item, handleCheck, handleDelete}) => {
    return (
        <li className='item'>
            <input
                type="checkbox"
                id={item.id}
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
            />
            <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                htmlFor={item.id}
            >{item.item}</label>
            <MdOutlineDeleteOutline
                role="button"   
                tabIndex="0"
                onClick={() => handleDelete(item.id)}
            />
        </li>
    )
}

export default LineItem