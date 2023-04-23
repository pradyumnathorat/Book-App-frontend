import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../../helper/helper';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./CardDetails.css";
function CardDetails() {
    const { id } = useParams();
    const [card, setCard] = useState([]);
    const [redirect, setredirect] = useState(false);
    const token = isAuthenticated();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API;
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
                    setCard(data.data);
                    
                    console.log(data)
                }
            })
    }

    useEffect(() => {
        getRescipe()
    }, [])

    const myCard = card.find((c) => c._id == id);
    // const list = myCard.ingredients
    // console.log(list);
    console.log(myCard);
    if (!myCard) {
        return <div>Card not found.</div>;
    }

    const handleDelete = async (_id) => {
        try {
            const deleteCard = await fetch(`${url}/delete`, {
                method : 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    user_id: `${_id}`,
                    authorization: `${token}`
                }
            })
            const response = await deleteCard.json();
            if ( response.error) {
                alert(response.error)
            } else {
                alert(response.message);
                setredirect(true)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/recipies" />
        }
    }

    const handleEdit = (_id ) => {
        navigate(`/edit/${_id}`)
    }

    return (
        <>
        {performRedirect()}
            <div className="main-details">
                <h1>
                    Books Record
                </h1>
                <p>View books info</p>
                <div className='column'>
                    <div className='row'>

                        <div className='number'>
                            <p>1</p>
                            <p>Title</p>
                        </div>
                        <p className='value_1'>{myCard.title}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>2</p>
                            <p>Author</p>
                        </div>
                        <p className='value_1'>{myCard.author}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>3</p>
                            <p>ISBN</p>
                        </div>
                        <p className='value_1'>{myCard.ISBN}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>4</p>
                            <p>Publisher</p>
                        </div>
                        <p className='value_1'>{myCard.publisher}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>5</p>
                            <p>Published_date</p>
                        </div>
                        <p className='value_1'>{myCard.date}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>6</p>
                            <p>Description</p>
                        </div>
                        <p className='value_1'>{myCard.description}</p>
                    </div>

                </div>
                <div className='buttons-2'>
                    <button className='delete' onClick={() => handleDelete(myCard._id)}>Delete</button>
                    <button className='edit' onClick={() =>  handleEdit(myCard._id) } >Edit</button>
                </div>
            </div>

        </>
    );
}

export default CardDetails;
