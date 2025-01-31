import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      <div className='banner__card bg-pink-100 bg-[url("https://source.unsplash.com/400x300/?flower")] bg-cover bg-center p-6 rounded-2xl shadow-md'>
        <span><i className="ri-truck-line text-pink-700 text-3xl"></i></span>
        <h4 className='text-xl font-semibold text-pink-800'>Free delivery</h4>
        <p className='text-pink-900'>Enjoy free delivery on all your favorite products at EzyShopper—shop now and save more!</p>
      </div>
      <div className='banner__card bg-pink-100 bg-[url("https://source.unsplash.com/400x300/?rose")] bg-cover bg-center p-6 rounded-2xl shadow-md'>
        <span><i className="ri-money-dollar-circle-line text-pink-700 text-3xl"></i></span>
        <h4 className='text-xl font-semibold text-pink-800'>Unbeatable Value</h4>
        <p className='text-pink-900'>Find the best prices on top-quality products and make every purchase worth your money!</p>
      </div>
      <div className='banner__card bg-pink-100 bg-[url("https://source.unsplash.com/400x300/?blossom")] bg-cover bg-center p-6 rounded-2xl shadow-md'>
        <span><i className="ri-user-voice-fill text-pink-700 text-3xl"></i></span>
        <h4 className='text-xl font-semibold text-pink-800'>Exceptional Support</h4>
        <p className='text-pink-900'>Our team is here to assist you every step of the way for a hassle-free shopping experience.</p>
      </div>
      <div className='banner__card bg-pink-100 bg-[url("https://source.unsplash.com/400x300/?cherryblossom")] bg-cover bg-center p-6 rounded-2xl shadow-md'>
        <span><i className="ri-discount-percent-line text-pink-700 text-3xl"></i></span>
        <h4 className='text-xl font-semibold text-pink-800'>Exclusive Discounts</h4>
        <p className='text-pink-900'>Save big with amazing discounts and special offers you won’t want to miss!</p>
      </div>
    </section>
  )
}

export default PromoBanner