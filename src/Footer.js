import React from 'react'

const Footer = ({ length }) => {

    return (
        <footer>
            <h3>{length} list {length > 1 ? "items" : "item"}</h3>
        </footer>
    )
}

export default Footer