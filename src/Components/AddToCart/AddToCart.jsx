import React, { useEffect, useState } from 'react';
import './AddToCart.scss';
import { RxCross2 } from "react-icons/rx";
import Popup from '../Popup';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {

    const [sum, setSum] = useState();
    const [totalPer, setTotalPer] = useState();
    const [paymentPopp, setPaymentPopp] = useState();
    const [paymentSuc, setPaymentSuc] = useState();
    const [cartData, setCartData] = useState([]);

    const navigate = useNavigate();
    var totalSum = 0;

    const quantity = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    ];
    const deliveryCharge = 50;

    useEffect(() => {
        let percentage = 5;
        for (let index = 0; index < cartData.length; index++) {
            totalSum += cartData[index].price;
          }
        setSum(totalSum);
        findPercentage(totalSum, percentage);
        getProductData();
    }, []);

    const findPercentage = (sum, percentage) => {
        setTotalPer((sum / 100) * percentage);
    }

    const openPayment = () => {
        setPaymentPopp(true);
    }

    const placeOrder = () => {
        setPaymentSuc(true);
        setPaymentPopp(false);

        setTimeout(() => {
            setPaymentSuc(false);
            navigate('/');
        }, 2000)
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
                                        <li><img src={value.img} alt="" /></li>
                                        <li>{value.name}</li>
                                        <li>{value.price}</li>
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
                                            <RxCross2 className='crossMark' />
                                        </li>
                                    </ul>
                                )
                            })

                        }
                    </div>
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
            {paymentPopp &&
                <div className="overlay">
                    <div className="popup">
                        <div className="content">
                            <div className="paymentForm">
                                <label htmlFor="">Name</label>
                                <input type="text" />
                                <label htmlFor="">Phone</label>
                                <input type="text" />
                                <label htmlFor="">Address</label>
                                <textarea name="" id="" cols="30" rows="10"></textarea>

                                <div className="paymentMode">
                                    <span>Payment Mode :</span>
                                    <span>Cash on Delivery</span>
                                </div>
                            </div>
                            <div className="popupBtns">
                                <button className='popupCan placeOrdeBtn' onClick={placeOrder}>Place Order</button>
                            </div>
                        </div>
                    </div >
                </div >
            }
            {
                paymentSuc &&
                <Popup img="deleted" title="Order Placed Successfully" />
            }
        </>
    )
}

export default AddToCart
