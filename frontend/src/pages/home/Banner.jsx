import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
      <div className='header__content z-30'>
        <h4 className='uppercase'>UP TO 20% DISCOUNT ON</h4>
        <h1>Girl's fashion</h1>
        <p>Welcome to ezyShopper, your go-to destination for quality products at unbeatable prices! From gadgets to fashion and everyday essentials, we make shopping easy, fast, and secure. Enjoy exclusive deals, seamless browsing, and top-notch convenience with ezyShopper!</p>
        <button className='btn'><Link to = "/shop">EXPLORE NOW</Link></button>
      </div>
      <div className='header__image'>
        <img src={bannerImg} alt="banner image" />
      </div>
    </div>
  )
}

export default Banner