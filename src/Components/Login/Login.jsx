import React, { useState, useEffect } from 'react';
import loginBack from '../../Assets/Images/loginBack.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        if (!email || !password) {
            setError(true);
        } else {
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

    }

    return (
        <div className='loginMain'>
            <div className="loginImage">
                <img className='imageLogin' src={loginBack} alt="" />
            </div>
            <div className="loginForm">
                <h2 className='loginHeading'>Login</h2>
                <label className='loginLabel' htmlFor="">Email</label>
                <input className='loginInp' type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
                {error && !email && <span className='errorMsg'>Email is Required</span>}

                <label className='loginLabel' htmlFor="">Password</label>
                <input className='loginInp' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Password' />
                {error && !password && <span className='errorMsg'>Password is Required</span>}

                <button className="loginBtn" onClick={handleLogin}>Login</button>
                <p className='loginPTag'><Link to='/signUp'>Create new acount</Link></p>
            </div>
        </div>
    )
}

export default Login
