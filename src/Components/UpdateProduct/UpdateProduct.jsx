import React, { useEffect, useState } from 'react';
import './UpdateProduct.css'
import updateProductBack from '../../Assets/Images/editProductBack.png';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const params = useParams();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails =async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        if(!name || !price || !category || !company){
            setError(true);
          }

        let result = await fetch(`http://localhost:5000/product${params.id}`, {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
    }

    return (
        <div className='updateFormMain'>
            <div className='image'>
                <img src={updateProductBack} alt="" />
            </div>
            <div className='mainForm'>
                <h1 className='addProductHeading'>Product Details</h1>
                <label className='addFormLabel'>Name</label>
                <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                { error && !name && <span className='errorMsg'>Name is Required</span> }

                <label className='addFormLabel'>Price</label>
                <input type="text" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                { error && !price && <span className='errorMsg'>Price is Required</span> }

                <label className='addFormLabel'>Category</label>
                <input type="text" placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
                { error && !category && <span className='errorMsg'>Category is Required</span> }

                <label className='addFormLabel'>Company</label>
                <input type="text" placeholder='Enter Company' value={company} onChange={(e) => setCompany(e.target.value)} />
                { error && !company && <span className='errorMsg'>Company is Required</span> }

                <button className='submitBtn' onClick={updateProduct}>Update Product</button>
            </div>
        </div>
    )
}

export default UpdateProduct
