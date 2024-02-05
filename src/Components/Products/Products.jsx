import React, { useEffect, useState } from 'react';
import './Products.scss';
import { Link } from 'react-router-dom';
import trashIcon from '../../Assets/Images/trash.png'
import rightIcon from '../../Assets/Images/right.png'

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
      var operation = "Data Deleted";
      var name = getName;
      setPopup(false);
      getProducts();
      setsuccessPopup(true);

      setTimeout(() => {
        setsuccessPopup(false);
      }, 2000);

    }
    
    const userName = JSON.parse(localStorage.getItem('user')).name;

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

  return (
    <>
      <div className="productList">
        <h3 className='productListHeading'>Product List</h3>

        <input onChange={searchHandle} type="text" placeholder='Search Product...' />

        <table className='mainTable'>

          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{value.name}</td>
                  <td>{value.price}</td>
                  <td>{value.category}</td>
                  <td>{value.company}</td>
                  <td className='actionBtns'>
                    <button className='updateBtn'><Link to={"/update/" + value._id} ><i className="fa fa-edit"></i>Edit</Link></button>
                    <button className='deleteBtn' onClick={() => getProductId(value._id, value.name)}><i className="fa fa-trash-o"></i>Delete</button>
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
                <img className='rightIcon' src={trashIcon} alt="" />
                <p className='popupHeading'>You want to delete the record of <span className='popupTitle'>{getName}</span>  ?</p>
                <div className="popupBtns">
                  <button className='popupCan' onClick={() => setPopup(false)}>Cancel</button>
                  <button className='popupDel' onClick={() => deleteProduct(deleteId)}>Delete</button>
                </div>
              </div>
            </div >
          </div > :
          <></>
      }

      {
        successPopup ?
          <div className="overlay">
            <div className="popup">
              <div className="content">
                <img className='rightIcon' src={rightIcon} alt="" />
                <p className='popupHeading'>Data deleted Successfully</p>
              </div>
            </div >
          </div > :
          <></>
      }
    </>
  )
}

export default Products
