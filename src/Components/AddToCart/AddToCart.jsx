import React, { useEffect, useState } from 'react';
import './AddToCart.scss';
import { RxCross2 } from "react-icons/rx";

import trashIcon from '../../Assets/Images/trash.png';
import PlaceOrder from '../PlaceOrder/PlaceOrder';

const AddToCart = () => {

    const [sum, setSum] = useState();
    const [totalPer, setTotalPer] = useState();
    const [cartData, setCartData] = useState([]);
    const [deletePopup, setDeletePopup] = useState();
    const [idDelete, setIdDelete] = useState();
    const [totalAmount, setTotalAmount] = useState('');
    const [paymentPopp, setPaymentPopp] = useState();

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
        <>{
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
        }

            {paymentPopp &&
                <div className="overlay">
                    <div className="popup">
                        <div className="content">
                            <PlaceOrder totalAmount={totalAmount} />
                        </div>
                    </div >
                </div >
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