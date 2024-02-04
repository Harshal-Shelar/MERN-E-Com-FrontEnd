import React, { useState, useEffect } from 'react';
// import './SignUp.css';
import './SignUp.scss';
import regImg from '../../Assets/Images/registerBack.png';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [education, setEducation] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        if (!name || !email || !password || !address || !phoneNumber || !education) {
            setError(true);
        } else {
            let result = await fetch("http://localhost:5000/register", {
                method: 'post',
                body: JSON.stringify({ name, email, password, address, phoneNumber, education }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            
            localStorage.setItem("user", JSON.stringify(result.result))
            localStorage.setItem("token", JSON.stringify(result.auth))

            navigate('/')
        }

    }

    return (
        <div className='registerForm'>
            <div className="signUpImage">
                <img className='registerImage' src={regImg} alt="" />
            </div>
            <div className="fields">
                <h2 className='signUpHeading'>Register</h2>

                <label htmlFor="">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
                {error && !name && <span className='errorMsg'>Name is Required</span>}


                <label htmlFor="">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                {error && !email && <span className='errorMsg'>Email is Required</span>}

                <label htmlFor="">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                {error && !password && <span className='errorMsg'>Password is Required</span>}

                <label htmlFor="">Address</label>
                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' />
                {error && !address && <span className='errorMsg'>Address is Required</span>}

                <label htmlFor="">Phone Number</label>
                <input type="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Enter Phone Number' />
                {error && !phoneNumber && <span className='errorMsg'>Phone Number is Required</span>}

                <label htmlFor="">Education</label>
                <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder='Enter Education' />
                {error && !education && <span className='errorMsg'>Education is Required</span>}

                <button className='signUpBtn' onClick={collectData}>Sign Up</button>
                <p className='pTag'>Already have an account ? <span className='loginSpan'> <Link to='/login'>Login here</Link> </span></p>
            </div>
        </div>
    )
}

export default SignUp
