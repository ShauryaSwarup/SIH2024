import React from "react";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="productCard">
      <img src={product.poster} alt={product.title} className="productImage" />
      <h2>{product.title}</h2>
      <Rating {...options} />
      <p>Price: ₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
