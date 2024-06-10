import React from 'react'
import "./Newsletter.css"

const Newsletter = () => {
  return (
    <div className='newsletter'>
       <h1>
        Get Exclusive offers on your Email
        </h1> 
        <p>Subscribe to our newsletter and stay updated</p>

        <div>
            <input type="email" placeholder='Enter your email' />
            <button>SUBSCRIBE NOW</button>
        </div>

  

    </div>
  )
}

export default Newsletter