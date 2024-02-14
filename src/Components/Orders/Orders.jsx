import React, { useEffect, useState } from 'react';
import './Orders.scss'

const Orders = () => {

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        getProductData();
        getPlacedOrderDetails();
    }, []);

    const getProductData = async () => {
        let result = await fetch(`http://localhost:5000/cart-list`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setCartData(result);
    }

    const getPlacedOrderDetails = async() => {
        let result = await fetch(`http://localhost:5000/get-order-details`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
    }

    return (
        <div className='ordersMain'>
            <h1>Orders Page</h1>
            <div className="ordersPage">
                {
                    cartData.map((value, index) => {
                        return (
                            <div className="orders" key={index}>
                                <div className="orderDetails" >
                                    <img src="https://5.imimg.com/data5/NR/ON/MY-57009823/men-27s-denim-jackets.jpg" alt="" />
                                    <div className="userDetails">
                                        <span className='pName'>{value.name}<span className='pComp'> from {value.company}</span> </span>
                                        <span className='uName'>User name : <b>{value.userName}</b></span>
                                        <span className='uAddress'>Category : <b>{value.category}</b></span>
                                    </div>
                                </div>
                                <div className="actions">
                                    <div className="chechBoxes">
                                        <input type="checkbox" name="" id="" />
                                        <span>Dispatched</span>
                                    </div>
                                    <div className="chechBoxes">
                                        <input type="checkbox" name="" id="" />
                                        <span>Shipped</span>
                                    </div>
                                    <div className="chechBoxes">
                                        <input type="checkbox" name="" id="" />
                                        <span>Delivered</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Orders
