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

    const navigate = useNavigate();

    const quantity = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    ];

    const deliveryCharge = 50;

    const productData = [
        {
            name: 'Mens Jacket',
            price: 700,
            img: 'https://cdn.pixelspray.io/v2/black-bread-289bfa/woTKH5/wrkr/t.resize(h:1000,w:820)/data/Superdry/14092023/410393555006_1.jpg'
        },
        {
            name: 'Lady Shoes',
            price: 900,
            img: 'https://fcity.in/images/products/11316335/wlcul_512.jpg'
        },
        {
            name: 'BoAt Earphones',
            price: 1200,
            img: 'https://5.imimg.com/data5/SELLER/Default/2022/12/RC/UC/MG/102235488/boat-rockerz-235-v2-wireless-earphone.jpg'
        },
        {
            name: 'Fastrack Sunglasses',
            price: 700,
            img: 'https://sslimages.shoppersstop.com/B8AC9759D45547D9AEF177F0DE13B7C8/img/FA6C9B092FDD4947A36FC6A6ACAAC5AE/203989496_9999_alt1_FA6C9B092FDD4947A36FC6A6ACAAC5AE.jpg'
        }
    ]

    useEffect(() => {
        let percentage = 14;
        let subTotal = productData.reduce((accumulator, object) => {
            return accumulator + object.price;
        }, 0);
        setSum(subTotal);
        findPercentage(subTotal, percentage);
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

        setTimeout(()=>{
            setPaymentSuc(false);
            navigate('/');
        },2000)
    }
    return (
        <>
            <div className="addToCartMain">
                <h1>Cart Page</h1>

                <div className="cartPage">
                    <div className="productDetails">
                        {
                            productData.map((value, index) => {
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
                        <h3><b>Quantity </b><span>{productData.length}</span></h3>
                        <h3><b>Tax </b><span>14%</span></h3>
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
