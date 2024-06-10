import React from 'react'
import "./Item.css"
import { Link } from 'react-router-dom'

function Items( props) {
  return (
    <div className='item'>

      <Link to={`/product/${props.id}`}>
      
      <img src={props.image} alt="" onClick={() => window.scrollTo(0,0)}/>
      </Link>
      <p>{props.name}</p>

      <div className="item-prices">
        <div className='item-price-new'>
          NRS: {props.new_price}
        </div>
        <div className='item-price-old'>
          NRS: {props.old_price}
        </div>
      </div>

    </div>
  )
}

export default Items