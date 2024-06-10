import React, { useState, useEffect } from "react";
import "./Popular.css";
// import data_product from "../Assests/data";
import Items from "../Items/Items";
function Popular() {
  const [popular, setPopular] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
    .then((response) => response.json())
    .then((data) => setPopular(data))
  } , [])
  return (
    <div className="popular">
      <h1>popular in women</h1>
      <hr />

      <div className="popular-item">
        {popular.map((item, i) => (
          <Items
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
