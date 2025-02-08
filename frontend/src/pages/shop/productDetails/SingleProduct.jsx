import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import RatingStars from '../../../components/RatingStars';
import { useDispatch } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import ReviewsCard from '../reviews/reviewsCard';

const SingleProduct = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    const { data, error, isLoading } = useFetchProductByIdQuery(id);
    
    const singleProduct = data?.product || {};
    // console.log(singleProduct)
    
    const productReviews = data?.reviews || [];
    // console.log(productReviews)

    if(isLoading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>Error fetching products....</p>
    }

    //add to cart
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

  return (
    <>
    <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Single Product Page</h2>
        <div className='section__subheader space:center'>
            <span className='hover:text-primary'><Link to='/'>home</Link></span>
            <i className="ri-arrow-right-s-line"></i>
            <span className='hover:text-primary'><Link to='/shop'>Shop</Link></span>
            <i className="ri-arrow-right-s-line"></i>
            <span className='hover:text-primary'>{singleProduct?.name}</span>
        </div>
    </section>

    {/* display single product */}
    <section className='section__container mt-8'>
        <div className='flex flex-col items-center md:flex-row gap-8'>
            <div className='md:w-1/2 w-full'>
                {/* product image */}
                <img src={singleProduct.image} alt="" 
                className='rounded-md w-full h-auto'/>
            </div>
            <div className='md:w-1/2 w-full'>
                <h3 className='text-2xl font-semibold mcb-4'>{singleProduct?.name}</h3>
                <p className='text-xl text-primary mb-4'>$
                    {singleProduct?.price} {singleProduct.oldPrice && <s>${singleProduct.oldPrice}</s>}</p>
                <p className='text-gray-500 mb-4'>{singleProduct?.description}</p>
           
                {/* additional product info */}
                <div className='flex flex-col space-y-2'>
                    <p className='mb-3'><strong>Category:</strong> {singleProduct?.category}</p>
                    <p><strong>Color:</strong> {singleProduct.color}</p>
                    <div className='flex gap-0.5 items-center'>
                        <strong>Rating: </strong>
                        <RatingStars rating={"4"}/>
                    </div>


                    <button 
                        onClick={(e)=> {
                            e.stopPropagation();
                            handleAddToCart(singleProduct);
                        }}
                        className="mt-6 py-3 px-4 max-w-[140px] bg-primary text-white rounded-md hover:bg-primary-dark">

                        Add to cart
                    </button>                    
                </div>
            </div>
        </div>
    </section>

    {/* display reviews with API*/}
    <section className='section__container mt-8'>
        <ReviewsCard productReviews = {productReviews}/>                
    </section>
    </>
  )
}

export default SingleProduct