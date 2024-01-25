import React, { useState, useEffect } from 'react';
import loginBack from '../../Assets/Images/loginBack.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/")
        } else {
            alert("Please enter connect details")
        }
    }

    return (
        <div className='loginMain'>
            <div className="image">
                <img className='innerImg' src={loginBack} alt="" />
            </div>
            <div className="loginForm">
                <h2 className='loginHeading'>Login</h2>
                <label className='loginLabel' htmlFor="">Email</label>
                <input className='loginInp' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Enter Email' />
                <label className='loginLabel' htmlFor="">Password</label>
                <input className='loginInp' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Enter Password' />
                <button className="loginBtn" onClick={handleLogin}>Login</button>
                <p className='loginPTag'><Link to='/signUp'>Create new acount</Link></p>
            </div>
        </div>
    )
}

export default Login
