import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars';

const SingleProduct = () => {

    const {id} = useParams();

  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Single Product Page</h2>
        <div className='section__subheader space:center'>
            <span className='hover:text-primary'><Link to='/'>home</Link></span>
            <i className="ri-arrow-right-s-line"></i>
            <span className='hover:text-primary'><Link to='/shop'>Shop</Link></span>
            <i className="ri-arrow-right-s-line"></i>
            <span className='hover:text-primary'>Product name</span>
        </div>
    </section>

    <section className='section__container mt-8'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
            <div className='md:w-1/2 w-full'>
                {/* product image */}
                <img src="https://images.unsplash.com/photo-1485527691629-8e370684924c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" 
                className='rounded-md w-full h-auto'/>
            </div>
            <div className='md:w-1/2 w-full'>
                <h3 className='text-2xl font-semibold mcb-4'>Product Name</h3>
                <p className='text-xl text-primary mb-4'>$100 <s>$130</s></p>
                <p className='test-gray-400 mb-4'>This is the product description</p>
           
                {/* additional product info */}
                <div>
                    <p className='mb-3'><strong>Category:</strong> accessories</p>
                    <p><strong>Color:</strong> beige</p>
                    <div className='flex gap-0.5 items-center'>
                        <strong>Rating: </strong>
                        <RatingStars rating={"4"}/>
                    </div>


                    <button className='mt-5 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark'>
                        Add to cart
                    </button>                    
                </div>
            </div>
        </div>
    </section>

    {/* display reviews with API*/}
    <section className='section__container mt-8'>
        Reviews Here
    </section>
    </>
  )
}

export default SingleProduct