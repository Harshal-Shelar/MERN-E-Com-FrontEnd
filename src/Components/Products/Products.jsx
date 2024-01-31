import React, { useEffect, useState } from 'react'
import './Products.css';
import { Link } from 'react-router-dom';
import trashIcon from '../../Assets/Images/trash.png'

const Products = () => {

  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [popup, setPopup] = useState();
  const [getName, setName] = useState();
  const [successPopup, setsuccessPopup] = useState();

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
    result = await result.json();
    console.log(result);
    if (result.acknowledged) {
      setPopup(false);
      getProducts();
      setsuccessPopup(true);

      setTimeout(()=>{
        setsuccessPopup(false);
      },2000);

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

        <input className="input-field" onChange={searchHandle} type="text" placeholder='Search Product...'></input>

        <table className='mainTable'>
          <thead className='tableHead'>
            <tr>
              <th className='tableText'>Sr. No.</th>
              <th className='tableText'>Name</th>
              <th className='tableText'>Price</th>
              <th className='tableText'>Category</th>
              <th className='tableText'>Company</th>
              <th className='tableText'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((value, key) => {
              return (
                <tr key={key}>
                  <td className='tableTd'>{key + 1}</td>
                  <td className='tableTd'>{value.name}</td>
                  <td className='tableTd'>{value.price}</td>
                  <td className='tableTd'>{value.category}</td>
                  <td className='tableTd'>{value.company}</td>
                  <td className='actionBtns'>
                    <button className='updateBtn'><Link to={"/update/" + value._id} >Edit</Link></button>
                    <button className='deleteBtn' onClick={() => getProductId(value._id, value.name)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

      {
        successPopup ? 
        <div className="overlay">
            <div className="popup">
              <div className="content">
                <img className='rightIcon' src={trashIcon} alt="" />
                <p className='popupHeading'>Data deleted Successfully</p>
              </div>
            </div >
          </div > :
          <div></div>
      }

    </>
  )
}

export default Products
