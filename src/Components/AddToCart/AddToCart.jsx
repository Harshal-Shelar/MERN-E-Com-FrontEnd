import React, { useEffect, useState } from 'react';
import './AddToCart.scss';
import { RxCross2 } from "react-icons/rx";
import Popup from '../Popup';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../../Assets/Images/trash.png';

const AddToCart = () => {

    const [sum, setSum] = useState();
    const [totalPer, setTotalPer] = useState();
    const [paymentPopp, setPaymentPopp] = useState();
    const [paymentSuc, setPaymentSuc] = useState();
    const [cartData, setCartData] = useState([]);
    const [deletePopup, setDeletePopup] = useState();
    const [idDelete, setIdDelete] = useState();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    var totalSum = 0;

    const quantity = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    ];
    const deliveryCharge = 50;
    var totalAmountFinal;

    useEffect(() => {
        let percentage = 5;
        for (let index = 0; index < cartData.length; index++) {
            totalSum += cartData[index].price;
        }
        setSum(totalSum);
        findPercentage(totalSum, percentage);
        getProductData();

        totalAmountFinal = sum + deliveryCharge + totalPer;
        setTotalAmount(totalAmountFinal)
    }, [cartData]);

    const findPercentage = (sum, percentage) => {
        setTotalPer((sum / 100) * percentage);
    }

    const openPayment = () => {
        setPaymentPopp(true);
    }

    const getProductData = async () => {

        let result = await fetch(`http://localhost:5000/cart-list`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCartData(result);
    }
    const bookOrder = async () => {

        if (!name || !phone || !address || !totalAmount) {
            setError(true);
        } else {
            const userId = JSON.parse(localStorage.getItem('user'))._id;

            let result = await fetch("http://localhost:5000/place-order", {
                method: "post",
                body: JSON.stringify({ name, phone, address, totalAmount, userId }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            console.log(result);
            if (result) {
                setPaymentSuc(true);
                setPaymentPopp(false);

                setTimeout(() => {
                    setPaymentSuc(false);
                    navigate('/');
                }, 2000)
            }
        }
    }

    const getDeleteId = (deleteId) => {
        setIdDelete(deleteId);
        setDeletePopup(true);
    }
    const deleteProduct = async (idDelete) => {
        let result = await fetch(`http://localhost:5000/cartDelete/${idDelete}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();

        if (result.acknowledged) {
            window.location.reload();
        }
    }

    return (
        <>
            <div className="addToCartMain">
                <h1>Cart Page</h1>
                <div className="cartPage">
                    <div className="productDetails">
                        {
                            cartData.map((value, index) => {
                                return (
                                    <ul className='cartUl' key={index}>
                                        <li><img className='ulImg' src={value.img} alt="" /></li>
                                        <li>{value.name}</li>
                                        <li>$ {value.price}</li>
                                        <li>Quantity :
                                            <select className='cartSelect'>
                                                {
                                                    quantity.map((value, index) => {
                                                        return (
                                                            <option key={index}>{value}</option>
                                                        )
                                                    })

                                                }
                                            </select>
                                        </li>
                                        <li>
                                            <RxCross2 className='crossMark' onClick={() => { getDeleteId(value._id) }} />
                                        </li>
                                    </ul>
                                )
                            })

                        }
                    </div>
                    <div className="billMain">
                        <div className="productBill">
                            <h3><b>Sub Total </b><span>{sum} /-</span></h3>
                            <h3><b>Quantity </b><span>{cartData.length}</span></h3>
                            <h3><b>Tax </b><span>5%</span></h3>
                            <h3><b>Delivery Charges </b><span>{deliveryCharge} /-</span></h3>

                            <h2><b>Total :- </b>{sum + deliveryCharge + totalPer}/-</h2>
                            <button onClick={openPayment}>Proceed To Pay</button>
                        </div>
                    </div>
                </div>
            </div>
            {paymentPopp &&
                <div className="overlay">
                    <div className="popup">
                        <div className="content">
                            <div className="paymentForm">
                                <label htmlFor="">Name</label>
                                <input type="text" onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="">Phone</label>
                                <input type="text" onChange={(e) => setPhone(e.target.value)} />
                                <label htmlFor="">Address</label>
                                <textarea onChange={(e) => setAddress(e.target.value)} id="" cols="30" rows="10"></textarea>

                                <div className="paymentMode">
                                    <span>Payment Mode :</span>
                                    <span>Cash on Delivery</span>
                                </div>
                            </div>
                            <div className="popupBtns">
                                <button className='popupCan placeOrdeBtn' onClick={bookOrder}>Place Order</button>
                            </div>
                        </div>
                    </div >
                </div >
            }
            {
                paymentSuc &&
                <Popup img="deleted" title="Order Placed Successfully" />
            }
            {
                deletePopup &&
                <div className="overlay">
                    <div className="popup">
                        <div className="content">
                            <img className='rightIcon' src={trashIcon} alt="" />
                            <p className='popupHeading'>You want to remove this item from cart ?</p>
                            <div className="popupBtns">
                                <button className='popupCan' onClick={() => setDeletePopup(false)}>Cancel</button>
                                <button className='popupDel' onClick={() => deleteProduct(idDelete)}>Delete</button>
                            </div>
                        </div>
                    </div >
                </div >
            }
        </>
    )
}

export default AddToCart
