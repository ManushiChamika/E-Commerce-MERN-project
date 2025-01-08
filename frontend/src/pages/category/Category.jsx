import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useState } from 'react';
import products from '../../data/products.json'

const Category = () => {

    // take same name as in router - categoryName
    const {categoryName} = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = products.filter((product) => product.name === categoryName.toLowerCase())
        
        setFilteredProducts(filtered)
    },[categoryName])
  return (
    <section className=''>

    </section>
  )
}

export default Category