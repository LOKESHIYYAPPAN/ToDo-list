import React, { useRef } from 'react'
import {FaPlus} from 'react-icons/fa'

const AddItem = ({todo, setTodo, handleAddItem}) => {
  const inputRef = useRef()
  return (
    <form id='addItem' onSubmit={handleAddItem}>
      <label htmlFor="addItem">Add Item</label>
        <input 
            type="text"
            id="addItem"
            required
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            autoFocus
            placeholder='Add Item'
            formNoValidate
        />
        <button 
            type="submit"
            onClick={() => inputRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem