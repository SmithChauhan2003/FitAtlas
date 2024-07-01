import React, { useState } from "react";
import "./additem.css";
import upload from "../../utils/upload.js";
import axios from "axios";

const AddItem = () => {
  const [product, setProduct] = useState({
    productName: "",
    productType: "",
    img: [],
    displayimg: [],
    brand: "",
    flavour: [],
    price: [],
    category: "",
    weight: [],
    desc: "",
  });

  const [imgLinks, setImgLinks] = useState([]);

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleType = (e) => {
    setProduct((prev) => ({ ...prev, productType: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let arr = [];
      for (let index = 0; index < imgLinks.length; index++) {
        const data = new FormData();
        data.append("file", imgLinks[index]);
        data.append("upload_preset", "farmlink");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/desqsr61l/upload",
          data
        );

        const { url } = res.data;
        arr.push(url);
      }
      console.log(arr);
      setProduct((prev) => ({ ...prev, img: [...arr] }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFlavour = (e) => {
    const inputValue = e.target.value;
    const flavoursArray = inputValue
      .split(",")
      .map((flavour) => flavour.trim()); // Split by commas and trim spaces

    setProduct((prevProduct) => ({
      ...prevProduct,
      flavour: [...prevProduct.flavour, ...flavoursArray],
    }));
  };

  const handlePrice = (e) => {
    const inputValue = e.target.value;
    const pricesArray = inputValue.split(",").map((price) => price.trim()); // Split by commas and trim spaces

    setProduct((prev) => ({
      ...prev,
      price: [...pricesArray],
    }));
  };

  const handleWeight = (e) => {
    const inputValue = e.target.value;
    const weightsArray = inputValue.split(",").map((weight) => weight.trim()); // Split by commas and trim spaces

    setProduct((prevProduct) => ({
      ...prevProduct,
      weight: [...weightsArray],
    }));
  };

  return (
    <div className="addItem">
      <form>
        <div className="inputBox">
          <div className="input">
            <span>Product Name</span>
            <input
              type="text"
              placeholder="Ex., Stim Daddy"
              name="productName"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <span>Product Type</span>
            <select
              style={{ cursor: "pointer" }}
              value={product.productType}
              onChange={handleType}
            >
              <option value="Supplement">Supplement</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>
        </div>

        <div className="inputBox">
          <div className="input">
            <span>Image</span>
            <input
              type="file"
              onChange={(e) => setImgLinks(e.target.files)}
              multiple
            />
          </div>
          <div className="input">
            <span>Display Image</span>
            <input
              type="file"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  displayimg: [...prev.displayimg, e.target.files],
                }))
              }
              multiple
            />
          </div>
        </div>

        <div className="inputBox">
          <div className="input">
            <span>Brand</span>
            <input
              type="text"
              placeholder="Ex., RYSE"
              name="brand"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <span>Flavour</span>
            <input
              type="text"
              placeholder="Ex., Blue Raspberry Candy Watermelon"
              name="flavour"
              onChange={handleFlavour}
            />
          </div>
        </div>

        <div className="inputBox">
          <div className="input">
            <span>Category</span>
            <input
              type="text"
              placeholder="Ex., Creatine"
              name="category"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <span>Price</span>
            <input
              type="text"
              placeholder="Ex., 500 999"
              name="price"
              onChange={handlePrice}
            />
          </div>
        </div>

        <div className="inputBox">
          <div className="input">
            <span>Weight</span>
            <input
              type="text"
              placeholder="Ex., 500gms 1kg 5kg"
              name="weight"
              onChange={handleWeight}
            />
          </div>
          <div className="input">
            <span>Description</span>
            <textarea
              name="desc"
              placeholder="Description"
              id=""
              cols="30"
              rows="1"
              onChange={handleChange}
            />
          </div>
        </div>

        <input
          type="submit"
          value="Add"
          class="addbtn"
          onClick={handleSubmit}
        />
        <input type="submit" value="Back" className="addbtn back" />
      </form>
    </div>
  );
};

export default AddItem;
