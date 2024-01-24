import React, { useState, useEffect } from 'react';
import '../Styles/SignUp.css';
import regImg from '../Assets/Images/registerBack.png';
import { useNavigate, Link } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate('/');
        }
    },[])

    const collectData = async()=>{
        let result = await fetch("http://localhost:5000/register",{
            method: 'post',
            body : JSON.stringify({name, email , password}),
            headers : {
                'Content-type' : 'application/json'
            }
        })
        result = await result.json();
        if(result){
            navigate('/');
            setName("");
            setEmail("");
            setPassword("");
            localStorage.setItem("user", JSON.stringify(result));
        }
        console.log(result);
    }

    return (
        <div className='registerForm'>
            <div className="image">
                    <img className='innerImage' src={regImg} alt="" />
            </div>
            <div className="fields">
                <h2 className='signUpHeading'>Register</h2>
                <label htmlFor="">Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder='Enter Name' />
                <label htmlFor="">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' />
                <label htmlFor="">Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' />
                <button className='signUpBtn' onClick={(e)=> collectData()}>Sign Up</button>
                <p className='pTag'>Already have an account ? <span className='loginSpan'> <Link to='/login'>Login here</Link> </span></p>
            </div>
        </div>
    )
}

export default SignUp
