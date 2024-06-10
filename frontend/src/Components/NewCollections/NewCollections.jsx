import React, {useState, useEffect} from "react";
import "./NewCollection.css";

// import new_collections from "../Assests/new_collections";
import Items from "../Items/Items";
const NewCollections = () => {
  const [new_collections, setNew_collections] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
    .then((response) => response.json())
    .then((data) => setNew_collections(data))
  }, [])

  return (
    <div className="new-collections">
      <h1>New Collections</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => (
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
};

export default NewCollections;
