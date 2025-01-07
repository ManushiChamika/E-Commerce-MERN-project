import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../components/RatingStars'

const ProductCards = ({ products = [] }) => { // Provide default empty array
    console.log(products)
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
                products.map((product, index) => ( // Ensure the map returns JSX
                    <div key={index} className='product__card__content'>
                        <div className='relative'>
                            <Link to={`/shop/${product._id}`}>
                                <img src={product.image} alt="Product Image" className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300  p-7'/>
                            </Link>
                        </div>
                        {/* product description */}
                        <div>
                            {/* put new price over old price if there is a discount */}
                            <h4>{product.name}</h4>
                            <p>${product.price} {product.oldPrice ? <s>${product?.oldPrice}</s> : null}</p>
                            <RatingStars rating = {product.rating}/>
                        </div>
                        <div className='hover:block m-78'>
                            <button>
                                <i className="ri-shopping-cart-line bg-primary text-white hover:bg-primary-dark p-2 m-7"></i>
                            </button>
                        </div>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default ProductCards
