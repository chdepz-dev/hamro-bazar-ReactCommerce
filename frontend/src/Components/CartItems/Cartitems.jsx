import React, { useContext } from 'react';
import "./Cartitems.css";
import remove_icon from "../Assests/cart_cross_icon.png";
import { ShopContext } from '../../Contexts/ShopContext';

const Cartitems = () => {
  const { all_product, cartItems, removeFromCart, getCartTotal } = useContext(ShopContext);

  return (
    <div className='cartitems'>
        <p className='basket'>Your Basket 🛒</p>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format cartitems-format-main ">
                <img src={product.image} alt="" className="carticon-producticon" />
                <p>{product.name}</p>
                <p>NRS: {product.new_price}</p>
                <button className="cartitems-quantity">{cartItems[product.id]}</button>
                <p>NRS: {product.new_price * cartItems[product.id]}</p>
                <img 
                  src={remove_icon}
                  onClick={() => removeFromCart(product.id)}
                  alt=""
                  className="cartitems-remove-icon"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>cart total</h1>
            <div>
                <div className='cartitems-total-item'>
                        <p>subtotal</p>
                        <p>Nrs: {getCartTotal()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>shipping fee</p>
                    <p>free</p>
                </div>
                <hr />
                <div className='cartitems-total-item'>
                        <h3>Total</h3>
                        <h3>NRS: {getCartTotal()}</h3>
                </div>
            </div>
            <button>Checkout</button>
        </div>
        <div className="cartitems-promocode">
            <p>if you have a promo code, enter here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promocode' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
