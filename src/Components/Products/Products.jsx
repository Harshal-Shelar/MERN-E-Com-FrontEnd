import React, { useEffect, useState } from 'react';
import './Products.scss';
import { Link } from 'react-router-dom';
import trashIcon from '../../Assets/Images/trash.png';
import Popup from '../Popup';
import { TbCategory } from "react-icons/tb";
import { LuBuilding2 } from "react-icons/lu";
import { IoPricetagOutline } from "react-icons/io5";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [popup, setPopup] = useState();
  const [getName, setName] = useState();
  const [successPopup, setsuccessPopup] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [cartCategory, setCartCategory] = useState();
  const [cartName, setCartName] = useState();
  const [cartCompany, setCartCompany] = useState();

  var userId;
  var userName;

  useEffect(() => {
    getProducts();
    userId = JSON.parse(localStorage.getItem('user')).name;
    matchAdmin();
  }, []);

  const matchAdmin = () => {
    let adminStr = 'Admin';
    if (adminStr === userId) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false);
    }
  }

  const getProducts = async () => {
    let result = await fetch(`http://localhost:5000/products`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);

  }

  const getProductId = (id, name) => {
    setDeleteId(id);
    setPopup(true);
    setName(name);
  }

  const deleteProduct = async (deleteId) => {
    let result = await fetch(`http://localhost:5000/product/${deleteId}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    if (result.acknowledged) {
      var operation = "Product Deleted";
      var name = getName;
      setPopup(false);
      getProducts();
      setsuccessPopup(true);

      setTimeout(() => {
        setsuccessPopup(false);
      }, 2000);

    }

    userName = JSON.parse(localStorage.getItem('user')).name;

    let notResult = await fetch("http://localhost:5000/add-notification", {
      method: "post",
      body: JSON.stringify({ userName, name, operation }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });

    notResult = await notResult.json();
  }

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json()
      if (result) {
        setProducts(result)
      }
    } else {
      getProducts();
    }

  }

  const addToCart = async (productData) => {

    userName = JSON.parse(localStorage.getItem('user')).name;
    let allData = {...productData, userName};

    console.log(allData);

    let result = await fetch("http://localhost:5000/add-toCart", {
      method: "post",
      body: JSON.stringify(allData),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
  }

  return (
    <>
      <div className="productList">
        <h3 className='productListHeading'>Product List</h3>

        <input onChange={searchHandle} type="text" placeholder='Search Product...' />

        <ul className='tableUl'>
          <li className='tableLi'>
            {
              products.length > 0 &&
              products.map((value, key) => {
                return (
                  <div className='ulCard' key={value._id}>
                    <h2 className='liName'>{value.name}</h2>
                    <h3><IoPricetagOutline className='cardIcon' /> : <span className='value'>{value.price}/-</span></h3>
                    <h3><TbCategory className='cardIcon' /> : <span className='value'>{value.category}</span></h3>
                    <h3><LuBuilding2 className='cardIcon' /> : <span className='value'>{value.company}</span></h3>
                    {
                      isAdmin ?
                        <div className="ulBtns">
                          <button className='updateBtn'><Link to={"/update/" + value._id} ><i className="fa fa-edit"></i>Edit</Link></button>
                          <button className='deleteBtn' onClick={() => getProductId(value._id, value.name)}><i className="fa fa-trash-o"></i>Delete</button>
                        </div> :
                        <div className='addToCartBtn'>
                          <button className='addToCart' onClick={() => addToCart(value)}>
                            Add To Cart
                          </button>
                        </div>
                    }
                  </div>
                )
              })
            }
          </li>
        </ul>
      </div>
      {
        popup &&
        <div className="overlay">
          <div className="popup">
            <div className="content">
              <img className='rightIcon' src={trashIcon} alt="" />
              <p className='popupHeading'>You want to delete the record of <span className='popupTitle'>{getName}</span>  ?</p>
              <div className="popupBtns">
                <button className='popupCan' onClick={() => setPopup(false)}>Cancel</button>
                <button className='popupDel' onClick={() => deleteProduct(deleteId)}>Delete</button>
              </div>
            </div>
          </div >
        </div >
      }

      {
        successPopup &&
        <Popup img="deleted" title="Product Deleted Successfully" />
      }
    </>
  )
}

export default Products
