import React from 'react'
import "./Book.css"
export const Recipe = ({book}) => {
    return (
        <>
            <div className="container4">
                <img className="image1" src="https://www.loc.gov/static/programs/national-book-festival/images/posters/2021.jpg" />
                <div className="title">{book.title}</div>
                <div className="author">{book.author}</div>
            </div>
        </>
    )
}

export default Recipe;