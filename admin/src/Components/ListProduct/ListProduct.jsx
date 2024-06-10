import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png"

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchProducts()
  },[])

  const remove_product = async(id)=>{
    await fetch("http://localhost:4000/removeproduct",{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: id})
    })
    await fetchProducts()

    
  }
 
  
  return (
    <div className="list-product">
     
      <h1>All Products List</h1>
      
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>New Price</p>
        <p>Old Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product) => (
          <>
          
          <div key={product.id} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-producticon" />
            <p>{product.name}</p>
            <p>NRS: {product.old_price}</p>
            <p>NRS: {product.new_price}</p>
            <p>{product.category}</p>
           <img onClick={()=> remove_product(product.id)} src={cross_icon} alt="" className="listproduct-removeicon" />
          </div>
          <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
