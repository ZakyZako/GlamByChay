import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem/ProductItem";
import "./productList.scss";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/products`)
        .then((response) => setProducts(response.data));
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="product-list-title">
        <h2>Nos cils tendances du moment</h2>
      </div>
      <div className="wrapper-product">
        {products.map((product, index) => {
          return <ProductItem key={index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
