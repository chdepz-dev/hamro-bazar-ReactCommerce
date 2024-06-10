import React, { useContext } from "react";
import "./css/ShopCategory.css";
import { ShopContext } from "../Contexts/ShopContext";
import dropdown_icon from "../Components/Assests/dropdown_icon.png";
import Items from "../Components/Items/Items";

function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);
  // console.log(all_product)

  // console.log(all_product)
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="info-container">
        <p>
          <span>showing 1-12</span> out of 36 products
        </p>

        <div className="shopcategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-indexSort">
        <div className="shopcategory-products">
          {all_product.map((item, i) => {
            if (props.category === item.category) {
              return (
                <Items
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
            
          })}

        </div>
        <div className="shopcategory-loadmore">
          Explore More
        </div>
      </div>
    </div>
  );
}

export default ShopCategory;
