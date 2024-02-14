import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup';

const PlaceOrder = (props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [paymentSuc, setPaymentSuc] = useState();
    const [error, setError] = useState(false);
    const [openSucPopup, setOpenSucPopup] = useState(true)

    var totalAmount;

    useEffect(()=>{
        totalAmount= props.totalAmount;
    },[]);

    const navigate = useNavigate();

    const bookOrder = async () => {
        setOpenSucPopup(false);
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
            setPaymentSuc(true);

            setTimeout(()=>{
                setPaymentSuc(false);
            },2000)

            // if (result) {
            //     setTimeout(() => {
            //         navigate('/');
            //     }, 2000)
            // }
        }
    }
    return (
        <>
            { openSucPopup &&
                <>
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
                </>
            }
            {
                paymentSuc &&
                <Popup img="deleted" title="Order Placed Successfully" />
            }
        </>
    )
}

export default PlaceOrder
