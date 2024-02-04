import React, { useEffect, useState } from 'react';
import './Profile.scss';
import avatar from '../../Assets/Images/pro3Trans.png';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [education, setEducation] = useState();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  }

  useEffect(() => {
    const auth = localStorage.getItem('user');
    let name = JSON.parse(auth).name;
    let email = JSON.parse(auth).email;
    let address = JSON.parse(auth).address;
    let phoneNumber = JSON.parse(auth).phoneNumber;
    let education = JSON.parse(auth).education;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhoneNumber(phoneNumber);
    setEducation(education);
  }, []);

  return (
    <div className='mainProfile'>
      <div className="card">
        <img className='avatarImg' src={avatar} alt="" />
        <h1 className='avatarName'>{name}</h1>
        <p>Email : <span>{email}</span> </p>
        <p>Education : <span>{education}</span> </p>
        <p>Phone Number :<span>{phoneNumber}</span> </p>
        <p>Address : <span>{address}</span></p>
        <div className='social'>
          <a href="#"><i className="fa fa-dribbble"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-facebook"></i></a>
        </div>
        <Link to='/signUp' onClick={logout}><button className='contactBtn'><i className='fa fa-power-off'></i>Logout</button></Link>
      </div>
    </div>
  )
}

export default Profile
