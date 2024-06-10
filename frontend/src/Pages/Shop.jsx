import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import Newsletter from '../Components/Newsletter/Newsletter'
import Footer from '../Components/Footer/Footer'

function Shop() {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <Newsletter />
    
    </div>
  )
}

export default Shop