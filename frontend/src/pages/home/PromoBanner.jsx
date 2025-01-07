import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
        <div className='banner__card'>
            <span><i className="ri-truck-line"></i></span>
            <h4>Free delivery</h4>
            <p>Enjoy free delivery on all your favorite products at EzyShopper—shop now and save more!</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-money-dollar-circle-line"></i></span>
            <h4>Unbeatable Value</h4>
            <p>Find the best prices on top-quality products and make every purchase worth your money!</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-user-voice-fill"></i></span>
            <h4>Exceptional Support</h4>
            <p>Our team is here to assist you every step of the way for a hassle-free shopping experience.</p>
        </div>
        <div className='banner__card'>
            <span><i className="ri-discount-percent-line"></i></span>
            <h4>Exclusive Discounts</h4>
            <p>Save big with amazing discounts and special offers you won’t want to miss!</p>
        </div>

    </section>
  )
}

export default PromoBanner