import React from 'react'
import ItemsList from './ItemsList';
import AddItem from './AddItem';
import SearchItem from './SearchItem';


const Content = ({ items, setItems, handleCheck, handleDelete, todo, setTodo, handleAddItem, search, setSearch }) => {

    // const sortedItems = [...items].sort((a,b) => a.item.localeCompare(b.item))
    // setItems(sortedItems)

    return (
        <main>
            <AddItem
                todo={todo}
                setTodo={setTodo}
                handleAddItem={handleAddItem}
            />
            <SearchItem
                search={search}
                setSearch={setSearch}
            />
            {(items.length) ? (
                <ItemsList
                    items={items.sort((a, b) => a.item.localeCompare(b.item))}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ) : (
                <p>Your lists is empty</p>
            )}
        </main>
    )
}

export default Content