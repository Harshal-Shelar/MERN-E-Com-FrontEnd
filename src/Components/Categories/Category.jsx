import React, { useEffect, useState } from 'react';
import './Category.scss'

const Category = () => {
    const [products, setProducts] = useState([]);
    let valueArr = [];
    let countArr = [];
    var current = null;
    var cnt = 0;
    var finalArr = [];
    var finalCount = [];

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        let result = await fetch('http://localhost:5000/category-list', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            findDuplicate();
        }
        setProducts(result);
    }

    const findDuplicate = () => {

        products.sort();
        for (var i = 0; i < products.length; i++) {
            if (products[i] !== current) {
                if (cnt > 0) {
                    valueArr.push(current)
                    countArr.push(cnt)
                }
                current = products[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            console.log(current + ' comes --> ' + cnt + ' times');
        }
        valueArr.map((value) => {
            finalArr = [...finalArr, value];
        });
        countArr.map((x) => {
            finalCount = [...finalCount, x]
        })
        console.log(finalArr);
        console.log(finalCount);
    }


    return (
        <>
            <div className="categoryMain">
                {
                    finalArr.map((item, index) => {
                        return (
                            <ul>
                                <li key={index}>{item}</li>
                            </ul>
                        )
                    })
                }

                {
                    finalCount.map((item, index) => {
                        return (
                            <ul>
                                <li key={index}>{item}</li>
                            </ul>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Category
