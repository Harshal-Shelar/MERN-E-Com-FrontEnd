import React from 'react';
import loginBack from '../Assets/Images/loginBack.png';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='loginMain'>
            <div className="image">
                <img className='innerImg' src={loginBack} alt="" />
            </div>
            <div className="loginForm">
                <h2 className='loginHeading'>Login</h2>
                <label className='loginLabel' htmlFor="">Email</label>
                <input className='loginInp' type="email" placeholder='Enter Email' />
                <label className='loginLabel' htmlFor="">Password</label>
                <input className='loginInp' type="password" placeholder='Enter Password' />
                <button className="loginBtn">Login</button>
                <p className='loginPTag'><Link to='/signUp'>Create new acount</Link></p>
            </div>
        </div>
    )
}

export default Login
