import React from 'react'
import { useState } from 'react'
import productsData from '../../data/products'
import { useEffect } from 'react'
import ProductCards from './ProductCards'

const filter = {
    categories: ['all', 'accessories', 'dress', 'jewelry', 'cosmetics'],
    colors: ['all', 'black', 'white', 'red', 'blue', 'yellow', 'green', 'pink', 'purple'],
    priceRanges:[
        {label : 'Under $50', min: 0, max: 50},
        {label : '$50 - $100', min: 50, max: 100},
        {label : '$100 - $200', min: 100, max: 200},
        {label : '$200 and above', min: 200, max: Infinity},
    ]
}

const ShopPage = () => {
    const [products, setProducts] = useState(productsData);
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

    //filtering functions
    const applyFilters = () => {
        let filteredProducts = productsData;

        //filter by category
        if(filtersState.category && filtersState.category !== 'all'){
            filteredProducts = filteredProducts.filter(product => product.category === filtersState.category);
        }

        //filter by color
        if(filtersState.color && filtersState.color !== 'all'){
            filteredProducts = filteredProducts.filter(product => product.color === filtersState.color);
        }

        //filter by price range
        if(filtersState.priceRange){
            const [minPrice , maxPrice] = filtersState.priceRange.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);
        }
        setProducts(filteredProducts);
    }

    useEffect(() => {
        applyFilters()
    }, [filtersState])

    //clear the filters
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        })
    }

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Shop Page</h2>
                <p className="text-gray-600 text-center text-xl">Discover the hottest picks: Elevate your style with our curated collection of trending women's fashion products.</p>
            </section>
        
            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* left side */}
                    <div>Shop filtering</div>

                    {/* right side */}
                    <div>
                        <h3 className='text-xl font-medium mb-4'>Products available : {products.length}</h3>
                        <ProductCards products = {products}/>
                    </div>
                </div>
            </section>      
        </>
    )
}

export default ShopPage