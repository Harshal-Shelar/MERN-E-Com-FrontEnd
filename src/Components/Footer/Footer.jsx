import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
  
  const [footer, setFooter] = useState(false);

  useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
      setFooter(true);
    }else{
      setFooter(false);
    }
  },[])

  return (
    <div>
      {footer ?
        <h2 className='footerText'>E-Commerce by Harshal Shelar - harshalshelar8251@gmail.com</h2>
        :
        <></>
      }
    </div>
  )
}

export default Footer
