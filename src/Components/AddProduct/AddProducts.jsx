import React, { useState } from 'react'
import './AddProducts.css';
import addProductBack from '../../Assets/Images/addProductBack.png';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setConpany] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const addCanNav = () => {
    navigate('/')
  }
  const addProduct = async () => {

    if (!name || !price || !category || !company) {
      setError(true);
    } else {
      const userId = JSON.parse(localStorage.getItem('user'))._id;

      let result = await fetch("http://localhost:5000/add-product", {
        method: "post",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      navigate('/')
    }
  }

  return (
    <div className='addFormMain'>
      <div className='addProductImg'>
        <img className='imgAddProduct' src={addProductBack} alt="" />
      </div>
      <div className='addForm'>
        <h1 className='addProductHeading'>Add Products</h1>

        <label className='addFormLabel'>Name</label>
        <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
        {error && !name && <span className='errorMsg'>Name is Required</span>}

        <label className='addFormLabel'>Price</label>
        <input type="text" placeholder='Enter Price' onChange={(e) => setPrice(e.target.value)} />
        {error && !price && <span className='errorMsg'>Price is Required</span>}

        <label className='addFormLabel'>Category</label>
        <input type="text" placeholder='Enter Category' onChange={(e) => setCategory(e.target.value)} />
        {error && !category && <span className='errorMsg'>Category is Required</span>}

        <label className='addFormLabel'>Company</label>
        <input type="text" placeholder='Enter Company' onChange={(e) => setConpany(e.target.value)} />
        {error && !company && <span className='errorMsg'>Company is Required</span>}
        <div className="addBtns">
          <button className='addCan' onClick={addCanNav}>Cancel</button>
          <button className='addSubmitBtn' onClick={addProduct}>Add Product</button>
        </div>
      </div>
    </div>
  )
}

export default AddProducts
