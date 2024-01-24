import React, { useState } from 'react';
import '../Styles/SignUp.css';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='registerForm'>
            <div className="fields">
                <h2 className='signUpHeading'>Register</h2>
                <label htmlFor="">Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder='Enter Name' />
                <label htmlFor="">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' />
                <label htmlFor="">Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' />
                <button className='signUpBtn'>Sign Up</button>
            </div>
        </div>
    )
}

export default SignUp
