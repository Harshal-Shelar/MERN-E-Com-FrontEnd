import React, { useEffect, useState } from 'react'
import './Products.css';
import { Link } from 'react-router-dom';

const Products = () => {

  const [products, setProducts] = useState([]);

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

  const deleteProduct = async (id) => {
    console.warn(id)
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers : {
        authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  }

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers : {
          authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
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
    <div className="productList">
      <h3 className='productListHeading'>Product List</h3>
      <input type="" className='search-product-box' placeholder='Search Product'
        onChange={searchHandle} />
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
                <button className='deleteBtn' onClick={() => deleteProduct(item._id)}>Delete</button>
                <button className='updateBtn'><Link to={"/update/" + item._id} >Update </Link></button>
              </li>

            </ul>
          )
            : <h1>No Result Found</h1>
        }
      </div>
    </div>
  )
}

export default Products
