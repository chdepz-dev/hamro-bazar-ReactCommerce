import React, { useState } from "react";
import "./Addproduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const productDetailsHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  function imageHandler(e) {
    setImage(e.target.files[0]);
  }

  const AddProduct = async () => {
    // console.log(productDetails);
    //sending data to backend
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }).then((response) => response.json())
      .then((data) => (responseData = data));
    
      if(responseData.success){
        product.image = responseData.image_url;
        console.log(product)

        //sending product to database
        await fetch("http://localhost:4000/addproduct",{
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product),
        }).then((response) => response.json()).then((data) =>{
          data.success? alert("product added"): alert("product adding failed")
          
        })
      }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>PRODUCT TITLE</p>
        <input
          value={productDetails.name}
          onChange={productDetailsHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>PRICE</p>
          <input
            value={productDetails.old_price}
            onChange={productDetailsHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>OFFER PRICE</p>
          <input
            value={productDetails.new_price}
            onChange={productDetailsHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>ADD PRODUCT CATEGORY</p>
          <select
            value={productDetails.category}
            onChange={productDetailsHandler}
            name="category"
            className="add-product-selector">
            <option value="women">women</option>
            <option value="men">men</option>
            <option value="kid">kid</option>
          </select>
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt=""
              className="addproduct-thumbnail-image"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <button onClick={() => AddProduct()}>Add product</button>
      </div>
    </div>
  );
};

export default AddProduct;
