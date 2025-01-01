import React from 'react'
import Banner from  './Banner'
import Categories from './Categories'
import HeroSection from './HeroSection'
import TrendingProducts from '../shop/TrendingProducts'
import ProductCards from '../shop/ProductCards'
import DealsSection from './DealsSection'

const Home = () => {
  return (
    <>
      <Banner/>
      <Categories/>
      <HeroSection/>
      <TrendingProducts/>
      <ProductCards/>
      <DealsSection/>
    </>
  )
}

export default Home