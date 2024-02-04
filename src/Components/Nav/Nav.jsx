import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import profileImg from '../../Assets/Images/pro3Trans.png';


const Nav = () => {
  const auth = localStorage.getItem("user");
  const [sidebar, setSidebar] = useState(false);
  const [notification, setNotification] = useState();
  const [notPopup, setNotPopup] = useState();
  const [notCount, setNotCount] = useState();

  useEffect(() => {
    getNotificationCount();
  },[notCount])

  const openNotification = () => {
    setNotPopup(true);
    setNotCount(0)
  }

  const getNotificationCount = async () => {
    let result = await fetch('http://localhost:5000/notification', {
      method: "Get",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    var count = JSON.stringify(result.length);
    setNotCount(count)
    setNotification(result)
  }


  return (
    <div>
      {
        auth ?
          <div>
            <ul className='nav-ul'>
              <div className="all-li">
                <li className='logoOnly'><Link to="/">MERN</Link></li>
                <li><Link to="/">Product List</Link></li>
                <li><Link to="/addProducts">Add Products</Link></li>
                <li><Link to="/categories">Categories</Link></li>
              </div>
              <div className='loginLogout'>
                <li><i className="fa fa-bell-o" onClick={openNotification}></i><span className='notificationCount'>{notCount}</span></li>
                <li><Link to="/profile"> <i className="fa fa-user-circle-o"></i> {JSON.parse(auth).name}</Link></li>
              </div>
            </ul>
            <div className="respHeader">
              <img className='respProfileImg' src={profileImg} alt='' />
              <span className="respHeading">MERN CRUD</span>
              {!sidebar ?
                <i className='fa fa-chevron-left' onClick={()=>setSidebar(true)}></i> : <></>
              }

              {sidebar ?
                <i className='fa fa-chevron-right' onClick={()=>setSidebar(false)}></i> : <></>
              }
            </div>
            {
              sidebar ?
                <div className="respHeaderData">
                  <ul className='respUl'>
                    <li onClick={()=>setSidebar(false)}><Link to="/"> <i className='fa fa-server'></i> Product List</Link></li>
                    <li onClick={()=>setSidebar(false)}><Link to="/addProducts"> <i className='fa fa-user-plus'></i> Add Product</Link></li>
                    <li onClick={()=>{setSidebar(false);openNotification()}}><Link to="/addProducts"> <i className='fa fa-bell-o'></i> {notCount} Notifications</Link></li>
                    <li onClick={()=>setSidebar(false)}><Link to="/profile"> <i className='fa fa-user-circle-o'></i> {JSON.parse(auth).name}</Link></li>
                  </ul>
                </div> :
                <></>
            }
          </div>
          :
          <></>
      }

      {
        notPopup ?
          <div className="overlay" onClick={() => setNotPopup(false)}>
            <div className="popup notPopupHeight">
              <div className="content">
                <p className='notPopupHeading'>Notification List</p>
                {
                  notification.map((value, index) => {
                    return (
                      <div key={value}>
                        <Link className='notificationMain' to={"/update/" + value._id}>
                          <span className='notSpan' >{value.name}</span>
                          <i className='fa fa-mail-forward' key={value}></i>
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </div >
          </div > :
          <div></div>
      }
    </div>
  )
}

export default Nav
