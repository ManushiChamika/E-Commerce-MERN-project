import React from 'react'
import dealsImg from '../../assets/deals.png'
const DealsSection = () => {
  return (
    <section className='section__container deals__container'>
      <div className='deals__image'>
        <img src={dealsImg} alt="" />
      </div>
      <div className='deals__content'>
        <h5> Get up to 20% discount</h5>
        <h4>Deals of the month</h4>
        <p>EzyShopper is your one-stop shop for unbeatable deals! Enjoy up to 20% off on top products with our "Deals of the Month." From gadgets to fashion, find everything you need at the best prices. Shop smart, shop EzyShopper!</p>
        <p>~ Enjoy your shopping! ~</p>
        <div className='deals__countdown flex-wrap'>
          <div className='deals__countdown__card'>
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>20</h4>
            <p>Hrs</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>15</h4>
            <p>Mins</p>
          </div>
          <div className='deals__countdown__card'>
            <h4>07</h4>
            <p>Secs</p>
          </div>
        </div>
       
      </div>
    </section>
  )
}

export default DealsSection