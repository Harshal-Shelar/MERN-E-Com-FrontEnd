import React, { useEffect, useState } from 'react';
import './UpdateProduct.css'
import updateProductBack from '../../Assets/Images/editProductBack.png';
import { useParams, useNavigate } from 'react-router-dom';
import trashIcon from '../../Assets/Images/trash.png'
import updateIcon from '../../Assets/Images/updateIcon.png'

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [getId, setId] = useState('');
    const [error, setError] = useState(false);
    const [popup, setPopup] = useState();
    const [successPopup, setsuccessPopup] = useState();
    const [updatePopup, setupdatePopup] = useState();

    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])


    const getUserId = (id, name) => {
        setPopup(true);
    }

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        setId(result._id);
    }

    const updateCan = () => {
        navigate('/')
    }

    const deleteProduct = async (getId) => {
        let result = await fetch(`http://localhost:5000/product/${getId}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            setPopup(false);
            setsuccessPopup(true);
            setTimeout(() => {
                setsuccessPopup(false);
                navigate('/')
            }, 2000);
        }
    }

    const updateProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
        }
        else {
            let result = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: "Put",
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setupdatePopup(true)
                setTimeout(() => {
                    setupdatePopup(false)
                    navigate('/');
                }, 2000);
            }
        }
    }

    return (
        <>
            <div className='updateFormMain'>
                <div className='image'>
                    <img src={updateProductBack} alt="" />
                </div>
                <div className='mainForm'>
                    <h1 className='addProductHeading'>Product Details</h1>
                    <label className='addFormLabel'>Name</label>
                    <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                    {error && !name && <span className='errorMsg'>Name is Required</span>}

                    <label className='addFormLabel'>Price</label>
                    <input type="text" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    {error && !price && <span className='errorMsg'>Price is Required</span>}

                    <label className='addFormLabel'>Category</label>
                    <input type="text" placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    {error && !category && <span className='errorMsg'>Category is Required</span>}

                    <label className='addFormLabel'>Company</label>
                    <input type="text" placeholder='Enter Company' value={company} onChange={(e) => setCompany(e.target.value)} />
                    {error && !company && <span className='errorMsg'>Company is Required</span>}
                    <div className="updateBtns">
                        <button className='UpdateCan' onClick={updateCan}>Cancel</button>
                        <button className='UpdateDel' onClick={() => getUserId(getId, name)}>Delete</button>
                        <button className='submitBtn' onClick={updateProduct}>Update</button>
                    </div>
                </div>
            </div>
            {
                popup ?
                    <div className="overlay">
                        <div className="popup">
                            <div className="content">
                                <p className='popupHeading'>You want to delete the record of {name} ?</p>
                                <div className="popupBtns">
                                    <button className='popupCan' onClick={() => setPopup(false)}>Cancel</button>
                                    <button className='popupDel' onClick={() => deleteProduct(getId)}>Delete</button>
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

            {
                updatePopup ?
                    <div className="overlay">
                        <div className="popup">
                            <div className="content">
                                <img className='rightIcon' src={updateIcon} alt="" />
                                <p className='popupHeading'>Data Updated Successfully</p>
                            </div>
                        </div >
                    </div > :
                    <div></div>
            }
        </>

    )
}

export default UpdateProduct
