import React, { useState, useEffect } from 'react'
// import { getUserEmail } from '../helper'
import Recipe from '../BookCard/Book';
import "./books.css";
import { useNavigate } from 'react-router-dom';

import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../helper/helper';

const Recipies = () => {
    const [books, setBooks] = useState([]);
    const [redirect, setredirect] = useState(false);
    const [redirectHome, setredirectHome] = useState(false);
    const [query, setQuery] = useState("");
    const url = process.env.REACT_APP_API;
    const token = isAuthenticated();
    const navigate = useNavigate();

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
    const handleClick2 = (_id) => {
        navigate(`/cards/${_id}`)
    }

    const handlelogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/")
    }
    return (
        <>
            {performRedirect()}

            {/* <Header onDataReceived={handleDataReceived} onRedirect={handleRedirect}/> */}

            <div className="newConatainer">
                <h1>Book List</h1>
                <div className='logout_main1'>
                    <div className="new" onClick={handleClick}>+Add new Book</div>
                    <button className="logout_b" onClick={handlelogout}>Logout</button>
                </div>
            </div>
            <div className="allRecipies">
            </div>
            <div className="allCards">
                {
                    !query ?
                        books.map((book, index) => (
                            <div onClick={() => { handleClick2(book._id) }} ><Recipe book={book} /></div>
                        )) :
                        filteredItems.map((book, index) => (
                            <div onClick={() => { handleClick2(book._id) }}><Recipe book={book} /></div>
                        ))
                }
            </div>

        </>
    )
}

export default Recipies