import React from 'react'

const SearchItem = ({ search, setSearch }) => {
  return (
    <form id="searchItem">
      <label htmlFor="search">Search Item</label>
      <input
        type="text"
        placeholder='Search Item'
        id='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  )
}

export default SearchItem