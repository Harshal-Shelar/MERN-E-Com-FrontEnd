import React, { useEffect, useState } from 'react'
import './Products.css';
import { Link } from 'react-router-dom';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [popup, setPopup] = useState();
  const [getName, setName] = useState();

  useEffect(() => {
    getProducts()
  }, []);

  const getProducts = async () => {
    let result = await fetch('http://localhost:5000/products', {
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
    setName(name)
  }

  const deleteProduct = async (deleteId) => {
    let result = await fetch(`http://localhost:5000/product/${deleteId}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    console.log(result);
    result = await result.json();
    console.log(result);
    if (result) {
      setPopup(false);
      getProducts();
    }
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

  return (
    <>
      <div className="productList">
        <h3 className='productListHeading'>Product List</h3>

        <div className="input-icons">
          <i class="fa fa-search"></i>
          <input class="input-field" onChange={searchHandle} type="text" placeholder='Search Product...'></input>
        </div>

        <div className="mainTable">
          <ul className='headingUl'>
            <li className='srCol'>S. No.</li>
            <li className='headingLi'>Name</li>
            <li className='headingLi'>Price</li>
            <li className='headingLi'>Category</li>
            <li className='headingLi'>Actions</li>
          </ul>
          {
            products.length > 0 ? products.map((item, index) =>
              <ul className='dataUl' key={item._id}>
                <li className='dataLiSr'>{index + 1}</li>
                <li className='dataLi'>{item.name}</li>
                <li className='dataLi'>{item.price}</li>
                <li className='dataLi'>{item.category}</li>
                <li className='btns'>
                  <button className='deleteBtn' onClick={() => getProductId(item._id, item.name)}>Delete</button>
                  <button className='updateBtn'><Link to={"/update/" + item._id} >Update </Link></button>
                </li>

              </ul>
            )
              : <h1 className='noResFound'>No Result Found</h1>
          }
        </div>
      </div>
      {
        popup ?
          <div className="overlay">
            <div className="popup">
              <div className="content">
                <p className='popupHeading'>You want to delete the record of <span className='popupTitle'>{getName}</span>  ?</p>
                <div className="popupBtns">
                  <button className='popupCan' onClick={() => setPopup(false)}>Cancel</button>
                  <button className='popupDel' onClick={() => deleteProduct(deleteId)}>Delete</button>
                </div>
              </div>
            </div >
          </div > :
          <div></div>
      }

    </>
  )
}

export default Products
