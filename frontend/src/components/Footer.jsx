import React from 'react'
import intaImg1 from '../assets/instagram-1.jpg'
import intaImg2 from '../assets/instagram-2.jpg'
import intaImg3 from '../assets/instagram-3.jpg'
import intaImg4 from '../assets/instagram-4.jpg'
import intaImg5 from '../assets/instagram-5.jpg'
import intaImg6 from '../assets/instagram-6.jpg'

const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>CONTACT INFO</h4>
            <p>
                <span><i className="ri-map-pin-fill"></i></span>
                123, London Bridge, UK
            </p>
            <p>
                <span><i className="ri-mail-line"></i></span>
                EzyShopper@gmail.com
            </p>
            <p>
                <span><i className="ri-phone-line"></i></span>
                +123-456-789
            </p>
        </div>
        <div className='footer__col'>
            <h4>COMPANY</h4>
            <a href="/">Home</a>
            <a href="/">About Us</a>
            <a href="/">work with us</a>
            <a href="/">Our Blogs</a>
            <a href="/">Terms and COnditions</a>
        </div>
        <div className='footer__col'>
            <h4>USEFUL LINKS</h4>
            <a href="/">Help</a>
            <a href="/">Track your order</a>
            <a href="/">Men</a>
            <a href="/">Women</a>
            <a href="/">Dresses</a>
        </div>
        <div className='footer__col'>
            <h4>INSTAGRAM</h4>
            <div className='instagram__grid'></div>
            <img src={intaImg1} alt="" />
            <img src={intaImg2} alt="" />
            <img src={intaImg3} alt="" />
            <img src={intaImg4} alt="" />
            <img src={intaImg5} alt="" />
            <img src={intaImg6} alt="" />
        </div>
    </footer>
    </>
    
  )
}

export default Footer