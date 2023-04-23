import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import "./signup.css";
const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("");
    const [redirect, setredirect] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const url = process.env.REACT_APP_API;
    const validateEmail = (email) => {
        {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }

    const validatePassword = (password) => {
        let error = '';

        if (!password) {
            error = 'Password is required';
        } else if (password.length < 8) {
            error = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(password)) {
            error = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            error = 'Password must contain at least one lowercase letter';
        } else if (!/\d/.test(password)) {
            error = 'Password must contain at least one number';
        }
        return error;
    }

    const register = () => {
        if (email && password && Cpassword && isCheck) {
            const isEmail = validateEmail(email);
            const isPassword = validatePassword(password);
            if (isEmail) {
                if (isPassword != "") {
                    alert(isPassword);
                } else if (password != Cpassword) {
                    alert("Password and Repeat Password Not Matching")
                } else {
                    fetch(`${url}/register`, {
                        method: "POST",
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }).then((res) => res.json()
                    ).then((data) => {
                        console.log(data);
                        if (data.error) {
                            alert(data.error)
                        } else {
                            setEmail("")
                            setPassword("")
                            setCPassword("")
                            alert(data.message)
                            setredirect(true)
                        }
                    })
                }
            } else {
                alert("Please enter a valid email")
            }
        } else {
            alert("Please Fill all Fields");
        }
    }

    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/" />
        }
    }

    const handleCheckboxChange = () => {
        setIsCheck(!isCheck);
    }
    return (
        <>
            {performRedirect()}
            <div className="login-container">
                <div className="signIn">

                    <h1>SignUp</h1>


                    <input className="login-input" type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} value={email} />


                    <input className="login-input" type="text" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />


                    <input className="login-input" type="text" placeholder='Repeat Password' onChange={(e) => { setCPassword(e.target.value) }} value={Cpassword} />


                    <div className="checkbox">
                        <input type="checkbox" checked={isCheck} onChange={handleCheckboxChange} />
                        <p className="terms">I agree with Terms and Conditions</p>
                    </div>

                    <button className="sign-b" onClick={register}>SignUp</button>

                </div>
            </div>
        </>

    )
}

export default SignUp;