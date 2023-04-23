import React, { useState, useEffect } from 'react'
// import { getUserEmail } from '../helper'
import Recipe from '../BookCard/Book';
import "./books.css";

import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../helper/helper';

const Recipies = () => {
    const [books, setBooks] = useState([]);
    const [redirect, setredirect] = useState(false);
    const [redirectHome, setredirectHome] = useState(false);
    const [query, setQuery] = useState("");
    const url = process.env.REACT_APP_API;
    const token = isAuthenticated();
    // console.log(user)
    // console.log(recipes);
    const getRescipe = () => {
        fetch(`${url}/upload`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                authorization: `${token}`
            }
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setBooks(data.data);
                    console.log(data)
                }
            })
    }

    const filteredItems = books.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredItems);
    console.log(query);

    useEffect(() => {
        getRescipe()
    }, [])

    const handleClick = () => {
        setredirect(true);
    }

    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/upload" />
        }
    }

    const handleDataReceived = (data) => {
        setQuery(data);
    }

    const handleRedirect = (data) => {
        setredirectHome(data)
    }

    const performRedirecHome = () => {
        if (redirectHome) {
            return <Navigate to="/recipies" />
        }
    }

    return (
        <>
            {performRedirect()}

            {/* <Header onDataReceived={handleDataReceived} onRedirect={handleRedirect}/> */}

            <div className="newConatainer">
                <h1>Book List</h1>
                <div className="new" onClick={handleClick}>+Add new Book</div>
            </div>
            <div className="allRecipies">
            </div>
            <div className="allCards">
                {
                    !query ?
                    books.map((book, index) => (
                            <Link to={`/cards/${book._id}`}><Recipe book={book} /></Link>
                        )) :
                        filteredItems.map((book, index) => (
                            <Link to={`/cards/${book._id}`}><Recipe book={book} /></Link>
                        ))
                }
            </div>

        </>
    )
}

export default Recipies