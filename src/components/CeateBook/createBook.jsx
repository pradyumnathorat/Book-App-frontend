import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import { isAuthenticated } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import "./createBook.css";
const CreateRecipe = () => {
    const [title, setTitle] = useState("")
    const [author, setautor] = useState("")
    const [ISBN, setISBN] = useState("")
    const [description, setdirections] = useState("")
    const [redirect, setredirect] = useState(false);
    const [date, setDate] = useState("");
    const [publisher, setPublisher] = useState("");
    const urlE = process.env.REACT_APP_API;
    const token = isAuthenticated();
    const navigate = useNavigate();
    const Submit = async () => {

        if (title && author && description && ISBN && date && publisher) {
            try {
                const data = await fetch(`${urlE}/upload`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        authorization: `${token}`
                    },
                    body: JSON.stringify({
                        title: title,
                        ISBN : ISBN,
                        author: author,
                        description: description,
                        date : date,
                        publisher : publisher
                    })
                })
                const dataJson = await data.json();
                if (dataJson.error) {
                    alert(dataJson.error)
                } else {
                    alert(dataJson.message)
                    setredirect(true)
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Please fill all fields");
        }
    }
    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/recipies" />
        }
    }

    return (
        <>
            {performRedirect()}
            <div className="input-container">
                <div className="container2">
                    <h1>Create New Book</h1>
                    <input className="inputs1" type="text" placeholder="Title of the Book" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                    <input className="inputs1" type="text" placeholder="ISBN" onChange={(e) => { setISBN(e.target.value) }} value={ISBN} />
                    <input className="inputs1" type="text" placeholder="Author" onChange={(e) => { setautor(e.target.value) }} value={author}/>
                    <input className="inputs1" type="text" placeholder="Describe this Book" onChange={(e) => { setdirections(e.target.value) }} value={description} />
                    <input className="inputs1" type="text" placeholder="Published_date" onChange={(e) => { setDate(e.target.value) }} value={date} />
                    <input className="inputs1" type="text" placeholder="Publisher of this Book" onChange={(e) => { setPublisher(e.target.value) }} value={publisher} />
                    <button className="create" onClick={Submit}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default CreateRecipe