import React, { useEffect, useState } from 'react'
import './Profile.css';
import avatar from '../../Assets/Images/pro3Trans.png';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/signUp');
  }

  useEffect(() => {
    const auth = localStorage.getItem('user');
    let name = JSON.parse(auth).name;
    let email = JSON.parse(auth).email;
    setName(name)
    setEmail(email)
  }, []);

  return (
    <div classNameName='mainProfile'>
      <div className="card">
        <img className='avatarImg' src={avatar} alt="John" />
          <h1 className='avatarName'>{name}</h1>
          <p className="title">Email : {email}</p>
          <p>Harvard University</p>
          <div className='social'>
            <a className="socialHandle" href="#"><i className="fa fa-dribbble"></i></a>
            <a className="socialHandle" href="#"><i className="fa fa-twitter"></i></a>
            <a className="socialHandle" href="#"><i className="fa fa-linkedin"></i></a>
            <a className="socialHandle" href="#"><i className="fa fa-facebook"></i></a>
          </div>
          <Link to='/signUp' onClick={logout}><button className='contactBtn'><i className='fa fa-power-off'></i>Logout</button></Link>
      </div>
    </div>
  )
}

export default Profile
