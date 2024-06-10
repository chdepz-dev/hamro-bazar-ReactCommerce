import React, { useContext } from "react";
import "./Productdisplay.css";
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
import { ShopContext } from "../../Contexts/ShopContext";
const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdispaly-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-main-img">
          <img src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(100)</p>
        </div>
        <div className="productdisplay-right-price">
          <div className="productdisplay-right-price-old">
            NRS: {product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            NRS: {product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
          minima, accusantium voluptates inventore non unde itaque magnam,
          dignissimos commodi ea velit reprehenderit a maxime vero eius,
          molestiae explicabo dicta nisi.
        </div>
        <div className="productdisplay-right-size">
          <h1>SELECT SIZES</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>L</div>
            <div>M</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id)
          }}>
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          {" "}
          <span>CATEGORY:</span> {product.category}
        </p>
        <p className="productdisplay-right-category">
          {" "}
          <span>TAGS:</span> {product.category}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
