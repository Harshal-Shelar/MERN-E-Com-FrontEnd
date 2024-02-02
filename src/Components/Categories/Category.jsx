import React, { useEffect, useState } from 'react'

const Category = () => {
    const [products, setProducts] = useState([]);
    const [catList, setCatList] = useState();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        let categoryList = result.map((value) => {
            return value.category;
        });
        setCatList(categoryList);
        setProducts(result);
    }

    return (
        <div>
            {
                products.map((value, index) => {
                    return <span key={value}>{value.category}</span>
                })
            }
        </div>
    )
}

export default Category
