import React, { useEffect, useState } from 'react'
import './Profile.css';

const Profile = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    let name = JSON.parse(auth).name;
    let email = JSON.parse(auth).email;
    setName(name)
    setEmail(email)
  }, []);

  return (
    <div className='mainProfile'>
      <div className='name'>
        Name : {name}
      </div>
      <div className='email'>
        Email : {email}
      </div>
    </div>
  )
}

export default Profile
