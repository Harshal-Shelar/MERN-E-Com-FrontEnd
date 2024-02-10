import React, { useEffect, useState } from 'react';
import './Category.scss';
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

const Category = () => {
    const [products, setProducts] = useState([]);
    const [catName, setCatName] = useState([]);
    const [catCount, setCatCount] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [getNewUserList, setNewUserList] = useState([]);
    const [popup, setPopup] = useState();
    const [categoryName, setCategoryName] = useState()

    let valueArr = [];
    let countArr = [];
    var current = null;
    var cnt = 0;
    var usersList;
    var newUserList = [];

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        usersList = await fetch('http://localhost:5000/category-list', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        usersList = await usersList.json();
        setProducts(usersList);
        setTotalCount(products.length + 1);

        products.sort();

        for (var i = 0; i < products.length; i++) {
            if (products[i] !== current) {
                if (cnt > 0) {
                    valueArr.push(current);
                    countArr.push(cnt);
                }
                setCatName(valueArr);
                setCatCount(countArr);
                current = products[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
        }
        catName.map(value => {
            return valueArr = [...valueArr, value];
        });
        catCount.map(x => {
            return countArr = [...countArr, x]
        });
    }

    const openUsersList = async (type) => {
        let count = 0;
        if (products.includes(type.item)) {
            let result = await fetch('http://localhost:5000/products', {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();

            result.map((x) => {
                if (x.category === type.item) {
                    setCategoryName(type.item)
                    newUserList.push(x);
                    count++;
                };
            });
            setPopup(true);
            setNewUserList(newUserList);
        }
    }

    return (
        <>
            <div className="categoryMain">
                <h2 className='heading'>Users Category wise</h2>
                <h3 className='totalName'>Total Products : {totalCount}</h3>
                <div className="boxes">
                    <div className='nameBox'>
                        {
                            catCount.map((item, index) => {
                                return (
                                    <ul className='nameUl'>
                                        <li className='nameLi numberBorder' key={index}>{item}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                    <div className='nameBox'>
                        {
                            catName.map((item, index) => {
                                return (
                                    <ul className='nameUl' onClick={() => openUsersList({ item })}>
                                        <li className='nameLi' key={index}>{item}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {popup &&
                <div className="overlay">
                    <div className="popup">
                        <div className="content">
                            <p className='categoryHeading'>Products with <span>{categoryName}</span> Category</p>
                            <table className='popupTable'>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Company</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getNewUserList.map((x, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{x.name}</td>
                                                    <td>{x.category}</td>
                                                    <td>{x.price}</td>
                                                    <td>{x.company}</td>
                                                    <td className='catActionBtns'>
                                                        <Link to={"/update/" + x._id} ><LiaExternalLinkAltSolid className='navigate' /></Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="catBtns">
                                <button className='popupCan' onClick={() => setPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div >
                </div >
            }
        </>
    )
}

export default Category
