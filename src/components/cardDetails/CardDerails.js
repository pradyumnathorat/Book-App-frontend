import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../../helper/helper';

import "./CardDetails.css";
function CardDetails() {
    const { id } = useParams();
    const [card, setCard] = useState([]);
    const [InstructionsB, setInstructionsB] = useState(true);
    const token = isAuthenticated();
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

    return (
        <>
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
                        <p>{myCard.title}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>2</p>
                            <p>Author</p>
                        </div>
                        <p>{myCard.author}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>3</p>
                            <p>ISBN</p>
                        </div>
                        <p>{myCard.ISBN}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>4</p>
                            <p>Publisher</p>
                        </div>
                        <p>{myCard.publisher}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>5</p>
                            <p>Published_date</p>
                        </div>
                        <p>{myCard.date}</p>
                    </div>
                    <div className='row'>

                        <div className='number'>
                            <p>6</p>
                            <p>Description</p>
                        </div>
                        <p>{myCard.description}</p>
                    </div>
                    
                </div>
                <div className='buttons-2'>
                    <button className='delete'>Delete</button>
                    <button className='edit'>Edit</button>
                </div>
            </div>

        </>
    );
}

export default CardDetails;
