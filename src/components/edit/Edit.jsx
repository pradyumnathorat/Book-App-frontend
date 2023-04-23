import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../helper/helper';
import { useNavigate ,useParams} from 'react-router-dom';
import "./edit.css";
const Edit = () => {
    const [title, setTitle] = useState("")
    const [author, setautor] = useState("")
    const [ISBN, setISBN] = useState("")
    const [description, setdirections] = useState("")
    const [date, setDate] = useState("");
    const [publisher, setPublisher] = useState("");
    const [ book , setBook ] = useState({})
    const urlE = process.env.REACT_APP_API;
    const token = isAuthenticated();
    const navigate = useNavigate();
    const { _id } = useParams()
    const update = async (e) => {
        e.preventDefault();

        const post = {
            title: title,
            ISBN: ISBN,
            author: author,
            description: description,
            date: date,
            publisher: publisher
        }
        try {
            const response = await fetch(`${urlE}/edit`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': "application/json",
                    authorization: `${token}`,
                    "user_id": `${_id}`
                },
                body: JSON.stringify(post)
            });
            const data = await response.json();
            alert(data.message)
            navigate("/books");
        } catch (e) {
            alert(e.message)
        }
    }

    const findBook = async (req, res) => {
        try {
            const response = await fetch(`${urlE}/single` , 
            {
                method : 'GET',
                headers : {
                    'Content-Type': "application/json",
                    authorization: `${token}`,
                    "user_id": `${_id}`
                }
            })
            const book = await response.json();
            setBook(book)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        findBook()
    }, [])
    console.log(book);
    return (
        <>
            <div className="main_edit">
                <h1>Update Book</h1>
                <div className="edit_container">
                    <div className="edit_input">
                        <p>Title</p>
                        <input type="text" className='edit_1'  onChange={(e) => { setTitle(e.target.value) }} value={title}/>
                    </div>
                    <div className="edit_input">
                        <p>ISBN</p>
                        <input type="text" className='edit_1' onChange={(e) => { setISBN(e.target.value) }} value={ISBN}/>
                    </div>
                    <div className="edit_input">
                        <p>Author</p>
                        <input type="text" className='edit_1' onChange={(e) => { setautor(e.target.value) }} value={author}/>
                    </div>
                    <div className="edit_input">
                        <p>Description</p>
                        <input type="text" className='edit_1'  onChange={(e) => { setdirections(e.target.value) }} value={description}/>
                    </div>
                    <div className="edit_input">
                        <p>Published date</p>
                        <input type="text" className='edit_1'  onChange={(e) => { setDate(e.target.value) }} value={date}/>
                    </div>
                    <div className="edit_input">
                        <p>Publisher</p>
                        <input type="text" className='edit_1'  onChange={(e) => { setPublisher(e.target.value) }} value={publisher}/>
                    </div>
                    <button className="edit_button1" onClick={update}>Update</button>
                </div>
            </div>
        </>
    )
}

export default Edit;