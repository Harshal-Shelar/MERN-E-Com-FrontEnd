import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
import { FaBarsStaggered } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi";
import profileImg from '../../Assets/Images/pro3Trans.png';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem("user");
  const [sidebar, setSidebar] = useState(false);
  const [notification, setNotification] = useState();
  const [notPopup, setNotPopup] = useState();
  const [notCount, setNotCount] = useState();
  const [isAdmin, setIsAdmin] = useState();

  var userId;
  var navigate = useNavigate();

  useEffect(() => {
    getNotificationCount();
    if (localStorage.getItem('user')) {
      userId = JSON.parse(localStorage.getItem('user')).name;
    } else {
      navigate('/login')
    }
    matchAdmin();
  }, [])

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
    setNotCount(result.length)
    setNotification(result)
  }


  const matchAdmin = () => {
    let adminStr = 'Admin';
    if (adminStr === userId) {
      setIsAdmin(true)
    }
  }

  return (
    <>
      {
        auth ?
          <>
            <ul className='nav-ul'>
              <div className="all-li">
                <li className='logoOnly'><Link to="/">MERN</Link></li>
                <li><Link to="/">Product List</Link></li>
                {isAdmin &&
                <>
                  <li><Link to="/addProducts">Add Products</Link></li>
                  <li><Link to="/orders">Orders</Link></li>
                </>
                }
                <li><Link to="/categories">Categories</Link></li>
              </div>
              <div className='loginLogout'>
                {!isAdmin &&
                  <li> <Link to="/cart"><i className="fa fa-cart-plus"></i><span className='notificationCount'>{notCount}</span></Link> </li>
                }
                <li><Link to="/profile"> <i className="fa fa-user-circle-o"></i> {JSON.parse(auth).name}</Link></li>
              </div>
            </ul>
            <div className="respHeader">
              <img className='respProfileImg' src={profileImg} alt='' />
              <span className="respHeading">MERN CRUD</span>
              {!sidebar &&
                <FaBarsStaggered className='icons' onClick={() => setSidebar(true)} />
              }

              {sidebar &&
                <HiPlus className='icons plusIcon' onClick={() => setSidebar(false)} />
              }
            </div>
            {
              sidebar ?
                <div className="respHeaderData">
                  <ul className='respUl' onClick={() => setSidebar(false)}>
                    <li><Link to="/"> <i className='fa fa-server'></i> Product List</Link></li>
                    <li><Link to="/addProducts"> <i className='fa fa-user-plus'></i> Add Product</Link></li>
                    <li><Link to="/categories"> <i className='fa fa-cubes'></i> Categories</Link></li>
                    <li onClick={() => openNotification()}><i className='fa fa-bell-o'></i> {notCount} Notifications</li>
                    <li><Link to="/profile"> <i className='fa fa-user-circle-o'></i> {JSON.parse(auth).name}</Link></li>
                  </ul>
                </div> :
                <></>
            }
          </>
          :
          <></>
      }

      {
        notPopup ?
          <div className="overlay">
            <div className="popup notPopupHeight">
              <div className="content">
                <p className='notPopupHeading'>Notification List</p>
                <div className="notList">
                  {
                    notification.length > 0 ?
                      notification.slice(0).reverse().map((value, index) => {
                        return (
                          <div className='notificationMain'>
                            <div className="notDetails">
                              <span className='notName'>{value.name}</span>
                              <span className='userDetails'><span className='operation'>{value.operation}</span> by {value.userName}</span>
                            </div>
                            <Link to={"/update/" + value.productId} onClick={() => setNotPopup(false)}>
                              {
                                value.operation === "Product Added" &&
                                <i className='fa fa-mail-forward'></i>
                              }
                            </Link>
                          </div>
                        )
                      })
                      :
                      <span>No Data Found</span>
                  }

                </div>
                <button className='notCan' onClick={() => setNotPopup(false)}>Cancel</button>
              </div>
            </div >
          </div > :
          <></>
      }
    </>
  )
}

export default Nav
