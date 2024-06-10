import React from 'react'
import "./Offers.css"
import exclusive_image from "../Assests/exclusive_image.png"
const Offers = () => {
  return (
    <div className='offers'>
        <div className="left">
             <h1>Exclusive</h1>   
             <h1>offers for you</h1>   
             <p>ONLY ON BEST SELLERS PRODUCT</p>
             <button>Check Now</button>
        </div>

        <div className="right">
        <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers