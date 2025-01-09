//filtering out products according to category

import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useState } from 'react';
import products from '../../data/products.json'
import ProductCards from '../shop/ProductCards'

const Category = () => {

    // take same name as in router - categoryName
    const {categoryName} = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = products.filter((product) => product.category === categoryName.toLowerCase())
        
        setFilteredProducts(filtered)
    },[categoryName])

    //to load page at the top 
    useEffect(() => {
        window.scrollTo(0, 0);
    })

  return (
    <>
        <section className='section__container bg-primary-light'>
            <h2 className='section__header capitalize'>{categoryName}</h2>
            <p>Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!</p>
        </section>
        
        {/* products card */}
        <div className = 'section__container'>
            <ProductCards products = {filteredProducts}/>
        </div>

    </>
    
  )
}

export default Category